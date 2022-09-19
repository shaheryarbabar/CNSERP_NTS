using System;
using Abp.Application.Services.Dto;

namespace ERP.AccountPayables.InvoiceKnock.APINVKNOCKD.Dtos
{
    public class APINVKNOCKDDto : EntityDto
    {
        public int? DetID { get; set; }

        public int? DocNo { get; set; }

        public int GRNNo { get; set; }

        public string GRNDate { get; set; }

        public int PONo { get; set; }

        public double? Amount { get; set; }

        public double? GRNAdjusted { get; set; }
        //public double? AdvAdjusted { get; set; }
        

        //public double? Pending { get; set; }

        public double? AdvAdjust { get; set; }

        public double? GRNAdjust { get; set; }
        public double? PoAdvAmt { get; set; }
        public double? AdvAdjusted { get; set; }
        public double? AdvPending { get; set; }
        public double? GRNPending { get; set; }
        public double? AdvPaid { get; set; }




    }
}