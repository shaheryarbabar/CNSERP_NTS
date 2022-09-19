using Abp.Application.Services;
using System;
using System.Collections.Generic;
using System.Text;

namespace ERP.Reports.SupplyChain.Purchase
{
    public interface IPurchaseOrderStatusReportAppService : IApplicationService
    {
        List<PurchaseOrderStatus> GetData( int fromDoc, int toDoc, string fromDate, string toDate, string fromArDate, string toArDate, int comp, int fromSubAccId, int toSubAccId, string toItem, string fromItem);

    }
    public class PurchaseOrderStatus
    {
        public int PODocNo { get; set; }
        public int GrnNO { get; set; }
        public DateTime DocDate { get; set; }
        public string LocName { get; set; }
        public string ItemID { get; set; }
        public string Descp { get; set; }
        public string UOM { get; set; }
        public string SubAccName { get; set; }
        public DateTime ArrivalDate { get; set; }

        public string UNITDESC { get; set; }
        public double? Qty { get; set; }
        public double? Rate { get; set; }
        public double? Amount { get; set; }
        public double? RecQty { get; set; }
        public double? RetQty { get; set; }
        public double? Balance { get; set; }
        public double? BalAmt { get; set; }


        public bool Posted { get; set; }
        public double POQty { get; set; }
        public double Received { get; set; }
        public double Returned { get; set; }
        public double BAL { get; set; }
        public string COMP { get; set; }
        public string Posted_status { get; set; }
        public double Conver { get; set; }
        public DateTime POHeaderDate { get; set; }
        public DateTime PORECHDate { get; set; }


    }
}
