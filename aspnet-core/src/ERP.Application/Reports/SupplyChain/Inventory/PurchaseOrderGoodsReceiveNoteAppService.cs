using Abp.Domain.Repositories;
using ERP.GeneralLedger.SetupForms;
using ERP.SupplyChain.Inventory;
using ERP.SupplyChain.Inventory.IC_Item;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using Abp.Collections.Extensions;
using Newtonsoft.Json;
using System.Configuration;



namespace ERP.Reports.SupplyChain.Inventory
{
    public class PurchaseOrderGoodsReceiveNoteAppService : ERPReportAppServiceBase
    {
        //private IRepository<GatePass> _gatePassRepository;
        //private IRepository<GatePassDetail> _gatePassDetailRepository;
        //private IRepository<ChartofControl, string> _accountRepository;
        //private IRepository<AccountSubLedger> _accountSubRepository;
        //private IRepository<ICItem> _itemRepository;
        //public PurchaseOrderGoodsReceiveNoteAppService(IRepository<GatePass> gatePassRepository,
        //  IRepository<GatePassDetail> gatePassDetailRepository,
        //  IRepository<ChartofControl, string> accountRepository,
        //  IRepository<AccountSubLedger> accountSubRepository,
        //  IRepository<ICItem> itemRepository)
        //{
        //    _gatePassRepository = gatePassRepository;
        //    _gatePassDetailRepository = gatePassDetailRepository;
        //    _accountRepository = accountRepository;
        //    _accountSubRepository = accountSubRepository;
        //    _itemRepository = itemRepository;
        //}
        public List<PurchaseOrderGoodsReceiveNote> GetPOGRN(string fromDoc, string toDoc)
        {
            List<PurchaseOrderGoodsReceiveNote> POGRNDtoList = new List<PurchaseOrderGoodsReceiveNote>();
            var tenantId = AbpSession.TenantId;
            string str = ConfigurationManager.AppSettings["ConnectionString"];

            using (SqlConnection cn = new SqlConnection(str))
            {
                using (SqlCommand cmd = new SqlCommand("sp_Po_Grs", cn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@FromPo", fromDoc);
                    cmd.Parameters.AddWithValue("@To_Po", toDoc);
                    cmd.Parameters.AddWithValue("@tenantId", tenantId);
                    cn.Open();
                    using (SqlDataReader rdr = cmd.ExecuteReader())
                    {
                        while (rdr.Read())
                        {


                            PurchaseOrderGoodsReceiveNote PurchaseOrderGoodsReceiveNote = new PurchaseOrderGoodsReceiveNote()
                            {

                                PODocNo = !DBNull.Value.Equals(rdr["PODocNo"]) ? rdr["PODocNo"].ToString() : "",
                                DocNo = !DBNull.Value.Equals(rdr["GrnNO"]) ? rdr["GrnNO"].ToString() : "",

                                DocDate = Convert.ToDateTime(rdr["DocDate"]),
                                ItemID = !DBNull.Value.Equals(rdr["ItemID"].ToString()) ? (rdr["ItemID"].ToString()) : "",
                                Descp = !DBNull.Value.Equals(rdr["Descp"]) ? rdr["Descp"].ToString() : "",
                                Unit = !DBNull.Value.Equals(rdr["UOM"]) ? rdr["UOM"].ToString() : "",
                                UNITDESC = !DBNull.Value.Equals(rdr["UNITDESC"]) ? rdr["UNITDESC"].ToString() : "",
                                Posted = !DBNull.Value.Equals(rdr["Posted_status"]) ? rdr["Posted_status"].ToString() : "",
                                LocName = !DBNull.Value.Equals(rdr["LocName"]) ? rdr["LocName"].ToString() : "",


                            };
                            POGRNDtoList.Add(PurchaseOrderGoodsReceiveNote);
                        }
                    }
                    cn.Close();
                }
            }
            return POGRNDtoList.ToList();
        }


        public class PurchaseOrderGoodsReceiveNote
        {

            public int Id { get; set; }
            public int TenantId { get; set; }
            public int LocID { get; set; }
            public string DocNo { get; set; }
            public string AccountID { get; set; }
            public string LocName { get; set; }
            public string Descp { get; set; }
            public string ItemID { get; set; }
            public int SubAccID { get; set; }
            public string Narration { get; set; }
            public string IGPNo { get; set; }
            public string Unit { get; set; }
            public string UNITDESC { get; set; }
            public string BillNo { get; set; }
            public DateTime BillDate { get; set; }
            public DateTime DocDate { get; set; }
            public Double BillAmt { get; set; }
            public Double TotalQty { get; set; }
            public Double TotalAmt { get; set; }
            public string Posted { get; set; }
            public string PostedBy { get; set; }
            public DateTime PostedDate { get; set; }
            public int LinkDetID { get; set; }
            public string PODocNo { get; set; }
            public int OrdNo { get; set; }
            public int RecDocNo { get; set; }
            public Double Freight { get; set; }
            public Double AddExp { get; set; }
            public string CCID { get; set; }
            public Double AddDisc { get; set; }
            public Double AddLeak { get; set; }
            public Double AddFreight { get; set; }
            public string onHold { get; set; }
            public string Active { get; set; }
            public string AudtUser { get; set; }
            public DateTime AudtDate { get; set; }
            public string CreatedBy { get; set; }
            public DateTime CreateDate { get; set; }
            public string Approved { get; set; }
            public string ApprovedBy { get; set; }
            public DateTime ApprovedDate { get; set; }
            public string TermDays { get; set; }

        }
    }
}