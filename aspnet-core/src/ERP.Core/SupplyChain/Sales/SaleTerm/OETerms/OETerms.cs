using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;
using Abp.Domain.Entities;

namespace ERP.SupplyChain.Sales.SaleTerm.OETerms
{
    [Table("OETerms")]
    public class OETerms : Entity, IMustHaveTenant
    {
        public int TenantId { get; set; }

        public virtual int TermID { get; set; }

        [StringLength(OETermsConsts.MaxTermDescLength, MinimumLength = OETermsConsts.MinTermDescLength)]
        public virtual string TermDesc { get; set; }

        public virtual int TermDays { get; set; }

        public virtual bool Active { get; set; }

        [StringLength(OETermsConsts.MaxAUDTUSERLength, MinimumLength = OETermsConsts.MinAUDTUSERLength)]
        public virtual string AUDTUSER { get; set; }

        public virtual DateTime? AudtDate { get; set; }

        [StringLength(OETermsConsts.MaxCreatedByLength, MinimumLength = OETermsConsts.MinCreatedByLength)]
        public virtual string CreatedBy { get; set; }

        public virtual DateTime? CreatedDate { get; set; }

    }
}