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
    
    public partial class TrialBalanceOpening1 : DevExpress.XtraReports.UI.XtraReport {
        private void InitializeComponent() {
            DevExpress.XtraReports.ReportInitializer reportInitializer = new DevExpress.XtraReports.ReportInitializer(this, "ERP.Web.DXServices.Reports.Finance.TrialBalanceOpening1.repx");

            // Controls
            this.TopMargin = reportInitializer.GetControl<DevExpress.XtraReports.UI.TopMarginBand>("TopMargin");
            this.BottomMargin = reportInitializer.GetControl<DevExpress.XtraReports.UI.BottomMarginBand>("BottomMargin");
            this.Detail = reportInitializer.GetControl<DevExpress.XtraReports.UI.DetailBand>("Detail");
            this.GroupHeader1 = reportInitializer.GetControl<DevExpress.XtraReports.UI.GroupHeaderBand>("GroupHeader1");
            this.PageFooter = reportInitializer.GetControl<DevExpress.XtraReports.UI.PageFooterBand>("PageFooter");
            this.ReportFooter = reportInitializer.GetControl<DevExpress.XtraReports.UI.ReportFooterBand>("ReportFooter");
            this.label12 = reportInitializer.GetControl<DevExpress.XtraReports.UI.XRLabel>("label12");
            this.label7 = reportInitializer.GetControl<DevExpress.XtraReports.UI.XRLabel>("label7");
            this.label6 = reportInitializer.GetControl<DevExpress.XtraReports.UI.XRLabel>("label6");
            this.label65 = reportInitializer.GetControl<DevExpress.XtraReports.UI.XRLabel>("label65");
            this.label5 = reportInitializer.GetControl<DevExpress.XtraReports.UI.XRLabel>("label5");
            this.label8 = reportInitializer.GetControl<DevExpress.XtraReports.UI.XRLabel>("label8");
            this.pageInfo3 = reportInitializer.GetControl<DevExpress.XtraReports.UI.XRPageInfo>("pageInfo3");
            this.label27 = reportInitializer.GetControl<DevExpress.XtraReports.UI.XRLabel>("label27");
            this.pageInfo4 = reportInitializer.GetControl<DevExpress.XtraReports.UI.XRPageInfo>("pageInfo4");
            this.label19 = reportInitializer.GetControl<DevExpress.XtraReports.UI.XRLabel>("label19");
            this.label20 = reportInitializer.GetControl<DevExpress.XtraReports.UI.XRLabel>("label20");
            this.label35 = reportInitializer.GetControl<DevExpress.XtraReports.UI.XRLabel>("label35");
            this.label36 = reportInitializer.GetControl<DevExpress.XtraReports.UI.XRLabel>("label36");
            this.label37 = reportInitializer.GetControl<DevExpress.XtraReports.UI.XRLabel>("label37");
            this.label38 = reportInitializer.GetControl<DevExpress.XtraReports.UI.XRLabel>("label38");
            this.label68 = reportInitializer.GetControl<DevExpress.XtraReports.UI.XRLabel>("label68");
            this.label69 = reportInitializer.GetControl<DevExpress.XtraReports.UI.XRLabel>("label69");
            this.label14 = reportInitializer.GetControl<DevExpress.XtraReports.UI.XRLabel>("label14");
            this.label9 = reportInitializer.GetControl<DevExpress.XtraReports.UI.XRLabel>("label9");
            this.label66 = reportInitializer.GetControl<DevExpress.XtraReports.UI.XRLabel>("label66");
            this.label29 = reportInitializer.GetControl<DevExpress.XtraReports.UI.XRLabel>("label29");
            this.pictureBox1 = reportInitializer.GetControl<DevExpress.XtraReports.UI.XRPictureBox>("pictureBox1");
            this.pageInfo2 = reportInitializer.GetControl<DevExpress.XtraReports.UI.XRPageInfo>("pageInfo2");
            this.pageInfo1 = reportInitializer.GetControl<DevExpress.XtraReports.UI.XRPageInfo>("pageInfo1");
            this.line2 = reportInitializer.GetControl<DevExpress.XtraReports.UI.XRLine>("line2");
            this.label34 = reportInitializer.GetControl<DevExpress.XtraReports.UI.XRLabel>("label34");
            this.label23 = reportInitializer.GetControl<DevExpress.XtraReports.UI.XRLabel>("label23");
            this.label22 = reportInitializer.GetControl<DevExpress.XtraReports.UI.XRLabel>("label22");
            this.label33 = reportInitializer.GetControl<DevExpress.XtraReports.UI.XRLabel>("label33");
            this.label32 = reportInitializer.GetControl<DevExpress.XtraReports.UI.XRLabel>("label32");
            this.label31 = reportInitializer.GetControl<DevExpress.XtraReports.UI.XRLabel>("label31");
            this.label30 = reportInitializer.GetControl<DevExpress.XtraReports.UI.XRLabel>("label30");
            this.label2 = reportInitializer.GetControl<DevExpress.XtraReports.UI.XRLabel>("label2");
            this.label1 = reportInitializer.GetControl<DevExpress.XtraReports.UI.XRLabel>("label1");
            this.label10 = reportInitializer.GetControl<DevExpress.XtraReports.UI.XRLabel>("label10");
            this.label11 = reportInitializer.GetControl<DevExpress.XtraReports.UI.XRLabel>("label11");
            this.label60 = reportInitializer.GetControl<DevExpress.XtraReports.UI.XRLabel>("label60");
            this.label61 = reportInitializer.GetControl<DevExpress.XtraReports.UI.XRLabel>("label61");
            this.label62 = reportInitializer.GetControl<DevExpress.XtraReports.UI.XRLabel>("label62");
            this.label63 = reportInitializer.GetControl<DevExpress.XtraReports.UI.XRLabel>("label63");
            this.label64 = reportInitializer.GetControl<DevExpress.XtraReports.UI.XRLabel>("label64");
            this.label4 = reportInitializer.GetControl<DevExpress.XtraReports.UI.XRLabel>("label4");
            this.line1 = reportInitializer.GetControl<DevExpress.XtraReports.UI.XRLine>("line1");
            this.label3 = reportInitializer.GetControl<DevExpress.XtraReports.UI.XRLabel>("label3");

            // Parameters
            this.TenantId = reportInitializer.GetParameter("TenantId");
            this.FromDate = reportInitializer.GetParameter("FromDate");
            this.ToDate = reportInitializer.GetParameter("ToDate");
            this.FromAcc = reportInitializer.GetParameter("FromAcc");
            this.ToAcc = reportInitializer.GetParameter("ToAcc");
            this.Status = reportInitializer.GetParameter("Status");
            this.CompanyName = reportInitializer.GetParameter("CompanyName");
            this.LocId = reportInitializer.GetParameter("LocId");
            this.Address = reportInitializer.GetParameter("Address");
            this.Address2 = reportInitializer.GetParameter("Address2");
            this.Phone = reportInitializer.GetParameter("Phone");
            this.cur = reportInitializer.GetParameter("cur");

            // Data Sources
            this.jsonDataSource1 = reportInitializer.GetDataSource<DevExpress.DataAccess.Json.JsonDataSource>("jsonDataSource1");
        }
        private DevExpress.XtraReports.UI.TopMarginBand TopMargin;
        private DevExpress.XtraReports.UI.BottomMarginBand BottomMargin;
        private DevExpress.XtraReports.UI.DetailBand Detail;
        private DevExpress.XtraReports.UI.GroupHeaderBand GroupHeader1;
        private DevExpress.XtraReports.UI.PageFooterBand PageFooter;
        private DevExpress.XtraReports.UI.ReportFooterBand ReportFooter;
        private DevExpress.XtraReports.UI.XRLabel label12;
        private DevExpress.XtraReports.UI.XRLabel label7;
        private DevExpress.XtraReports.UI.XRLabel label6;
        private DevExpress.XtraReports.UI.XRLabel label65;
        private DevExpress.XtraReports.UI.XRLabel label5;
        private DevExpress.XtraReports.UI.XRLabel label8;
        private DevExpress.XtraReports.UI.XRPageInfo pageInfo3;
        private DevExpress.XtraReports.UI.XRLabel label27;
        private DevExpress.XtraReports.UI.XRPageInfo pageInfo4;
        private DevExpress.XtraReports.UI.XRLabel label19;
        private DevExpress.XtraReports.UI.XRLabel label20;
        private DevExpress.XtraReports.UI.XRLabel label35;
        private DevExpress.XtraReports.UI.XRLabel label36;
        private DevExpress.XtraReports.UI.XRLabel label37;
        private DevExpress.XtraReports.UI.XRLabel label38;
        private DevExpress.XtraReports.UI.XRLabel label68;
        private DevExpress.XtraReports.UI.XRLabel label69;
        private DevExpress.XtraReports.UI.XRLabel label14;
        private DevExpress.XtraReports.UI.XRLabel label9;
        private DevExpress.XtraReports.UI.XRLabel label66;
        private DevExpress.XtraReports.UI.XRLabel label29;
        private DevExpress.XtraReports.UI.XRPictureBox pictureBox1;
        private DevExpress.XtraReports.UI.XRPageInfo pageInfo2;
        private DevExpress.XtraReports.UI.XRPageInfo pageInfo1;
        private DevExpress.XtraReports.UI.XRLine line2;
        private DevExpress.XtraReports.UI.XRLabel label34;
        private DevExpress.XtraReports.UI.XRLabel label23;
        private DevExpress.XtraReports.UI.XRLabel label22;
        private DevExpress.XtraReports.UI.XRLabel label33;
        private DevExpress.XtraReports.UI.XRLabel label32;
        private DevExpress.XtraReports.UI.XRLabel label31;
        private DevExpress.XtraReports.UI.XRLabel label30;
        private DevExpress.XtraReports.UI.XRLabel label2;
        private DevExpress.XtraReports.UI.XRLabel label1;
        private DevExpress.XtraReports.UI.XRLabel label10;
        private DevExpress.XtraReports.UI.XRLabel label11;
        private DevExpress.XtraReports.UI.XRLabel label60;
        private DevExpress.XtraReports.UI.XRLabel label61;
        private DevExpress.XtraReports.UI.XRLabel label62;
        private DevExpress.XtraReports.UI.XRLabel label63;
        private DevExpress.XtraReports.UI.XRLabel label64;
        private DevExpress.XtraReports.UI.XRLabel label4;
        private DevExpress.XtraReports.UI.XRLine line1;
        private DevExpress.XtraReports.UI.XRLabel label3;
        private DevExpress.DataAccess.Json.JsonDataSource jsonDataSource1;
        private DevExpress.XtraReports.Parameters.Parameter TenantId;
        private DevExpress.XtraReports.Parameters.Parameter FromDate;
        private DevExpress.XtraReports.Parameters.Parameter ToDate;
        private DevExpress.XtraReports.Parameters.Parameter FromAcc;
        private DevExpress.XtraReports.Parameters.Parameter ToAcc;
        private DevExpress.XtraReports.Parameters.Parameter Status;
        private DevExpress.XtraReports.Parameters.Parameter CompanyName;
        private DevExpress.XtraReports.Parameters.Parameter LocId;
        private DevExpress.XtraReports.Parameters.Parameter Address;
        private DevExpress.XtraReports.Parameters.Parameter Address2;
        private DevExpress.XtraReports.Parameters.Parameter Phone;
        private DevExpress.XtraReports.Parameters.Parameter cur;
    }
}