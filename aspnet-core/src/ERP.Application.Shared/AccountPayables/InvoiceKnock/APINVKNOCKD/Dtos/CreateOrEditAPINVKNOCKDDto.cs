using System;
using Abp.Application.Services.Dto;
using System.ComponentModel.DataAnnotations;

namespace ERP.AccountPayables.InvoiceKnock.APINVKNOCKD.Dtos
{
    public class CreateOrEditAPINVKNOCKDDto : EntityDto<int?>
    {

        public int? DetID { get; set; }

        public int? DocNo { get; set; }

        [Required]
        public int GRNNo { get; set; }

        [StringLength(APINVKNOCKDConsts.MaxGRNDateLength, MinimumLength = APINVKNOCKDConsts.MinGRNDateLength)]
        public string GRNDate { get; set; }

        [Required]
        public int PONo { get; set; }

        public double? Amount { get; set; }

        public double? AlreadyPaid { get; set; }

        public double? AdvPending { get; set; }
        public double?  GRNPending { get; set; }

        public double? AdvAdjust { get; set; }

        public double? GRNAdjust { get; set; }
        public double? PoAdvAmt { get; set; }

    }
}