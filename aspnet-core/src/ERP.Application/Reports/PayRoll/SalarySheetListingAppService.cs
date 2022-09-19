
using System;
using System.Collections.Generic;

using Abp.Authorization;
using ERP.Authorization;

using System.Configuration;
using System.Data.SqlClient;
using System.Data;

namespace ERP.Reports.PayRoll
{
    [AbpAuthorize(AppPermissions.PayRollReports_SalaryReports)]
    public class SalarySheetListingAppService : ERPReportAppServiceBase
    {

        public List<SalarySheetListingDto> GetData(int? TenantId, string fromEmpID, string toEmpID, string fromDeptID, string toDeptID, string fromSecID, string toSecID, string fromSalary, string toSalary, short SalaryMonth, short SalaryYear, string fromLocId, string toLocId, string Emptype, string Employee_PaymentMode)

        {

            SqlCommand cmd;
            var tenantId = AbpSession.TenantId;
            string str = ConfigurationManager.AppSettings["ConnectionStringHRM"];
            List<SalarySheetListingDto> SalarySheetListingDtoList = new List<SalarySheetListingDto>();
            using (SqlConnection cn = new SqlConnection(str))

            {


                cmd = new SqlCommand("SP_Salarysheet_Register", cn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@fromEmpID", fromEmpID);
                cmd.Parameters.AddWithValue("@toEmpID", toEmpID);
                cmd.Parameters.AddWithValue("@fromDeptID", fromDeptID);
                cmd.Parameters.AddWithValue("@toDeptID", toDeptID);
                cmd.Parameters.AddWithValue("@fromSecID", fromSecID);
                cmd.Parameters.AddWithValue("@toSecID", toSecID);
                cmd.Parameters.AddWithValue("@fromSalary", fromSalary);
                cmd.Parameters.AddWithValue("@toSalary", toSalary);
                cmd.Parameters.AddWithValue("@SalaryMonth", SalaryMonth);
                cmd.Parameters.AddWithValue("@SalaryYear", SalaryYear);
                cmd.Parameters.AddWithValue("@tenantId", tenantId);
                cmd.Parameters.AddWithValue("@fromLocId", fromLocId);
                cmd.Parameters.AddWithValue("@toLocId", toLocId);
                cmd.Parameters.AddWithValue("@employeeType", Emptype);
                cmd.Parameters.AddWithValue("@payment", Employee_PaymentMode);


                cn.Open();
                using (SqlDataReader rdr = cmd.ExecuteReader())
                {


                    while (rdr.Read())
                    {

                        SalarySheetListingDto SalarySheetListingDto = new SalarySheetListingDto()

                        {



                            EmployeeID = rdr["EmployeeID"] is DBNull ? "" : rdr["EmployeeID"].ToString(),
                            EmployeeName = rdr["EmployeeName"] is DBNull ? "" : rdr["EmployeeName"].ToString(),
                            DeptName = rdr["DeptName"] is DBNull ? "" : rdr["DeptName"].ToString(),
                            Section = rdr["Section"] is DBNull ? "" : rdr["Section"].ToString(),
                            date_of_joining = rdr["date_of_joining"] is DBNull ? "" : rdr["date_of_joining"].ToString(),
                            date_of_leaving = rdr["date_of_leaving"] is DBNull ? "" : rdr["date_of_leaving"].ToString(),
                            work_days = rdr["work_days"] is DBNull ? "" : rdr["work_days"].ToString(),
                            gross_salary = rdr["gross_salary"] is DBNull ? "" : rdr["gross_salary"].ToString(),
                            basic_earned = rdr["basic_earned"] is DBNull ? "" : rdr["basic_earned"].ToString(),
                            arrears = rdr["arrears"] is DBNull ? "" : rdr["arrears"].ToString(),
                            ot_amount = rdr["ot_amount"] is DBNull ? "" : rdr["ot_amount"].ToString(),
                            Deduction1 = rdr["Deduction1"] is DBNull ? "" : rdr["Deduction1"].ToString(),
                            Deduction2 = rdr["Deduction2"] is DBNull ? "" : rdr["Deduction2"].ToString(),
                            Deduction3 = rdr["Deduction3"] is DBNull ? "" : rdr["Deduction3"].ToString(),
                            Deduction4 = rdr["Deduction4"] is DBNull ? "" : rdr["Deduction4"].ToString(),
                            Deduction5 = rdr["Deduction5"] is DBNull ? "" : rdr["Deduction5"].ToString(),
                            Income1 = rdr["Income1"] is DBNull ? "" : rdr["Income1"].ToString(),
                            Income2 = rdr["Income2"] is DBNull ? "" : rdr["Income2"].ToString(),
                            Income3 = rdr["Income3"] is DBNull ? "" : rdr["Income3"].ToString(),
                            Income4 = rdr["Income4"] is DBNull ? "" : rdr["Income4"].ToString(),
                            Income5 = rdr["Income5"] is DBNull ? "" : rdr["Income5"].ToString(),
                            EarningTypeName1 = rdr["EarningTypeName1"] is DBNull ? "" : rdr["EarningTypeName1"].ToString(),
                            EarningTypeName2 = rdr["EarningTypeName2"] is DBNull ? "" : rdr["EarningTypeName2"].ToString(),
                            EarningTypeName3 = rdr["EarningTypeName3"] is DBNull ? "" : rdr["EarningTypeName3"].ToString(),
                            EarningTypeName4 = rdr["EarningTypeName4"] is DBNull ? "" : rdr["EarningTypeName4"].ToString(),
                            EarningTypeName5 = rdr["EarningTypeName5"] is DBNull ? "" : rdr["EarningTypeName5"].ToString(),
                            Deductiontyepname1 = rdr["Deductiontyepname1"] is DBNull ? "" : rdr["Deductiontyepname1"].ToString(),
                            Deductiontyepname2 = rdr["Deductiontyepname2"] is DBNull ? "" : rdr["Deductiontyepname2"].ToString(),
                            Deductiontyepname3 = rdr["Deductiontyepname3"] is DBNull ? "" : rdr["Deductiontyepname3"].ToString(),
                            Deductiontyepname4 = rdr["Deductiontyepname4"] is DBNull ? "" : rdr["Deductiontyepname4"].ToString(),
                            Deductiontyepname5 = rdr["Deductiontyepname5"] is DBNull ? "" : rdr["Deductiontyepname5"].ToString(),
                            tax_amount = rdr["tax_amount"] is DBNull ? "" : rdr["tax_amount"].ToString(),
                            total_earnings = rdr["total_earnings"] is DBNull ? "" : rdr["total_earnings"].ToString(),
                            total_deduction = rdr["total_deduction"] is DBNull ? "" : rdr["total_deduction"].ToString(),
                            payment_mode = rdr["payment_mode"] is DBNull ? "" : rdr["payment_mode"].ToString(),
                            SortId = rdr["SortId"] is DBNull ? "" : rdr["SortId"].ToString(),
                            TypeID = rdr["TypeID"] is DBNull ? "" : rdr["TypeID"].ToString(),
                            loan = rdr["loan"] is DBNull ? "" : rdr["loan"].ToString(),
                            employee_type = rdr["employee_type"] is DBNull ? "" : rdr["employee_type"].ToString(),
                            advances = rdr["advances"] is DBNull ? "" : rdr["advances"].ToString(),
                            designation = rdr["designation"] is DBNull ? "" : rdr["designation"].ToString(),
                            eobi_amount = rdr["eobi_amount"] is DBNull ? "" : rdr["eobi_amount"].ToString(),
                            TenantId = rdr["TenantId"] is DBNull ? "" : rdr["TenantId"].ToString(),
                            LocationName = rdr["Location"] is DBNull ? "" : rdr["Location"].ToString()


                            //basic_earned = rdr!DBNull.Value.Equals(rdr["basic_earned"]) ? rdr["basic_earned"].ToString() : "",
                            //arrears = rdr!DBNull.Value.Equals(rdr["arrears"]) ? rdr["arrears"].ToString() : "",
                            //ot_amount = rdr!DBNull.Value.Equals(rdr["ot_amount"]) ? rdr["ot_amount"].ToString() : "",
                            //Deduction1 = rdr!DBNull.Value.Equals(rdr["Deduction1"]) ? rdr["Deduction1"].ToString() : "",
                            //Deduction2 = rdr!DBNull.Value.Equals(rdr["Deduction2"]) ? rdr["Deduction2"].ToString() : "",
                            //Deduction3 = rdr!DBNull.Value.Equals(rdr["Deduction3"]) ? rdr["Deduction3"].ToString() : "",
                            //Deduction4 = rdr!DBNull.Value.Equals(rdr["Deduction4"]) ? rdr["Deduction4"].ToString() : "",
                            //Deduction5 = rdr!DBNull.Value.Equals(rdr["Deduction5"]) ? rdr["Deduction5"].ToString() : "",
                            //Income1 = rdr!DBNull.Value.Equals(rdr["Income1"]) ? rdr["Income1"].ToString() : "",

                            //Income2 = rdr!DBNull.Value.Equals(rdr["Income2"]) ? rdr["Income2"].ToString() : "",
                            //Income3 = rdr!DBNull.Value.Equals(rdr["Income3"]) ? rdr["Income3"].ToString() : "",
                            //Income4 = rdr!DBNull.Value.Equals(rdr["Income4"]) ? rdr["Income4"].ToString() : "",
                            //Income5 = rdr!DBNull.Value.Equals(rdr["Income5"]) ? rdr["Income5"].ToString() : "",


                            //EarningTypeName1 = rdr!DBNull.Value.Equals(rdr["EarningTypeName1"]) ? rdr["EarningTypeName1"].ToString() : "",
                            //EarningTypeName2 = rdr!DBNull.Value.Equals(rdr["EarningTypeName2"]) ? rdr["EarningTypeName2"].ToString() : "",
                            //EarningTypeName3 = rdr!DBNull.Value.Equals(rdr["EarningTypeName3"]) ? rdr["EarningTypeName3"].ToString() : "",
                            //EarningTypeName4 = rdr!DBNull.Value.Equals(rdr["EarningTypeName4"]) ? rdr["EarningTypeName4"].ToString() : "",
                            //EarningTypeName5 = rdr!DBNull.Value.Equals(rdr["EarningTypeName5"]) ? rdr["EarningTypeName5"].ToString() : "",
                            //Deductiontyepname1 = rdr!DBNull.Value.Equals(rdr["Deductiontyepname1"]) ? rdr["Deductiontyepname1"].ToString() : "",
                            //Deductiontyepname2 = rdr!DBNull.Value.Equals(rdr["Deductiontyepname2"]) ? rdr["Deductiontyepname2"].ToString() : "",
                            //Deductiontyepname3 = rdr!DBNull.Value.Equals(rdr["Deductiontyepname3"]) ? rdr["Deductiontyepname3"].ToString() : "",
                            //Deductiontyepname4 = rdr!DBNull.Value.Equals(rdr["Deductiontyepname4"]) ? rdr["Deductiontyepname4"].ToString() : "",
                            //Deductiontyepname5 = rdr!DBNull.Value.Equals(rdr["Deductiontyepname5"]) ? rdr["Deductiontyepname5"].ToString() : "",
                            //Deduction1 = rdr!DBNull.Value.Equals(rdr["Deduction1"]) ? rdr["Deduction1"].ToString() : "",
                            //Deduction2 = rdr!DBNull.Value.Equals(rdr["Deduction2"]) ? rdr["Deduction2"].ToString() : "",
                            //Deduction3 = rdr!DBNull.Value.Equals(rdr["Deduction3"]) ? rdr["Deduction3"].ToString() : "",
                            //Deduction4 = rdr!DBNull.Value.Equals(rdr["Deduction4"]) ? rdr["Deduction4"].ToString() : "",
                            //Deduction5 = rdr!DBNull.Value.Equals(rdr["Deduction5"]) ? rdr["Deduction5"].ToString() : "",
                            //tax_amount = rdr!DBNull.Value.Equals(rdr["tax_amount"]) ? rdr["tax_amount"].ToString() : "",
                            //total_earnings = rdr!DBNull.Value.Equals(rdr["total_earnings"]) ? rdr["total_earnings"].ToString() : "",
                            //total_deduction = rdr!DBNull.Value.Equals(rdr["total_deduction"]) ? rdr["total_deduction"].ToString() : "",
                            //payment_mode = rdr!DBNull.Value.Equals(rdr["payment_mode"]) ? rdr["payment_mode"].ToString() : "",
                            //loan = rdr!DBNull.Value.Equals(rdr["loan"]) ? rdr["loan"].ToString() : "",
                            //SortId = rdr!DBNull.Value.Equals(rdr["SortId"]) ? rdr["SortId"].ToString() : "",
                            //TypeID = rdr!DBNull.Value.Equals(rdr["TypeID"]) ? rdr["TypeID"].ToString() : "",
                            //employee_type = rdr!DBNull.Value.Equals(rdr["employee_type"]) ? rdr["employee_type"].ToString() : "",
                            //advance = rdr!DBNull.Value.Equals(rdr["advances"]) ? rdr["advances"].ToString() : "",
                            //designation = rdr!DBNull.Value.Equals(rdr["designation"]) ? rdr["designation"].ToString() : "",
                            //eobi_amount = rdr!DBNull.Value.Equals(rdr["eobi_amount"]) ? rdr["eobi_amount"].ToString() : "",


                        };
                        SalarySheetListingDtoList.Add(SalarySheetListingDto);


                    }
                }
            }
            return SalarySheetListingDtoList;





        }


        public List<LoanBalnaceListingDto> GetLoanType(int? TenantId, string fromEmpID, string toEmpID, string fromDeptID, string toDeptID, string fromSecID, string toSecID, string fromSalary, string toSalary, short SalaryMonth, short SalaryYear, string fromLocId, string toLocId, string loanTypeId, string tolaonTypeId)

        {

            SqlCommand cmd;
            var tenantId = AbpSession.TenantId;
            string str = ConfigurationManager.AppSettings["ConnectionStringHRM"];
            List<LoanBalnaceListingDto> LoanBalanceListingDtoList = new List<LoanBalnaceListingDto>();
            using (SqlConnection cn = new SqlConnection(str))

            {


                cmd = new SqlCommand("Sp_LoanBalSummary", cn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@fromLocId", Convert.ToInt32(fromLocId));
                cmd.Parameters.AddWithValue("@toLocId", Convert.ToInt32( toLocId));
                cmd.Parameters.AddWithValue("@fromdeptid", Convert.ToInt32( fromDeptID));
                cmd.Parameters.AddWithValue("@todeptid",Convert.ToInt32( toDeptID));
                cmd.Parameters.AddWithValue("@LoanType",Convert.ToInt32( loanTypeId));
                cmd.Parameters.AddWithValue("@Month",Convert.ToInt32( SalaryMonth));
                cmd.Parameters.AddWithValue("@Year", Convert.ToInt32( SalaryYear));
                




                cn.Open();
                using (SqlDataReader rdr = cmd.ExecuteReader())
                {


                    while (rdr.Read())
                    {

                        LoanBalnaceListingDto LoanBalnaceListingDto = new LoanBalnaceListingDto()

                        {



                            EmployeeID = rdr["EmployeeID"] is DBNull ? 0 : Convert.ToInt32(rdr["EmployeeID"]),
                            EmployeeName = rdr["EmployeeName"] is DBNull ? "" : rdr["EmployeeName"].ToString(),
                            LoanTypeId = rdr["LoanTypeId"] is DBNull ? 0 : Convert.ToInt32( rdr["LoanTypeId"]),
                            LoanTypeName = rdr["LoanTypeName"] is DBNull ? "": rdr["LoanTypeName"].ToString(),
                            LoanAmt = rdr["LoanAmt"] is DBNull ? 0  : Convert.ToInt32( rdr["LoanAmt"]),
                            Refund = rdr["Refund"] is DBNull ? 0 :Convert.ToDouble( rdr["Refund"]),
                            InsAmt = rdr["InsAmt"] is DBNull ? 0 : Convert.ToDouble( rdr["InsAmt"]),
                            Balance = rdr["Balance"] is DBNull ? 0 :Convert.ToDouble( rdr["Balance"]),
                            DeptName = rdr["DeptName"]  is DBNull ? "" : rdr["DeptName"].ToString(),
                            LocName = rdr["LocName"] is DBNull ? "" : rdr["LocName"].ToString(),





                        };
                        LoanBalanceListingDtoList.Add(LoanBalnaceListingDto);


                    }
                }
            }
            return LoanBalanceListingDtoList;





        }



    }


    public class SalarySheetListingDto
    {
        public string EmployeeID { get; set; }
        public string TenantId { get; set; }
        public string EmployeeName { get; set; }
        public string DeptName { get; set; }

        public string Section { get; set; }
        public string date_of_joining { get; set; }
        public string date_of_leaving { get; set; }
        public string work_days { get; set; }
        public string gross_salary { get; set; }
        public string basic_earned { get; set; }
        public string arrears { get; set; }
        public string ot_amount { get; set; }
        public string Deduction1 { get; set; }
        public string Deduction2 { get; set; }
        public string Deduction3 { get; set; }
        public string Deduction4 { get; set; }
        public string Deduction5 { get; set; }
        public string Income1 { get; set; }
        public string Income2 { get; set; }
        public string Income3 { get; set; }
        public string Income4 { get; set; }
        public string Income5 { get; set; }
        public string EarningTypeName1 { get; set; }
        public string EarningTypeName2 { get; set; }
        public string EarningTypeName3 { get; set; }
        public string EarningTypeName4 { get; set; }
        public string EarningTypeName5 { get; set; }
        public string Deductiontyepname1 { get; set; }
        public string Deductiontyepname2 { get; set; }
        public string Deductiontyepname3 { get; set; }
        public string Deductiontyepname4 { get; set; }
        public string Deductiontyepname5 { get; set; }

        public string tax_amount { get; set; }
        public string total_earnings { get; set; }
        public string total_deduction { get; set; }
        public virtual string payment_mode { get; set; }
        public string loan { get; set; }
        public string SortId { get; set; }
        public string TypeID { get; set; }
        public string employee_type { get; set; }
        public string advances { get; set; }

        //public string FatherName { get; set; }
        public string designation { get; set; }
        //public string Deduction5 { get; set; }
        //public string ot_hrs { get; set; }
        public string advance { get; set; }
        //public string loan { get; set; }
        public string eobi_amount { get; set; }
        //public string Bank_Amount { get; set; }
        //public string MonthYear { get; set; }
        public string LocationName { get; set; }

    }



    public class LoanBalnaceListingDto
    {
        public int  EmployeeID { get; set; }
        public int TenantId { get; set; }
        public string EmployeeName { get; set; }
        public int LoanTypeId { get; set; }
        public string LoanTypeName { get; set; }
        public double LoanAmt { get; set; }
        public double Refund { get; set; }
        public double InsAmt { get; set; }
        public double Balance { get; set; }
        public string DeptName { get; set; }
        public string LocName { get; set; }





    }

}