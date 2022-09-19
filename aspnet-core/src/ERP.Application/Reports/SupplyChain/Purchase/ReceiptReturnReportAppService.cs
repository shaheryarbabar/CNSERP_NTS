using Abp.Domain.Repositories;
using ERP.GeneralLedger.SetupForms;
using ERP.Reports.SupplyChain.Purchase;
using ERP.SupplyChain.Inventory;
using ERP.SupplyChain.Inventory.IC_Item;
using ERP.SupplyChain.Purchase.ReceiptEntry;
using ERP.SupplyChain.Purchase.ReceiptReturn;
using ERP.SupplyChain.Purchase.Requisition;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Text;

namespace ERP.Reports.SupplyChain.Inventory
{
    public class ReceiptReturnReportAppService : ERPReportAppServiceBase , IReceiptReturnReportAppService
    {
        private IRepository<ICItem> _itemRepository;
        private IRepository<ICLocation> _locRepository;
        private IRepository<PORETHeader> _receiptHeaderRepository;
        private IRepository<PORETDetail> _receiptDetailRepository;
        private IRepository<ChartofControl, string> _accRepository;
        private IRepository<AccountSubLedger> _accSubRepository;
        private IRepository<CostCenter> _ccRepository;
        public ReceiptReturnReportAppService(
          IRepository<ICItem> itemRepository,
          IRepository<ICLocation> locRepository,
          IRepository<PORETHeader> receiptHeaderRepository,
          IRepository<PORETDetail> receiptDetailRepository,
          IRepository<ChartofControl, string> accRepository,
          IRepository<AccountSubLedger> accSubRepository,
          IRepository<CostCenter> ccRepository)
        {
            _receiptHeaderRepository = receiptHeaderRepository;
            _receiptDetailRepository = receiptDetailRepository;
            _itemRepository = itemRepository;
            _locRepository = locRepository;
            _accRepository = accRepository;
            _accSubRepository = accSubRepository;
            _ccRepository = ccRepository;
        }
        //public List<ReceiptReturnReport> GetData(int tenantId,
        //    int fromDoc, int toDoc, int typeId)
        //{
        //    //tenantId = tenantId > 0 ? tenantId : (int)AbpSession.TenantId;
        //    var data = from a in _receiptHeaderRepository.GetAll().Where(a => a.TenantId == AbpSession.TenantId && a.DocNo >= fromDoc && a.DocNo <= toDoc)
        //               join
        //               b in _receiptDetailRepository.GetAll().Where(a => a.TenantId == AbpSession.TenantId)
        //               on new { A = a.TenantId, B = a.DocNo , C=a.Id} equals new { A = b.TenantId, B = b.DocNo, C=b.DetID}
        //               join
        //               c in _receiptDetailRepository.GetAll().Where(a => a.TenantId == AbpSession.TenantId)
        //               on new { A = a.TenantId, B = a.Id} equals new { A = c.TenantId, B = c.DetID }
        //               join
        //               d in _locRepository.GetAll().Where(a => a.TenantId == AbpSession.TenantId)
        //               on new { A = Convert.ToInt32(a.LocID), B = a.TenantId } equals new { A = d.LocID, B = d.TenantId }
        //               join
        //               e in _accRepository.GetAll().Where(a => a.TenantId == AbpSession.TenantId)
        //               on new { A = a.AccountID, B = a.TenantId } equals new { A = e.Id, B = e.TenantId }
        //               join
        //               f in _itemRepository.GetAll().Where(a => a.TenantId == AbpSession.TenantId)
        //               on new { A = b.ItemID, B = b.TenantId } equals new { A = f.ItemId, B = f.TenantId }
        //               join
        //               g in _accSubRepository.GetAll().Where(a => a.TenantId == AbpSession.TenantId)
        //               on new { A = a.AccountID, B = a.TenantId, C = Convert.ToInt32(a.SubAccID) } equals new { A = g.AccountID, B = g.TenantId, C = g.Id }
        //               //join
        //               //h in _ccRepository.GetAll().Where(a => a.TenantId == tenantId)
        //               //on new { A = a.CCID, B = a.TenantId} equals new { A = h.CCID, B = h.TenantId }
        //               //where ( && a.TenantId == AbpSession.TenantId)
        //               select new ReceiptReturnReport()
        //               {
        //                   Unit = b.Unit,
        //                   ItemId = b.ItemID,
        //                   Descp = f.Descp,
        //                   Qty = b.Qty,
        //                   Remarks = b.Remarks,
        //                   DocNo = a.DocNo,
        //                   DocDate = a.DocDate.ToString(),
        //                   Id = a.Id,
        //                   LocName = d.LocName,
        //                   Narration = a.Narration,
        //                   AccId = e.Id,
        //                   SubAccId = g.Id,
        //                   AccName = e.AccountName,
        //                   SubAccName = g.SubAccName,
        //                   Amount = b.Amount,
        //                   BillAmount = a.BillAmt,
        //                   BillDate = (a.BillDate.Value.Year + "/" + a.BillDate.Value.Month + "/" + a.BillDate.Value.Day).ToString(),
        //                   BillNo = a.BillNo,
        //                   Rate = b.Rate,
        //                   TaxRate = b.TaxRate,
        //                   TaxAmount = b.TaxAmt,
        //                   NetAmount = b.NetAmount,
        //                   //PONo = a.PODocNo,
        //                   IGPNo = a.IGPNo,
        //                   OrdNo = a.OrdNo,
        //                   RecDocNo = a.RecDocNo,
        //                   Freight = a.Freight,
        //                   AddFreight = a.AddFreight,
        //                   AddDisc = a.AddDisc,
        //                   AddLeak = a.AddLeak,
        //                   AddExp = a.AddExp
        //                   //CCID = a.CCID,
        //                   //CostCenterName = h.CCName
        //               };
        //    return data.ToList();
        //}

