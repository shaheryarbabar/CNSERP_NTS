using System;
using Abp.Application.Services.Dto;

namespace ERP.AccountPayables.InvoiceKnock.APINVKNOCKH.Dtos
{
    public class APINVKNOCKHDto : EntityDto
    {
        public int DocNo { get; set; }

        public int? GLLOCID { get; set; }

        public DateTime? DocDate { get; set; }

        public DateTime? PostDate { get; set; }

        public string VendorCtrlAc { get; set; }

        public string LiabilityCtrlAc { get; set; }

        public int? VendorID { get; set; }

        public double? TotalAmount { get; set; }

        public double? ClosingBalance { get; set; }

        public string PaymentOption { get; set; }

        public string BankID { get; set; }

        public string BAccountID { get; set; }

        public short? ConfigID { get; set; }

        public int? InsType { get; set; }

        public string InsNo { get; set; }

        public string CurID { get; set; }

        public double? CurRate { get; set; }

        public string Narration { get; set; }

        public bool Posted { get; set; }

        public string PostedBy { get; set; }

        public DateTime? PostedDate { get; set; }

        public int? LinkDetID { get; set; }

        public string CreatedBy { get; set; }

        public DateTime? CreatedDate { get; set; }

        public string AudtUser { get; set; }

        public DateTime? AudtDate { get; set; }

    }
}