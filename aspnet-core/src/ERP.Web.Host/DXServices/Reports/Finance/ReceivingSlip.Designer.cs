//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.42000
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ERP.Web.DXServices.Reports.Finance {
    
    public partial class ReceivingSlip : DevExpress.XtraReports.UI.XtraReport {
        private void InitializeComponent() {
            DevExpress.XtraReports.ReportInitializer reportInitializer = new DevExpress.XtraReports.ReportInitializer(this, "ERP.Web.DXServices.Reports.Finance.ReceivingSlip.repx");

            // Controls
            this.TopMargin = reportInitializer.GetControl<DevExpress.XtraReports.UI.TopMarginBand>("TopMargin");
            this.BottomMargin = reportInitializer.GetControl<DevExpress.XtraReports.UI.BottomMarginBand>("BottomMargin");
            this.Detail = reportInitializer.GetControl<DevExpress.XtraReports.UI.DetailBand>("Detail");
            this.label17 = reportInitializer.GetControl<DevExpress.XtraReports.UI.XRLabel>("label17");
            this.label16 = reportInitializer.GetControl<DevExpress.XtraReports.UI.XRLabel>("label16");
            this.label13 = reportInitializer.GetControl<DevExpress.XtraReports.UI.XRLabel>("label13");
            this.label15 = reportInitializer.GetControl<DevExpress.XtraReports.UI.XRLabel>("label15");
            this.label12 = reportInitializer.GetControl<DevExpress.XtraReports.UI.XRLabel>("label12");
            this.label11 = reportInitializer.GetControl<DevExpress.XtraReports.UI.XRLabel>("label11");
            this.label10 = reportInitializer.GetControl<DevExpress.XtraReports.UI.XRLabel>("label10");
            this.label8 = reportInitializer.GetControl<DevExpress.XtraReports.UI.XRLabel>("label8");
            this.label7 = reportInitializer.GetControl<DevExpress.XtraReports.UI.XRLabel>("label7");
            this.label6 = reportInitializer.GetControl<DevExpress.XtraReports.UI.XRLabel>("label6");
            this.label9 = reportInitializer.GetControl<DevExpress.XtraReports.UI.XRLabel>("label9");
            this.label1 = reportInitializer.GetControl<DevExpress.XtraReports.UI.XRLabel>("label1");
            this.label4 = reportInitializer.GetControl<DevExpress.XtraReports.UI.XRLabel>("label4");
            this.label5 = reportInitializer.GetControl<DevExpress.XtraReports.UI.XRLabel>("label5");
            this.label14 = reportInitializer.GetControl<DevExpress.XtraReports.UI.XRLabel>("label14");
            this.label38 = reportInitializer.GetControl<DevExpress.XtraReports.UI.XRLabel>("label38");
            this.label2 = reportInitializer.GetControl<DevExpress.XtraReports.UI.XRLabel>("label2");
            this.label3 = reportInitializer.GetControl<DevExpress.XtraReports.UI.XRLabel>("label3");
            this.label18 = reportInitializer.GetControl<DevExpress.XtraReports.UI.XRLabel>("label18");
            this.label19 = reportInitializer.GetControl<DevExpress.XtraReports.UI.XRLabel>("label19");

            // Parameters
            this.CompanyName = reportInitializer.GetParameter("CompanyName");
            this.VoucherNo = reportInitializer.GetParameter("VoucherNo");
            this.LocId = reportInitializer.GetParameter("LocId");
            this.Debit = reportInitializer.GetParameter("Debit");
            this.AmountText = reportInitializer.GetParameter("AmountText");
            this.ChequeNo = reportInitializer.GetParameter("ChequeNo");
            this.RefNo = reportInitializer.GetParameter("RefNo");
            this.bId = reportInitializer.GetParameter("bId");
            this.insType = reportInitializer.GetParameter("insType");
            this.inNo = reportInitializer.GetParameter("inNo");
            this.DocDate = reportInitializer.GetParameter("DocDate");
            this.TenantId = reportInitializer.GetParameter("TenantId");
            this.DocNo = reportInitializer.GetParameter("DocNo");
            this.BookId = reportInitializer.GetParameter("BookId");

            // Data Sources
            this.jsonDataSource1 = reportInitializer.GetDataSource<DevExpress.DataAccess.Json.JsonDataSource>("jsonDataSource1");
        }
        private DevExpress.XtraReports.UI.TopMarginBand TopMargin;
        private DevExpress.XtraReports.UI.BottomMarginBand BottomMargin;
        private DevExpress.XtraReports.UI.DetailBand Detail;
        private DevExpress.XtraReports.UI.XRLabel label17;
        private DevExpress.XtraReports.UI.XRLabel label16;
        private DevExpress.XtraReports.UI.XRLabel label13;
        private DevExpress.XtraReports.UI.XRLabel label15;
        private DevExpress.XtraReports.UI.XRLabel label12;
        private DevExpress.XtraReports.UI.XRLabel label11;
        private DevExpress.XtraReports.UI.XRLabel label10;
        private DevExpress.XtraReports.UI.XRLabel label8;
        private DevExpress.XtraReports.UI.XRLabel label7;
        private DevExpress.XtraReports.UI.XRLabel label6;
        private DevExpress.XtraReports.UI.XRLabel label9;
        private DevExpress.XtraReports.UI.XRLabel label1;
        private DevExpress.XtraReports.UI.XRLabel label4;
        private DevExpress.XtraReports.UI.XRLabel label5;
        private DevExpress.XtraReports.UI.XRLabel label14;
        private DevExpress.XtraReports.UI.XRLabel label38;
        private DevExpress.XtraReports.UI.XRLabel label2;
        private DevExpress.XtraReports.UI.XRLabel label3;
        private DevExpress.DataAccess.Json.JsonDataSource jsonDataSource1;
        private DevExpress.XtraReports.Parameters.Parameter CompanyName;
        private DevExpress.XtraReports.Parameters.Parameter VoucherNo;
        private DevExpress.XtraReports.Parameters.Parameter LocId;
        private DevExpress.XtraReports.Parameters.Parameter Debit;
        private DevExpress.XtraReports.Parameters.Parameter AmountText;
        private DevExpress.XtraReports.Parameters.Parameter ChequeNo;
        private DevExpress.XtraReports.Parameters.Parameter RefNo;
        private DevExpress.XtraReports.Parameters.Parameter bId;
        private DevExpress.XtraReports.Parameters.Parameter insType;
        private DevExpress.XtraReports.Parameters.Parameter inNo;
        private DevExpress.XtraReports.Parameters.Parameter DocDate;
        private DevExpress.XtraReports.Parameters.Parameter TenantId;
        private DevExpress.XtraReports.UI.XRLabel label18;
        private DevExpress.XtraReports.Parameters.Parameter DocNo;
        private DevExpress.XtraReports.Parameters.Parameter BookId;
        private DevExpress.XtraReports.UI.XRLabel label19;
    }
}
