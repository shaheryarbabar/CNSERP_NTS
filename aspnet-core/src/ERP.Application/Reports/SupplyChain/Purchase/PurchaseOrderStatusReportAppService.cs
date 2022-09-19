using Abp.Domain.Repositories;
using ERP.Reports.SupplyChain.Purchase;
using ERP.SupplyChain.Inventory.IC_Item;
using ERP.SupplyChain.Purchase;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Linq.Dynamic.Core;

namespace ERP.Reports.SupplyChain.Inventory
{
    public class PurchaseOrderStatusReportAppService : ERPReportAppServiceBase, IPurchaseOrderStatusReportAppService
    {
        private readonly IRepository<POSTAT> _repository;
        private readonly IRepository<ICItem> _icitemRepository;
        public PurchaseOrderStatusReportAppService(
            IRepository<POSTAT> repository,
            IRepository<ICItem> icitemRepository)
        {
            _repository = repository;
            _icitemRepository = icitemRepository;
        }
        public List<PurchaseOrderStatus> GetData( int fromDoc, int toDoc, string fromDate, string toDate, string fromArDate, string toArDate, int comp, int fromSubAccId, int toSubAccId, string fromItem, string toItem)
        {
            string str = ConfigurationManager.AppSettings["ConnectionString"];
            var result = new List<PurchaseOrderStatus>();

            using (SqlConnection cn = new SqlConnection(str))
            {
                using (SqlCommand cmd = new SqlCommand("sp_Po_Grs", cn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@TENANTID", AbpSession.TenantId);
                    cmd.Parameters.AddWithValue("@FROMDOCNO", fromDoc);
                    cmd.Parameters.AddWithValue("@TODOCNO", toDoc);
                    cmd.Parameters.AddWithValue("@FROMDATE", fromDate);
                    cmd.Parameters.AddWithValue("@TODATE", toDate);
                    cmd.Parameters.AddWithValue("@FROMARDATE", fromArDate);
                    cmd.Parameters.AddWithValue("@TOARDATE", toArDate);
                    cmd.Parameters.AddWithValue("@Comp", comp);
                    cmd.Parameters.AddWithValue("@FROMVENDOR", fromSubAccId);
                    cmd.Parameters.AddWithValue("@TOVENDOR", toSubAccId);
                    cmd.Parameters.AddWithValue("@fromItem", fromItem);
                    cmd.Parameters.AddWithValue("@toItem", toItem);

                    cn.Open();
                    using (SqlDataReader dataReader = cmd.ExecuteReader())
                    {

                        while (dataReader.Read())
                        {

                            result.Add(new PurchaseOrderStatus
                            {
                                PODocNo = dataReader["PODocno"] is DBNull ? 0 : Convert.ToInt32(dataReader["PODocno"]),
                                GrnNO = dataReader["GRNNO"] is DBNull ? 0 : Convert.ToInt32(dataReader["GRNNO"]),
                                DocDate = Convert.ToDateTime(dataReader["Docdate"]),
                                //ArrivalDate = Convert.ToDateTime(dataReader["ArrivalDate"]),
                                LocName = dataReader["locname"] is DBNull ? "" : dataReader["locname"].ToString(),
                                SubAccName = dataReader["SubAccName"] is DBNull ? "" : dataReader["SubAccName"].ToString(),
                                ItemID = dataReader["ItemID"] is DBNull ? "" : dataReader["ItemID"].ToString(),
                                Descp  = dataReader["Descp"] is DBNull ? "" : dataReader["Descp"].ToString(),
                                UOM = dataReader["Unit"] is DBNull ? "" : dataReader["Unit"].ToString(),
                                //UNITDESC = dataReader["UNITDESC"] is DBNull ? "" : dataReader["UNITDESC"].ToString(),
                                POQty = dataReader["POQty"] is DBNull ? 0 : Convert.ToDouble(dataReader["POQty"]),
                                Received = dataReader["Received"] is DBNull ? 0 : Convert.ToDouble(dataReader["Received"]),
                                Returned = dataReader["Returned"] is DBNull ? 0 : Convert.ToDouble(dataReader["Returned"]),
                                BAL = dataReader["QtyP"] is DBNull ? 0 : Convert.ToDouble(dataReader["QtyP"]),
                                //Rate = dataReader["Rate"] is DBNull ? 0 : Convert.ToDouble(dataReader["Rate"]),
                                //COMP = dataReader["COMP"] is DBNull ? "" : dataReader["COMP"].ToString(),
                                Posted_status = dataReader["POSTATUS"] is DBNull ? "" : dataReader["POSTATUS"].ToString(),
                                Conver = dataReader["Conver"] is DBNull ? 0 : Convert.ToDouble(dataReader["Conver"]),
                                POHeaderDate = Convert.ToDateTime(dataReader["POHeaderDate"]),
                                PORECHDate = Convert.ToDateTime(dataReader["PORECHDate"]),
                                //Amount = dataReader["AMOUNT"] is DBNull ? 0 : Convert.ToDouble(dataReader["AMOUNT"])

                            });
                        }

                    }
                    //// cn.Close();
                }
            }
            return result;

            //if (subAccId == 0)
            //{
            //    tenantId = tenantId > 0 ? tenantId : (int)AbpSession.TenantId;
            //    IQueryable<PurchaseOrderStatus> data1 = null;
            //    var data = from a in _repository.GetAll().Where(o => o.TenantId == tenantId)
            //               join
            //               b in _icitemRepository.GetAll().Where(o => o.TenantId == tenantId)
            //               on new { A = a.ItemID, B = a.TenantId } equals new { A = b.ItemId, B = b.TenantId }
            //               where (a.TenantId == tenantId && a.DocDate.Value.Date >= Convert.ToDateTime(fromDate).Date
            //               && a.DocDate.Value.Date <= Convert.ToDateTime(toDate).Date && a.ArrivalDate.Value.Date >= Convert.ToDateTime(fromArDate).Date
            //               && a.ArrivalDate.Value.Date <= Convert.ToDateTime(toArDate).Date && 
            //               a.DocNo >= fromDoc && a.DocNo <= toDoc
            //               )
            //               select new PurchaseOrderStatus()
            //               {
            //                   Party = a.LedgerDesc + "-" + a.SubAccName,
            //                   DocNo = a.DocNo.ToString(),
            //                   ItemId = b.ItemId,
            //                   Convr = b.Conver,
            //                   ItemDesc = b.Descp,
            //                   Qty = a.Qty,
            //                   Rate = a.Rate,
            //                   Amount = a.Amount,
            //                   RecQty = a.Received,
            //                   RetQty = a.Returned,
            //                   Unit = a.Unit,
            //                   Balance = a.Qty - (a.Received + a.Returned),
            //                   BalAmt = a.QtyPAmt
            //               };
            //    if (data.Count() > 0)
            //    {
            //        if (comp == "Both")
            //        {
            //            data1 = data;
            //        }
            //        else if (comp == "Completed")
            //        {
            //            data1 = data.Where(c => c.Balance == 0);

            //        }
            //        else
            //        {
            //            data1 = data.Where(c => c.Balance != 0);
            //        }

            //    }

            //    return data1.ToList();
            //}
            //else
            //{
            //    tenantId = tenantId > 0 ? tenantId : (int)AbpSession.TenantId;
            //    IQueryable<PurchaseOrderStatus> data1 = null;
            //    var data = from a in _repository.GetAll().Where(o => o.TenantId == tenantId)
            //               join
            //               b in _icitemRepository.GetAll().Where(o => o.TenantId == tenantId)
            //               on new { A = a.ItemID, B = a.TenantId } equals new { A = b.ItemId, B = b.TenantId }
            //               where (a.TenantId == tenantId && a.DocDate.Value.Date >= Convert.ToDateTime(fromDate).Date
            //               && a.DocDate.Value.Date <= Convert.ToDateTime(toDate).Date && a.ArrivalDate.Value.Date >= Convert.ToDateTime(fromArDate).Date
            //               && a.ArrivalDate.Value.Date <= Convert.ToDateTime(toArDate).Date && a.SubAccId == subAccId &&
            //               a.DocNo >= fromDoc && a.DocNo <= toDoc
            //               )
            //               select new PurchaseOrderStatus()
            //               {
            //                   Party = a.LedgerDesc + "-" + a.SubAccName,
            //                   DocNo = a.DocNo.ToString(),
            //                   ItemId = b.ItemId,
            //                   Convr = b.Conver,
            //                   ItemDesc = b.Descp,
            //                   Qty = a.Qty,
            //                   Rate = a.Rate,
            //                   Amount = a.Amount,
            //                   RecQty = a.Received,
            //                   RetQty = a.Returned,
            //                   Unit = a.Unit,
            //                   Balance = a.Qty - (a.Received + a.Returned),
            //                   BalAmt = a.QtyPAmt
            //               };



            //    if (data.Count() > 0)
            //    {
            //        if (comp == "Both")
            //        {
            //            data1 = data.Where(c => c.Balance == 0);
            //        }
            //        else
            //        {
            //            data1 = data.Where(c => c.Balance != 0);
            //        }
            //    }

            //    return data1.ToList();
            //}
        }
    }

}
