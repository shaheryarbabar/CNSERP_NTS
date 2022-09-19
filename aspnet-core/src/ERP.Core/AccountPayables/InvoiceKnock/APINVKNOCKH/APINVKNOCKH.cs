using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;
using Abp.Domain.Entities;

namespace ERP.AccountPayables.InvoiceKnock.APINVKNOCKH
{
    [Table("APINVKNOCKH")]
    public class APINVKNOCKH : Entity, IMustHaveTenant
    {
        public int TenantId { get; set; }

        [Required]
        public virtual int DocNo { get; set; }

        public virtual int? GLLOCID { get; set; }

        public virtual DateTime? DocDate { get; set; }

        public virtual DateTime? PostDate { get; set; }

        [StringLength(APINVKNOCKHConsts.MaxVendorCtrlAcLength, MinimumLength = APINVKNOCKHConsts.MinVendorCtrlAcLength)]
        public virtual string VendorCtrlAc { get; set; }

        [StringLength(APINVKNOCKHConsts.MaxLiabilityCtrlAcLength, MinimumLength = APINVKNOCKHConsts.MinLiabilityCtrlAcLength)]
        public virtual string LiabilityCtrlAc { get; set; }

        public virtual int? VendorID { get; set; }

        public virtual double? TotalAmount { get; set; }

        public virtual double? ClosingBalance { get; set; }

        [StringLength(APINVKNOCKHConsts.MaxPaymentOptionLength, MinimumLength = APINVKNOCKHConsts.MinPaymentOptionLength)]
        public virtual string PaymentOption { get; set; }

        [StringLength(APINVKNOCKHConsts.MaxBankIDLength, MinimumLength = APINVKNOCKHConsts.MinBankIDLength)]
        public virtual string BankID { get; set; }

        [StringLength(APINVKNOCKHConsts.MaxBAccountIDLength, MinimumLength = APINVKNOCKHConsts.MinBAccountIDLength)]
        public virtual string BAccountID { get; set; }

        public virtual short? ConfigID { get; set; }

        public virtual int? InsType { get; set; }

        [StringLength(APINVKNOCKHConsts.MaxInsNoLength, MinimumLength = APINVKNOCKHConsts.MinInsNoLength)]
        public virtual string InsNo { get; set; }

        [StringLength(APINVKNOCKHConsts.MaxCurIDLength, MinimumLength = APINVKNOCKHConsts.MinCurIDLength)]
        public virtual string CurID { get; set; }

        public virtual double? CurRate { get; set; }

        [StringLength(APINVKNOCKHConsts.MaxNarrationLength, MinimumLength = APINVKNOCKHConsts.MinNarrationLength)]
        public virtual string Narration { get; set; }

        public virtual bool Posted { get; set; }

        [StringLength(APINVKNOCKHConsts.MaxPostedByLength, MinimumLength = APINVKNOCKHConsts.MinPostedByLength)]
        public virtual string PostedBy { get; set; }

        public virtual DateTime? PostedDate { get; set; }

        public virtual int? LinkDetID { get; set; }

        [StringLength(APINVKNOCKHConsts.MaxCreatedByLength, MinimumLength = APINVKNOCKHConsts.MinCreatedByLength)]
        public virtual string CreatedBy { get; set; }

        public virtual DateTime? CreatedDate { get; set; }

        [StringLength(APINVKNOCKHConsts.MaxAudtUserLength, MinimumLength = APINVKNOCKHConsts.MinAudtUserLength)]
        public virtual string AudtUser { get; set; }

        public virtual DateTime? AudtDate { get; set; }

    }
}