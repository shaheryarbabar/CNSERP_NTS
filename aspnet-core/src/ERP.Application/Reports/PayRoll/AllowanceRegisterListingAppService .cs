
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
    public class AllowanceRegisterListingAppService: ERPReportAppServiceBase
    {

        public List<AllowanceRegisterListingDto>GetData(int? TenantId, string fromEmpID, string toEmpID, string fromDeptID, string toDeptID, string fromSecID, string toSecID, string fromSalary, string toSalary, short SalaryMonth, short SalaryYear, string fromLocId, string toLocId, string Emptype)
        
        {

            SqlCommand cmd;
            var tenantId = AbpSession.TenantId;
            string str = ConfigurationManager.AppSettings["ConnectionStringHRM"];
            List<AllowanceRegisterListingDto> AllowanceRegisterListingDtoList = new List<AllowanceRegisterListingDto>();
            using (SqlConnection cn = new SqlConnection(str))
            {


                cmd = new SqlCommand("sp_Earning_Register", cn);
                cmd.CommandType = CommandType.StoredProcedure;
              
              
                //cmd.Parameters.AddWithValue("@fromSecID", fromSecID);
                //cmd.Parameters.AddWithValue("@toSecID", toSecID);
                //cmd.Parameters.AddWithValue("@fromSalary", fromSalary);
                //cmd.Parameters.AddWithValue("@toSalary", toSalary);

                cmd.Parameters.AddWithValue("@fromDeptID", fromDeptID);
                cmd.Parameters.AddWithValue("@toDeptID", toDeptID);
                cmd.Parameters.AddWithValue("@fromEmpID", fromEmpID);
                cmd.Parameters.AddWithValue("@toEmpID", toEmpID);
                cmd.Parameters.AddWithValue("@SalaryMonth", SalaryMonth);
                cmd.Parameters.AddWithValue("@SalaryYear", SalaryYear);
                cmd.Parameters.AddWithValue("@tenantId", tenantId);


                cn.Open();
                using (SqlDataReader rdr = cmd.ExecuteReader())
                {


                    while (rdr.Read())
                    {

                        AllowanceRegisterListingDto AllowanceRegisterListingDto = new AllowanceRegisterListingDto()

                        {

 //                           a.EmployeeID,e.DeptName,a.arrears
 //,@EarningTypeName1 as EarningTypeName1,@EarningTypeName2 as EarningTypeName2,@EarningTypeName3 as EarningTypeName3, @EarningTypeName4 as EarningTypeName4,@EarningTypeName5 as EarningTypeName5,
 // a.Income1,a.Income2,A.Income3 , A.Income4,A.Income5 ,
 // A.SalaryMonth,A.SalaryYear





                            EmployeeID = rdr["EmployeeID"] is DBNull ? "" : rdr["EmployeeID"].ToString(),
                            EmployeeName = rdr["EmployeeName"] is DBNull ? "" : rdr["EmployeeName"].ToString(),
                            DeptName = rdr["DeptName"] is DBNull ? "" : rdr["DeptName"].ToString(),
                           
                           
                                  arrears = rdr["arrears"] is DBNull ? "" : rdr["arrears"].ToString(),
                        
                            //Deduction1 = rdr["Deduction1"] is DBNull ? "" : rdr["Deduction1"].ToString(),
                            //Deduction2 = rdr["Deduction2"] is DBNull ? "" : rdr["Deduction2"].ToString(),
                            //Deduction3 = rdr["Deduction3"] is DBNull ? "" : rdr["Deduction3"].ToString(),
                            //Deduction4 = rdr["Deduction4"] is DBNull ? "" : rdr["Deduction4"].ToString(),
                            //Deduction5 = rdr["Deduction5"] is DBNull ? "" : rdr["Deduction5"].ToString(),
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
                            
                        
                           


                        };
                        AllowanceRegisterListingDtoList.Add(AllowanceRegisterListingDto);


                    }
                }
            }
            return AllowanceRegisterListingDtoList;

        }

    }

    public class AllowanceRegisterListingDto
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

    }
}

