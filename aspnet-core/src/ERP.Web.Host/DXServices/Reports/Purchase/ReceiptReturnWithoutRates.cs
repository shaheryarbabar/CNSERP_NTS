using System;
using DevExpress.XtraReports.UI;
using DevExpress.XtraPrinting.Drawing;
using ERP.Web.DXServices.Common;
using System.Drawing;
using System.IO;

namespace ERP.Web.DXServices.Reports.Purchase
{
    public partial class ReceiptReturnWithoutRates
    {
        private int _tenantId;
        public string DecimalPoints = "";
        public ReceiptReturnWithoutRates()
        {
            InitializeComponent();
        }
        private void pictureBox1_BeforePrint(object sender, System.Drawing.Printing.PrintEventArgs e)
        {
            byte[] bytes = ReportUtils.GetImage(_tenantId);
            MemoryStream mem = new MemoryStream(bytes);
            Bitmap bmp = new Bitmap(mem);
            Image img = bmp;
            XRPictureBox pictureBox = (XRPictureBox)sender;
            pictureBox.ImageSource = new ImageSource(img);
        }

        private void InwardGatePass_BeforePrint(object sender, System.Drawing.Printing.PrintEventArgs e)
        {
            DevExpress.XtraReports.Parameters.Parameter param =
          ((XtraReport)sender).
           Parameters["TenantId"];
            _tenantId = Convert.ToInt32(param.Value);
            DecimalPoints = ((XtraReport)sender).Parameters["InventoryPoint"].Value.ToString();

            this.label8.TextFormatString = "{0:N" + DecimalPoints + "}";
            this.label24.TextFormatString = "{0:N" + DecimalPoints + "}";

        }
    }
}
