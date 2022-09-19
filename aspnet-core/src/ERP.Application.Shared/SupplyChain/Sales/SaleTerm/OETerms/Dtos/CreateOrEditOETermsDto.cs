using System;
using Abp.Application.Services.Dto;
using System.ComponentModel.DataAnnotations;

namespace ERP.SupplyChain.Sales.SaleTerm.OETerms.Dtos
{
    public class CreateOrEditOETermsDto : EntityDto<int?>
    {

        public int TermID { get; set; }

        [StringLength(OETermsConsts.MaxTermDescLength, MinimumLength = OETermsConsts.MinTermDescLength)]
        public string TermDesc { get; set; }

        public int TermDays { get; set; }

        public bool Active { get; set; }

        [StringLength(OETermsConsts.MaxAUDTUSERLength, MinimumLength = OETermsConsts.MinAUDTUSERLength)]
        public string AUDTUSER { get; set; }

        public DateTime? AudtDate { get; set; }

        [StringLength(OETermsConsts.MaxCreatedByLength, MinimumLength = OETermsConsts.MinCreatedByLength)]
        public string CreatedBy { get; set; }

        public DateTime? CreatedDate { get; set; }

    }
}