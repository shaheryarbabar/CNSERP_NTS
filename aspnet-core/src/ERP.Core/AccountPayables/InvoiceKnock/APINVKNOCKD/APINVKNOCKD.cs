using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;
using Abp.Domain.Entities;

namespace ERP.AccountPayables.InvoiceKnock.APINVKNOCKD
{
    [Table("APINVKNOCKD")]
    public class APINVKNOCKD : Entity, IMustHaveTenant
    {
        public int TenantId { get; set; }

        public virtual int? DetID { get; set; }

        public virtual int? DocNo { get; set; }

        [Required]
        public virtual int GRNNo { get; set; }

        [StringLength(APINVKNOCKDConsts.MaxGRNDateLength, MinimumLength = APINVKNOCKDConsts.MinGRNDateLength)]
        public virtual string GRNDate { get; set; }

        [Required]
        public virtual int PONo { get; set; }

        public virtual double? Amount { get; set; }

        public virtual double? GRNAdjusted { get; set; }
        public virtual double? AdvAdjusted { get; set; }

        //public virtual double? Pending { get; set; }

        public double? AdvPending { get; set; }
        public double? GRNPending { get; set; }
        public virtual double? AdvAdjust { get; set; }

        public virtual double? GRNAdjust { get; set; }
        public virtual double? PoAdvAmt { get; set; }

    }
}