using Abp.Authorization;
using Abp.Collections.Extensions;
using Abp.Domain.Repositories;
using Abp.Linq.Extensions;
using ERP.Authorization;
using ERP.Dto;
using ERP.PayRoll.EmployeeSalary.Dtos;
using ERP.PayRoll.SalarySheet.Dtos;
using ERP.PayRoll.SalarySheet.Exporting;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace ERP.PayRoll.SalarySheet
{
    [AbpAuthorize(AppPermissions.PayRoll_SalarySheet)]
    public class SalarySheetAppService : ERPAppServiceBase
    {
        private readonly IRepository<SalarySheet> _salarySheetRepository;
        private readonly IRepository<EmployeeLoans.EmployeeLoans> _employeeLoansRepository;
        private readonly ISalarySheetExcelExporter _salarySheetExcelExporter;
        private readonly IRepository<EmployeeSalary.EmployeeSalary> _employeeSalaryRepository;
        private readonly IRepository<Employees.Employees> _employeesRepository;
        private readonly IRepository<Attendance.AttendanceDetail> _attendanceDetailRepository;
        private readonly IRepository<EmployeeLeaves.EmployeeLeaves> _employeeLeavesRepository;
        private readonly IRepository<EmployeeArrears.EmployeeArrears> _employeeArrearsRepository;
        private readonly IRepository<EmployeeDeductions.EmployeeDeductions> _employeeDeductionsRepository;
        private readonly IRepository<EmployeeEarnings.EmployeeEarnings> _employeeEarningsRepository;
        private readonly IRepository<EmployeeStopSalary.EmployeeStopSalary> _employeeStopSalaryRepository;
        private readonly IRepository<EmployeeAdvances.EmployeeAdvances> _employeeAdvancesRepository;
        private readonly IRepository<SalaryLock.SalaryLock> _salaryLockRepository;

        private readonly IRepository<StopSalary.StopSalary> _stopSalaryRepository;



        public SalarySheetAppService(IRepository<SalarySheet> salarySheetRepository, ISalarySheetExcelExporter salarySheetExcelExporter,
            IRepository<EmployeeSalary.EmployeeSalary> employeeSalaryRepository, IRepository<Employees.Employees> employeesRepository,
            IRepository<Attendance.AttendanceDetail> attendanceDetailRepository, IRepository<EmployeeLeaves.EmployeeLeaves> employeeLeavesRepository,
            IRepository<EmployeeArrears.EmployeeArrears> employeeArrearsRepository, IRepository<EmployeeDeductions.EmployeeDeductions> employeeDeductionsRepository,
            IRepository<EmployeeEarnings.EmployeeEarnings> employeeEarningsRepository, IRepository<EmployeeStopSalary.EmployeeStopSalary> employeeStopSalaryRepository,
            IRepository<EmployeeLoans.EmployeeLoans> employeeLoansRepository, IRepository<EmployeeAdvances.EmployeeAdvances> employeeAdvancesRepository,
            IRepository<StopSalary.StopSalary> stopSalaryRepository,
            IRepository<SalaryLock.SalaryLock> salaryLockRepository
            )
        {
            _salarySheetRepository = salarySheetRepository;
            _salarySheetExcelExporter = salarySheetExcelExporter;
            _employeeSalaryRepository = employeeSalaryRepository;
            _employeesRepository = employeesRepository;
            _attendanceDetailRepository = attendanceDetailRepository;
            _employeeLeavesRepository = employeeLeavesRepository;
            _employeeArrearsRepository = employeeArrearsRepository;
            _employeeDeductionsRepository = employeeDeductionsRepository;
            _employeeEarningsRepository = employeeEarningsRepository;
            _employeeStopSalaryRepository = employeeStopSalaryRepository;
            _employeeLoansRepository = employeeLoansRepository;
            _employeeAdvancesRepository = employeeAdvancesRepository;
            _stopSalaryRepository = stopSalaryRepository;
            _salaryLockRepository = salaryLockRepository;
        }
        //public string UpdateAttendance(short salaryMonth, int salaryYear)
        //{
        //    var firstDayOfMonth = new DateTime(salaryYear, salaryMonth, 1);
        //    var lastDayOfMonth = firstDayOfMonth.AddMonths(1).AddDays(-1);

        //    int TenantId = (int)AbpSession.TenantId;
        //    string str = ConfigurationManager.AppSettings["ConnectionStringHRM"];
        //    using (SqlConnection cn = new SqlConnection(str))
        //    {
        //        using (SqlCommand cmd = new SqlCommand("sp_updatepayroll", cn))
        //        {
        //            cmd.CommandTimeout = 2500;
        //            cmd.CommandType = CommandType.StoredProcedure;
        //            cmd.Parameters.AddWithValue("@fromdate", firstDayOfMonth);
        //            cmd.Parameters.AddWithValue("@todate", lastDayOfMonth);
        //            cmd.Parameters.AddWithValue("@TenantID", TenantId);
        //            cn.Open();
        //            cmd.ExecuteNonQuery();
        //        }
        //    }
        //    return "done";
        //}

        [AbpAuthorize(AppPermissions.PayRoll_SalarySheet_Create)]
        public async Task<string> ProcessSalarySheet(short salaryMonth, int salaryYear)
        {
             //var firstDayOfMonth = new DateTime(salaryYear, salaryMonth, 1);
             //var lastDayOfMonth = firstDayOfMonth.AddMonths(1).AddDays(-1);
            //UpdateAttendance( salaryMonth,  salaryYear);
            var isLocked = _salaryLockRepository.FirstOrDefault(x => x.TenantId == AbpSession.TenantId && x.SalaryMonth == salaryMonth && x.SalaryYear == salaryYear)?.Locked ?? false;

            if (!isLocked)
                return "unlocked";

            var salarySheetToDelete = _salarySheetRepository.GetAll().Where(e => e.SalaryMonth == salaryMonth && e.SalaryYear == salaryYear && e.TenantId == AbpSession.TenantId);

            if (salarySheetToDelete.Count() > 0)
                DeleteSalaryInBulk(salaryYear, salaryMonth);

            int noOfDaysInMonth = DateTime.DaysInMonth(salaryYear, salaryMonth);
            var att = _attendanceDetailRepository.GetAll().Where(o => o.TenantId == AbpSession.TenantId && o.AttendanceDate.Value.Month == 3 && o.AttendanceDate.Value.Year == 2021);

            var monthAttendance = _attendanceDetailRepository.GetAll().Where(o => o.TenantId == AbpSession.TenantId && o.AttendanceDate.Value.Month == salaryMonth
                                     && o.AttendanceDate.Value.Year == salaryYear).GroupBy(x => x.EmployeeID).Select(x => x.FirstOrDefault());

            var employeeList = _employeesRepository.GetAll().Where(e => e.TenantId == AbpSession.TenantId);

            var allEmployees = from e in employeeList
                               join m in monthAttendance on new { e.TenantId, e.EmployeeID } equals new { m.TenantId, m.EmployeeID }
                               select e;

            string dateString = salaryMonth + "-01-" + salaryYear;
            DateTime salaryDate;
            DateTime.TryParse(dateString, out salaryDate);

            foreach (var emp in allEmployees)
            {
                var empLoans = _employeeLoansRepository.GetAll().Where(o => o.TenantId == AbpSession.TenantId && o.EmployeeID == emp.EmployeeID && (o.Completed == false
                || o.Completed == null));
                foreach (var item in empLoans)
                {
                    LoanAdjustment(emp.EmployeeID, salaryYear, salaryMonth, item.Amount);
                }
                CreateOrEditSalarySheetDto salarySheet = new CreateOrEditSalarySheetDto();

                salarySheet.EmployeeID = emp.EmployeeID;

                salarySheet.SalaryDate = salaryDate;
                salarySheet.SalaryMonth = salaryMonth;
                salarySheet.SalaryYear = salaryYear;
                //var typeID = 0;

                salarySheet.total_days = noOfDaysInMonth;

                decimal employeeWorkDays = CalculateWorkDays(emp.EmployeeID, salaryMonth, salaryYear);
                salarySheet.work_days = employeeWorkDays;
                salarySheet.eobi_amount = emp.EobiAmt==null?0:emp.EobiAmt;//Math.Round(Convert.ToDouble((decimal)((emp.EobiAmt ?? 0) / noOfDaysInMonth) * employeeWorkDays));
                salarySheet.social_security_amount = Math.Round(Convert.ToDouble((decimal)((emp.SScAmt ?? 0) / noOfDaysInMonth) * employeeWorkDays));
                decimal employeeAbsentDays = noOfDaysInMonth - employeeWorkDays;
                salarySheet.absent_days = employeeAbsentDays;

                EmployeeSalaryDto empMaxSalaryData = new EmployeeSalaryDto();
                empMaxSalaryData =   GetEmployeeMaxSalaryData(emp.EmployeeID);
                salarySheet.gross_salary = empMaxSalaryData.Gross_Salary;
                salarySheet.basic_salary = empMaxSalaryData.Basic_Salary;
                salarySheet.tax_amount = empMaxSalaryData.Tax;
                salarySheet.house_rent = empMaxSalaryData.House_Rent;
                salarySheet.net_salary = empMaxSalaryData.Net_Salary;

                double? arrears = CalculateArrears(emp.EmployeeID, salaryMonth, salaryYear);
                salarySheet.arrears = arrears;

                //double? deduction1 = CalculateDeductions(emp.EmployeeID, salaryMonth, salaryYear, 1);
                //double? deduction2 = CalculateDeductions(emp.EmployeeID, salaryMonth, salaryYear, 2);
                //double? deduction3 = CalculateDeductions(emp.EmployeeID, salaryMonth, salaryYear, 3);
                //double? deduction4 = CalculateDeductions(emp.EmployeeID, salaryMonth, salaryYear, 4);
                //double? deduction5 = CalculateDeductions(emp.EmployeeID, salaryMonth, salaryYear, 5);

                CreateOrEditSalarySheetDto deduction = new CreateOrEditSalarySheetDto();
                deduction = CalculateDeductions(emp.EmployeeID, salaryMonth, salaryYear);
                salarySheet.Deduction1 = deduction.Deduction1;
                salarySheet.Deduction2 = deduction.Deduction2;
                salarySheet.Deduction3 = deduction.Deduction3;
                salarySheet.Deduction4 = deduction.Deduction4;
                salarySheet.Deduction5 = deduction.Deduction5;

                salarySheet.loan = GetLoanAdjustmentAmount(emp.EmployeeID, salaryYear, salaryMonth);
                salarySheet.advance = GetAdvanceAmount(emp.EmployeeID, salaryYear, salaryMonth);
                salarySheet.total_deductions = salarySheet.Deduction1 + salarySheet.Deduction2 + salarySheet.Deduction3 + salarySheet.Deduction4 + salarySheet.Deduction5 + salarySheet.eobi_amount + salarySheet.social_security_amount + salarySheet.loan + salarySheet.advance;

                CreateOrEditSalarySheetDto earnings = new CreateOrEditSalarySheetDto();
                earnings = CalculateEarnings(emp.EmployeeID, salaryMonth, salaryYear);
                salarySheet.Income1 = earnings.Income1;
                salarySheet.Income2 = earnings.Income2;
                salarySheet.Income3 = earnings.Income3;
                salarySheet.Income4 = earnings.Income4;
                salarySheet.Income5 = earnings.Income5;

                //double? income1 = CalculateEarnings(emp.EmployeeID, salaryMonth, salaryYear, 1);
                //double? income2 = CalculateEarnings(emp.EmployeeID, salaryMonth, salaryYear, 2);
                //double? income3 = CalculateEarnings(emp.EmployeeID, salaryMonth, salaryYear, 3);
                //double? income4 = CalculateEarnings(emp.EmployeeID, salaryMonth, salaryYear, 4);
                //double? income5 = CalculateEarnings(emp.EmployeeID, salaryMonth, salaryYear, 5);

                //salarySheet.Income1 = income1;
                //salarySheet.Income2 = income2;
                //salarySheet.Income3 = income3;
                //salarySheet.Income4 = income4;
                //salarySheet.Income5 = income5;

                double? other_earnings = salarySheet.Income1 + salarySheet.Income2+ salarySheet.Income3+ salarySheet.Income4+ salarySheet.Income5;
                salarySheet.other_earnings = other_earnings;

                double employeePerDaySalary = CalculatePerDaySalary(noOfDaysInMonth, (double)empMaxSalaryData.Gross_Salary);
                double basic_earned = GetEmployeeSalary(employeePerDaySalary, employeeWorkDays);
                salarySheet.basic_earned = basic_earned;
                salarySheet.absent_amount = GetEmployeeSalary(employeePerDaySalary, employeeAbsentDays);

                salarySheet.total_earnings = Math.Round((double)(basic_earned + arrears + other_earnings - salarySheet.total_deductions - empMaxSalaryData.Tax), 0, MidpointRounding.AwayFromZero);

                //var stopSalary = await _employeeStopSalaryRepository.GetAll().Where(e => e.EmployeeID == emp.EmployeeID
                //&& e.SalaryMonth == salaryMonth && e.SalaryYear == salaryYear && e.TenantId == AbpSession.TenantId).FirstOrDefaultAsync();

                var stopSalary = await _stopSalaryRepository.GetAll().Where(e => e.EmployeeID == emp.EmployeeID && e.TypeID == 2
               && e.SalaryMonth == salaryMonth && e.SalaryYear == salaryYear && e.TenantId == AbpSession.TenantId).FirstOrDefaultAsync();

                if (stopSalary == null)
                {
                    salarySheet.ModOfPay = short.Parse(emp.payment_mode);
                }
                else
                {
                    salarySheet.ModOfPay = 3;
                }

                var sheetToSave = ObjectMapper.Map<SalarySheet>(salarySheet);

                if (AbpSession.TenantId != null)
                {
                    sheetToSave.TenantId = (int)AbpSession.TenantId;
                }

                await _salarySheetRepository.InsertAsync(sheetToSave);

            }

            return "done";
        }
        public void LoanAdjustment(int empID, int year, int month, double? loanAmount)
        {
            int TenantId = (int)AbpSession.TenantId;
            string str = ConfigurationManager.AppSettings["ConnectionStringHRM"];
            using (SqlConnection cn = new SqlConnection(str))
            {
                using (SqlCommand cmd = new SqlCommand("sp_GetLoanAmount", cn))
                {
                    cmd.CommandTimeout = 2500;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@TenantId", TenantId);
                    cmd.Parameters.AddWithValue("@employeeid", empID);
                    cmd.Parameters.AddWithValue("@year", year);
                    cmd.Parameters.AddWithValue("@month", month);
                    cmd.Parameters.AddWithValue("@loanamount", loanAmount);
                    cn.Open();
                    cmd.ExecuteNonQuery();
                    //// cn.Close();
                }
            }
        }

        public void DeleteSalaryInBulk(int year, int month)
        {
            int TenantId = (int)AbpSession.TenantId;
            string conStr = ConfigurationManager.AppSettings["ConnectionStringHRM"];
            using (SqlConnection cn = new SqlConnection(conStr))
            {
                using (SqlCommand cmd = new SqlCommand("Delete from SalarySheet Where TenantId=" + TenantId + " and SalaryMonth=" + month + " and SalaryYear=" + year, cn))
                {
                    cmd.CommandTimeout = 2500;
                    cmd.CommandType = CommandType.Text;
                    cn.Open();
                    cmd.ExecuteNonQuery();
                    //  // cn.Close();
                }
            }
        }

        public double? GetLoanAdjustmentAmount(int empID, int year, int month)
        {
            int TenantId = (int)AbpSession.TenantId;
            string str = ConfigurationManager.AppSettings["ConnectionStringHRM"];
            double amount = 0.0;
            using (SqlConnection cn = new SqlConnection(str))
            {
                string sqlQuery = "select sum(Amount) as amount from EmployeeLoansAdjustment where EmployeeID = " + empID + " and TenantId = " + TenantId + " and SalaryYear =" + year + " and SalaryMonth = " + month;
                using (SqlCommand cmd = new SqlCommand(sqlQuery, cn))
                {
                    cmd.CommandTimeout = 2500;

                    cmd.CommandType = CommandType.Text;
                    cn.Open();
                    using (SqlDataReader rdr = cmd.ExecuteReader())
                    {
                        while (rdr.Read())
                        {
                            amount = rdr["amount"] is DBNull ? 0.00 : Convert.ToDouble(rdr["amount"]);

                        };
                    }
                    //   // cn.Close();
                }
            }
            return amount;
        }

        public double? GetAdvanceAmount(int empID, int year, int month)
        {
            int TenantId = (int)AbpSession.TenantId;

            var empAdvance = _employeeAdvancesRepository.GetAll().Where(e => e.SalaryMonth == month && e.SalaryYear == year && e.TenantId == TenantId && e.EmployeeID == empID && e.Active == true);

            return empAdvance.Count() > 0 ? empAdvance.Sum(x => x.Amount) : 0.00;

        }

        public EmployeeSalaryDto GetEmployeeMaxSalaryData(int EmployeeID)
        {
            int TenantId = (int)AbpSession.TenantId;
            var result = new EmployeeSalaryDto();
            string str = ConfigurationManager.AppSettings["ConnectionStringHRM"];
            using (SqlConnection cn = new SqlConnection(str))
            {
                using (SqlCommand cmd = new SqlCommand("GetEmployeeMaxSalaryData", cn))
                {
                    cmd.CommandTimeout = 2500;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@TenantId", AbpSession.TenantId);
                    cmd.Parameters.AddWithValue("@EmployeeID", EmployeeID);

                    cn.Open();
                    using (SqlDataReader dataReader = cmd.ExecuteReader())
                    {
                        while (dataReader.Read())

                        {
                            result.Basic_Salary = dataReader["Basic_Salary"]is DBNull? 0 : Convert.ToDouble(dataReader["Basic_Salary"]);
                            result.Gross_Salary = dataReader["Gross_Salary"] is DBNull ? 0 : Convert.ToDouble(dataReader["Gross_Salary"]);
                            result.Tax = dataReader["Tax"] is DBNull ? 0 : Convert.ToDouble(dataReader["Tax"]);
                            result.House_Rent = dataReader["House_Rent"] is DBNull ? 0 : Convert.ToDouble(dataReader["House_Rent"]);
                            result.Net_Salary = dataReader["Net_Salary"] is DBNull? 0 : Convert.ToDouble(dataReader["Net_Salary"]);
                        };
                    }
                }


                //var filteredEmployeeSalaries = _employeeSalaryRepository.GetAll().Where(e => e.EmployeeID == empID && e.TenantId == AbpSession.TenantId);

                //EmployeeSalaryDto maxSalaryData = new EmployeeSalaryDto();

                //int count = filteredEmployeeSalaries.Count();
                //if (count == 0)
                //{
                //    maxSalaryData.Gross_Salary = 0;
                //    maxSalaryData.Basic_Salary = 0;
                //    maxSalaryData.Tax = 0;
                //    maxSalaryData.House_Rent = 0;
                //    maxSalaryData.Net_Salary = 0;
                //    return maxSalaryData;
                //}

                //var maxRow = filteredEmployeeSalaries.OrderByDescending(o => o.Gross_Salary).First();

                //maxSalaryData.Gross_Salary = maxRow.Gross_Salary ?? 0;
                //maxSalaryData.Basic_Salary = maxRow.Basic_Salary ?? 0;
                //maxSalaryData.Tax = maxRow.Tax ?? 0;
                //maxSalaryData.House_Rent = maxRow.House_Rent ?? 0;
                //maxSalaryData.Net_Salary = maxRow.Net_Salary ?? 0;
                //return maxSalaryData;
            }
            return result;

        }

        private double? CalculateArrears(int empID, short month, int year)
        {
            int TenantId = (int)AbpSession.TenantId;
            var totalArrears = 0;
            string str = ConfigurationManager.AppSettings["ConnectionStringHRM"];
            using (SqlConnection cn = new SqlConnection(str))
            {
                using (SqlCommand cmd = new SqlCommand("Calculate_Arears", cn))
                {
                    cmd.CommandTimeout = 2500;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@tenantid", AbpSession.TenantId);
                    cmd.Parameters.AddWithValue("@empid", empID);
                    cmd.Parameters.AddWithValue("@month", month);
                    cmd.Parameters.AddWithValue("@year", year);
                    cn.Open();
                    using (SqlDataReader dataReader = cmd.ExecuteReader())
                    {
                        while (dataReader.Read())
                        {
                            totalArrears = Convert.ToInt32(dataReader["total_arears"]);
                        }
                    }
                }
            }
            return totalArrears;

            //var employeeArrears = _employeeArrearsRepository.GetAll().Where(o => o.TenantId == AbpSession.TenantId && o.EmployeeID == empID && o.ArrearDate.Value.Month == month && o.ArrearDate.Value.Year == year);
            //double? totalArrears = (from x in employeeArrears select x.Amount).Sum() ?? 0;
            //return Math.Round((double)totalArrears, 0, MidpointRounding.AwayFromZero);
        }

        public CreateOrEditSalarySheetDto CalculateDeductions(int empID, short month, int year)

        {
            int TenantId = (int)AbpSession.TenantId;
            var deduction = new CreateOrEditSalarySheetDto();
            string str = ConfigurationManager.AppSettings["ConnectionStringHRM"];
            using (SqlConnection cn = new SqlConnection(str))
            {
                using (SqlCommand cmd = new SqlCommand("cal_deduct", cn))
                {
                    cmd.CommandTimeout = 2500;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@tenantid", AbpSession.TenantId);
                    cmd.Parameters.AddWithValue("@empid", empID);
                    cmd.Parameters.AddWithValue("@month", month);
                    cmd.Parameters.AddWithValue("@year", year);
                    cn.Open();
                    using (SqlDataReader dataReader = cmd.ExecuteReader())
                    {
                        while (dataReader.Read())
                        {
                            deduction.Deduction1 = dataReader["Deduction1"] is DBNull ? 0 : Convert.ToDouble(dataReader["Deduction1"]);
                            deduction.Deduction2 = dataReader["Deduction2"] is DBNull ? 0 : Convert.ToDouble(dataReader["Deduction2"]);
                            deduction.Deduction3 = dataReader["Deduction3"] is DBNull ? 0 : Convert.ToDouble(dataReader["Deduction3"]);
                            deduction.Deduction4 = dataReader["Deduction4"] is DBNull ? 0 : Convert.ToDouble(dataReader["Deduction4"]);
                            deduction.Deduction5 = dataReader["Deduction5"] is DBNull ? 0 : Convert.ToDouble(dataReader["Deduction5"]);
                        }
                    }
                }
            }
            return deduction;
            //var employeeDeductions = _employeeDeductionsRepository.GetAll().Where(o => o.TenantId == AbpSession.TenantId && o.EmployeeID == empID && o.SalaryMonth == month && o.SalaryYear == year && o.DeductionType == typeID);
            //double? totalDeductions = (from x in employeeDeductions select x.Amount).Sum() ?? 0;
            //return Math.Round((double)totalDeductions, 0, MidpointRounding.AwayFromZero);
        }
        private CreateOrEditSalarySheetDto CalculateEarnings(int empID,  short month, int year )
        {
            //var employeeEarnings = _employeeEarningsRepository.GetAll().Where(o => o.TenantId == AbpSession.TenantId && o.EmployeeID == empID && o.SalaryMonth == month && o.SalaryYear == year && o.EarningTypeID == typeID);
            //double? totalEarnings = (from x in employeeEarnings select x.Amount).Sum() ?? 0;
            //return Math.Round((double)totalEarnings, 0, MidpointRounding.AwayFromZero);
            int TenantId = (int)AbpSession.TenantId;
            var earnings = new CreateOrEditSalarySheetDto();
            string str = ConfigurationManager.AppSettings["ConnectionStringHRM"];
            using (SqlConnection cn = new SqlConnection(str))
            {
                using (SqlCommand cmd = new SqlCommand("cal_earnings", cn))
                {
                    cmd.CommandTimeout = 2500;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@tenantid", AbpSession.TenantId);
                    cmd.Parameters.AddWithValue("@empid", empID);
                    cmd.Parameters.AddWithValue("@month", month);
                    cmd.Parameters.AddWithValue("@year", year);
                    cn.Open();
                    using (SqlDataReader dataReader = cmd.ExecuteReader())
                    {
                        while (dataReader.Read())
                        {
                            earnings.Income1 = dataReader["Income1"] is DBNull ? 0 : Convert.ToDouble(dataReader["Income1"]);
                            earnings.Income2 = dataReader["Income2"] is DBNull ? 0 : Convert.ToDouble(dataReader["Income2"]);
                            earnings.Income3 = dataReader["Income3"] is DBNull ? 0 : Convert.ToDouble(dataReader["Income3"]);
                            earnings.Income4 = dataReader["Income4"] is DBNull ? 0 : Convert.ToDouble(dataReader["Income4"]);
                            earnings.Income5 = dataReader["Income5"] is DBNull ? 0 : Convert.ToDouble(dataReader["Income5"]);
                        }
                    }
                }

            }
            return earnings;
        }
        private decimal CalculateWorkDays(int empID, short month, int year)
        {
            int TenantId = (int)AbpSession.TenantId;
            decimal WDays = 0;
            string str = ConfigurationManager.AppSettings["ConnectionStringHRM"];
            using (SqlConnection cn = new SqlConnection(str))
            {
                using (SqlCommand cmd = new SqlCommand("CalculateWorkDays", cn))
                {
                    cmd.CommandTimeout = 2500;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@TenantId", AbpSession.TenantId);
                    cmd.Parameters.AddWithValue("@empID", empID);
                    cmd.Parameters.AddWithValue("@year", year);
                    cmd.Parameters.AddWithValue("@MONTH", month);
                    cn.Open();
                    using (SqlDataReader dataReader = cmd.ExecuteReader())
                    {
                        while (dataReader.Read())
                        {
                            WDays = Convert.ToDecimal(dataReader["working_days"]);
                        }
                    }
                }

            }
            return WDays;

            //decimal workDays = 0;
            //var employee = _employeesRepository.GetAll().Where(e => e.EmployeeID == empID && e.TenantId == AbpSession.TenantId);
            //var attendance = _attendanceDetailRepository.GetAll().Where(o => o.TenantId == AbpSession.TenantId && o.EmployeeID == empID
            //&& o.AttendanceDate.Value.Month == month
            //&& o.AttendanceDate.Value.Year == year
            //&& (o.LeaveType == null)
            //);

                //int restDays = _attendanceDetailRepository.GetAll().Where(o => o.TenantId == AbpSession.TenantId && o.EmployeeID == empID
                //               && o.AttendanceDate.Value.Month == month && o.AttendanceDate.Value.Year == year
                //               && (o.LeaveType == "W" || o.LeaveType == "H")).Count();


                ////var leaves = _employeeLeavesRepository.GetAll()
                ////    .Where(o => o.TenantId == AbpSession.TenantId && o.EmployeeID == empID && o.SalaryMonth == month && o.SalaryYear == year).Select(o => o.LeaveType).Sum();

                //var days = from e in employee
                //           join a in attendance
                //           on new { A = e.EmployeeID, B = e.TenantId } equals new { A = a.EmployeeID, B = a.TenantId }
                //           select new
                //           {
                //               Duty_Hours = Convert.ToDecimal(e.Duty_Hours ?? 0),
                //               TotalHrs = a.TotalHrs ?? 0,
                //               LeaveHours = a.LeaveHours ?? 0,
                //               GraceHours = a.GraceHours ?? 0
                //           };

                //foreach (var item in days)
                //{
                //    decimal workedHours = item.TotalHrs + item.LeaveHours + item.GraceHours;
                //    if (workedHours >= item.Duty_Hours)
                //    {
                //        workDays++;
                //    }
                //    else if (workedHours >= (item.Duty_Hours / 2) && workedHours < item.Duty_Hours)
                //    {
                //        workDays += Convert.ToDecimal(0.5);
                //    }
                //    else if (workedHours < (item.Duty_Hours / 2))
                //    {
                //        workDays += 0;
                //    }

                //};

                //workDays += restDays;

                //return workDays;
        }


        private double CalculatePerDaySalary(int monthDays, double grossSalary)
        {
            return grossSalary / monthDays;
        }

        private double GetEmployeeSalary(double perDaySalary, decimal workDays)
        {
            return Math.Round(perDaySalary * (double)workDays, 0, MidpointRounding.AwayFromZero);
        }

        public async Task<FileDto> GetSalarySheetToExcel(int salaryMonth, int salaryYear)
        {
            var filteredSalarySheet = _salarySheetRepository.GetAll().Where(e => e.SalaryMonth == salaryMonth && e.SalaryYear == salaryYear && e.TenantId == AbpSession.TenantId);

            var query = (from o in filteredSalarySheet
                         select new GetSalarySheetForViewDto()
                         {
                             SalarySheet = new SalarySheetDto
                             {
                                 EmployeeID = o.EmployeeID,
                                 SalaryDate = o.SalaryDate,
                                 SalaryYear = o.SalaryYear,
                                 SalaryMonth = o.SalaryMonth,
                                 gross_salary = o.gross_salary,
                                 basic_salary = o.basic_salary,
                                 total_days = o.total_days,
                                 work_days = o.work_days,
                                 basic_earned = o.basic_earned,
                                 absent_days = o.absent_days,
                                 absent_amount = o.absent_amount,
                                 house_rent = o.house_rent,
                                 ot_hrs = o.ot_hrs,
                                 ot_amount = o.ot_amount,
                                 tax_amount = o.tax_amount,
                                 eobi_amount = o.eobi_amount,
                                 wppf_amount = o.wppf_amount,
                                 social_security_amount = o.social_security_amount,
                                 advance = o.advance,
                                 loan = o.loan,
                                 arrears = o.arrears,
                                 other_deductions = o.other_deductions,
                                 other_earnings = o.other_earnings,
                                 total_earnings = o.total_earnings,
                                 total_deductions = o.total_deductions,
                                 net_salary = o.net_salary,
                                 userid = o.userid,
                                 Id = o.Id
                             }
                         });


            var salarySheetListDtos = await query.ToListAsync();

            return _salarySheetExcelExporter.ExportToFile(salarySheetListDtos);
        }

    }


}