        public List<ReceiptReturnReport> GetData(int tenantId,
           int fromDoc, int toDoc, int typeId)
        {

            //var tenantId = AbpSession.TenantId;
            string str = ConfigurationManager.AppSettings["ConnectionString"];
            List<ReceiptReturnReport> ReceiptReturnList = new List<ReceiptReturnReport>();
            using (SqlConnection cn = new SqlConnection(str))
            {
                using (SqlCommand cmd = new SqlCommand("SP_PurchaseReturn", cn))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@fromDoc", fromDoc);
                    cmd.Parameters.AddWithValue("@toDoc", toDoc);
                    cmd.Parameters.AddWithValue("@tenantId", AbpSession.TenantId);

                    cn.Open();
                    using (SqlDataReader rdr = cmd.ExecuteReader())
                    {
                        while (rdr.Read())
                        {
                            ReceiptReturnReport tbData = new ReceiptReturnReport();

                            tbData.Unit = rdr["Unit"] is DBNull ? "" : (rdr["Unit"].ToString());
                            tbData.ItemId = rdr["ItemId"] is DBNull ? "" : (rdr["ItemId"].ToString());
                            tbData.Descp = rdr["Descp"] is DBNull ? "" : (rdr["Descp"].ToString());
                            //tbData.Descp = rdr["Descp"] is DBNull ? "" : (rdr["Descp"].ToString());
                            tbData.Qty = rdr["Qty"] is DBNull ? 0.0 : Convert.ToDouble(rdr["Qty"].ToString());
                            tbData.Remarks = rdr["Remarks"] is DBNull ? "" : (rdr["Remarks"].ToString());
                            tbData.DocNo = rdr["DocNo"] is DBNull ? 0 : Convert.ToInt32(rdr["DocNo"].ToString());
                            tbData.DocDate = rdr["DocDate"] is DBNull ? "" : (rdr["DocDate"].ToString());
                            tbData.Id = rdr["Id"] is DBNull ? 0 : Convert.ToInt32(rdr["Id"].ToString());
                            tbData.LocName = rdr["LocName"] is DBNull ? "" : (rdr["LocName"].ToString());
                            tbData.Narration = rdr["Narration"] is DBNull ? "" : (rdr["Narration"].ToString());
                            tbData.AccId = rdr["AccountID"] is DBNull ? "" : (rdr["AccountID"].ToString());
                            tbData.SubAccId = rdr["SubAccId"] is DBNull ? 0 : Convert.ToInt32(rdr["SubAccId"].ToString());
                            tbData.Amount = rdr["Amount"] is DBNull ? 0.0 : Convert.ToDouble(rdr["Amount"].ToString());
                            tbData.BillAmount = rdr["BillAmt"] is DBNull ? 0.0 : Convert.ToDouble(rdr["BillAmt"].ToString());
                            tbData.BillDate = rdr["BillDate"] is DBNull ? "" : (rdr["BillDate"].ToString());
                            tbData.BillNo = rdr["BillNo"] is DBNull ? "" : (rdr["BillNo"].ToString());
                            tbData.Rate = rdr["Rate"] is DBNull ? 0.0 : Convert.ToDouble(rdr["Rate"].ToString());
                            tbData.TaxRate = rdr["TaxRate"] is DBNull ? 0.0 : Convert.ToDouble(rdr["TaxRate"].ToString());
                            tbData.TaxAmount = rdr["TaxAmt"] is DBNull ? 0.0 : Convert.ToDouble(rdr["TaxAmt"].ToString());
                            tbData.NetAmount = rdr["NetAmount"] is DBNull ? 0.0 : Convert.ToDouble(rdr["NetAmount"].ToString());
                            tbData.IGPNo = rdr["IGPNo"] is DBNull ? "" : (rdr["IGPNo"].ToString());
                            tbData.OrdNo = rdr["OrdNo"] is DBNull ? "" : (rdr["OrdNo"].ToString());
                            tbData.RecDocNo = rdr["RecDocNo"] is DBNull ? 0 : Convert.ToInt32(rdr["RecDocNo"].ToString());
                            tbData.Freight = rdr["NetAmount"] is DBNull ? 0.0 : Convert.ToDouble(rdr["NetAmount"].ToString());
                            tbData.AddFreight = rdr["NetAmount"] is DBNull ? 0.0 : Convert.ToDouble(rdr["NetAmount"].ToString());
                            tbData.AddDisc = rdr["NetAmount"] is DBNull ? 0.0 : Convert.ToDouble(rdr["NetAmount"].ToString());
                            tbData.AddLeak = rdr["NetAmount"] is DBNull ? 0.0 : Convert.ToDouble(rdr["NetAmount"].ToString());
                            tbData.AddExp = rdr["AddExp"] is DBNull ? 0.0 : Convert.ToDouble(rdr["AddExp"].ToString());

                            ReceiptReturnList.Add(tbData);


                        }
                    }
                }
                return ReceiptReturnList;
            }
        }
    }

    
}
