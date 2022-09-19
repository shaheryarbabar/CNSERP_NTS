using System;
using System.Drawing;
using System.IO;
using DevExpress.XtraPrinting.Drawing;
using DevExpress.XtraReports.UI;
using ERP.Web.DXServices.Common;

namespace ERP.Web.DXServices.Reports.Finance
{
    public partial class CashReceiptNew
    {
        double totalUnits = 0;
        private int _tenantId;
        private bool imageLogic;
        public CashReceiptNew()
        {
            InitializeComponent();
            imageLogic = false;
        }

        private void label39_SummaryGetResult(object sender, SummaryGetResultEventArgs e)
        {
            //totalUnits = 0;
        }

        private void label39_SummaryReset(object sender, EventArgs e)
        {
            // totalUnits += Convert.ToDouble(GetCurrentColumnValue("Debit"));
        }

        private void label39_SummaryRowChanged(object sender, EventArgs e)
        {

        }

        private void label39_SummaryCalculated(object sender, TextFormatEventArgs e)
        {

        }

        private void pictureBox1_BeforePrint(object sender, System.Drawing.Printing.PrintEventArgs e)
        {
            if (imageLogic == false)
            {
                byte[] bytes = ReportUtils.GetImage(_tenantId);
                MemoryStream mem = new MemoryStream(bytes);
                Bitmap bmp = new Bitmap(mem);
                Image img = bmp;
                XRPictureBox pictureBox = (XRPictureBox)sender;
                pictureBox.ImageSource = new ImageSource(img);
                imageLogic = true;
            }
        }

        private void CashReceipt_BeforePrint(object sender, System.Drawing.Printing.PrintEventArgs e)
        {
            DevExpress.XtraReports.Parameters.Parameter param =
                ((XtraReport)sender).
                 Parameters["TenantId"];
            _tenantId = Convert.ToInt32(param.Value);
        }

        private void GroupHeader2_BeforePrint(object sender, System.Drawing.Printing.PrintEventArgs e)
        {

        }

        private void label1_BeforePrint(object sender, System.Drawing.Printing.PrintEventArgs e)
        {

            if ((sender as XRLabel).Value.ToString().ToLower().StartsWith('b'))
            {
                //label47.Visible = true;
                //label46.Visible = true;
                label12.Visible = true;
                label3.Visible = true;
                label37.Visible = true;
                label38.Visible = true;
                //label29.Visible = true;
                //label30.Visible = true;

            }
            else
            {
                label12.Visible = false;
                label3.Visible = false;
                label37.Visible = false;
                label38.Visible = false;
                //label29.Visible = false;
                //label30.Visible = false;
            }

            if ((sender as XRLabel).Value.ToString().ToLower().StartsWith('j'))
            {
                label47.Visible = false;
                label46.Visible = false;
            }
            else
            {
                label47.Visible = true;
                label46.Visible = true;
            }

            if ((sender as XRLabel).Value.ToString().ToLower() == "cash payment voucher"
            ||
            (sender as XRLabel).Value.ToString().ToLower() == "bank payment voucher"
            )
            {
                panel1.Visible = true;
            }
            else
            {
                panel1.Visible = false;
            }

            if ((sender as XRLabel).Value.ToString().ToLower() == "cash receipt voucher"
            ||
            (sender as XRLabel).Value.ToString().ToLower() == "bank receipt voucher"
            )
            {
                subreport1.Visible = true;
            }
            else
            {
                subreport1.Visible = false;
            }
        }

        private void panel1_BeforePrint(object sender, System.Drawing.Printing.PrintEventArgs e)
        {

        }

        private void subreport1_BeforePrint(object sender, System.Drawing.Printing.PrintEventArgs e)
        {
            //subreport1.ReportSource.DataSource = this.DataSource;
        }

        private void label39_BeforePrint(object sender, System.Drawing.Printing.PrintEventArgs e)
        {

        }

        private void label39_SummaryCalculated_1(object sender, TextFormatEventArgs e)
        {
            var data = (dynamic)GetCurrentRow();

            if (e.Value != null)
            {
                if (e.Value.ToString() != "")
                {
                    var splitNum = e.Value.ToString().Split(".");
                    if (splitNum.Length > 1)
                    {
                        e.Text = ReportUtils.NumberToWords(Convert.ToInt32(splitNum[0]));
                        var decimalPart = Math.Round(Convert.ToDecimal(splitNum[1]), 2);
                        //e.Text = "Rupees " + e.Text;
                        e.Text = data.CurNarration + " " + e.Text;
                        e.Text += " " + ReportUtils.NumberToWords(Convert.ToInt32(decimalPart)) + " " + data.CurUnit + " only";
                        //e.Text += " " + ReportUtils.NumberToWords(Convert.ToInt32(decimalPart)) + " paisas only";
                    }
                    else
                    {
                        e.Text = ReportUtils.NumberToWords(Convert.ToInt32(splitNum[0]));
                        e.Text = data.CurNarration + " " + e.Text + " and zero " + data.CurUnit + " only";
                    }
                    e.Text = e.Text.ToUpper();
                }
            }
        }

        private void subreport1_BeforePrint_1(object sender, System.Drawing.Printing.PrintEventArgs e)
        {
            //subreport1.ReportSource.DataSource = this.DataSource;
        }

        private void label12_BeforePrint(object sender, System.Drawing.Printing.PrintEventArgs e)
        {
            var value = GetCurrentColumnValue("ChequeType");
            if (value != null)
            {
                if (!string.IsNullOrEmpty(value.ToString()))
                {
                    if (Convert.ToInt32(value) == 1)
                    {
                        label12.Text = "Cheque-Cash";
                    }
                    else if (Convert.ToInt32(value) == 2)
                    {
                        label12.Text = "Cheque-Cross";
                    }
                    else if (Convert.ToInt32(value) == 3)
                    {
                        label12.Text = "PO";
                    }
                    else if (Convert.ToInt32(value) == 4)
                    {
                        label12.Text = "Online";
                    }
                    else if (Convert.ToInt32(value) == 5)
                    {
                        label12.Text = "Other";
                    }
                }
            }
        }

        private void label22_BeforePrint(object sender, System.Drawing.Printing.PrintEventArgs e)
        {

        }

        private void label30_BeforePrint(object sender, System.Drawing.Printing.PrintEventArgs e)
        {
            if ((sender as XRLabel).Value.ToString() != "0")
            {
                label31.Visible = true;
                label30.Visible = true;
            }
        }

        //private void subreport2_BeforePrint(object sender, System.Drawing.Printing.PrintEventArgs e)
        //{
        //    subreport1.ReportSource.DataSource = this.DataSource;
        //}

        //private void label39_SummaryReset(object sender, EventArgs e)
        //{
        //    totalUnits = 0;
        //}

        //private void label39_SummaryRowChanged(object sender, EventArgs e)
        //{
        //    totalUnits += Convert.ToDouble(GetCurrentColumnValue("Debit"));
        //}

        //private void label39_SummaryGetResult(object sender, SummaryGetResultEventArgs e)
        //{
        //    e.Result = ReportUtils.NumberToWords((int)totalUnits);
        //    e.Handled = true;
        //}
    }
}
