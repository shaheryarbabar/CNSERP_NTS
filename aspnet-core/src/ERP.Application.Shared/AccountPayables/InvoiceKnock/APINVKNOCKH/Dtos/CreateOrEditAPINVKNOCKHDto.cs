using System;
using Abp.Application.Services.Dto;
using System.ComponentModel.DataAnnotations;
using ERP.AccountPayables.InvoiceKnock.APINVKNOCKD.Dtos;
using System.Collections.Generic;

namespace ERP.AccountPayables.InvoiceKnock.APINVKNOCKH.Dtos
{
    public class CreateOrEditAPINVKNOCKHDto : EntityDto<int?>
    {

        [Required]
        public int DocNo { get; set; }

        public int? GLLOCID { get; set; }

        public DateTime? DocDate { get; set; }

        public DateTime? PostDate { get; set; }

        [StringLength(APINVKNOCKHConsts.MaxVendorCtrlAcLength, MinimumLength = APINVKNOCKHConsts.MinVendorCtrlAcLength)]
        public string VendorCtrlAc { get; set; }

        [StringLength(APINVKNOCKHConsts.MaxLiabilityCtrlAcLength, MinimumLength = APINVKNOCKHConsts.MinLiabilityCtrlAcLength)]
        public string LiabilityCtrlAc { get; set; }
        public string LiabilityCtrlAcDesc { get; set; }
        public string LocDesc { get; set; }
        public string VendorCtrlAcDesc { get; set; }
        public string VendorDesc { get; set; }

        public int? VendorID { get; set; }

        public double? TotalAmount { get; set; }

        public double? ClosingBalance { get; set; }

        [StringLength(APINVKNOCKHConsts.MaxPaymentOptionLength, MinimumLength = APINVKNOCKHConsts.MinPaymentOptionLength)]
        public string PaymentOption { get; set; }

        [StringLength(APINVKNOCKHConsts.MaxBankIDLength, MinimumLength = APINVKNOCKHConsts.MinBankIDLength)]
        public string BankID { get; set; }

        [StringLength(APINVKNOCKHConsts.MaxBAccountIDLength, MinimumLength = APINVKNOCKHConsts.MinBAccountIDLength)]
        public string BAccountID { get; set; }

        public short? ConfigID { get; set; }

        public int? InsType { get; set; }

        [StringLength(APINVKNOCKHConsts.MaxInsNoLength, MinimumLength = APINVKNOCKHConsts.MinInsNoLength)]
        public string InsNo { get; set; }

        [StringLength(APINVKNOCKHConsts.MaxCurIDLength, MinimumLength = APINVKNOCKHConsts.MinCurIDLength)]
        public string CurID { get; set; }

        public double? CurRate { get; set; }

        [StringLength(APINVKNOCKHConsts.MaxNarrationLength, MinimumLength = APINVKNOCKHConsts.MinNarrationLength)]
        public string Narration { get; set; }

        public bool Posted { get; set; }

        [StringLength(APINVKNOCKHConsts.MaxPostedByLength, MinimumLength = APINVKNOCKHConsts.MinPostedByLength)]
        public string PostedBy { get; set; }

        public DateTime? PostedDate { get; set; }

        public int? LinkDetID { get; set; }

        [StringLength(APINVKNOCKHConsts.MaxCreatedByLength, MinimumLength = APINVKNOCKHConsts.MinCreatedByLength)]
        public string CreatedBy { get; set; }

        public DateTime? CreatedDate { get; set; }

        [StringLength(APINVKNOCKHConsts.MaxAudtUserLength, MinimumLength = APINVKNOCKHConsts.MinAudtUserLength)]
        public string AudtUser { get; set; }

        public DateTime? AudtDate { get; set; }
        public ICollection<APINVKNOCKDDto> InvoiceKnockOffDetailDto { get; set; }

    }
}