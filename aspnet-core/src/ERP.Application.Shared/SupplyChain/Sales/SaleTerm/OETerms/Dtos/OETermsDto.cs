using System;
using Abp.Application.Services.Dto;

namespace ERP.SupplyChain.Sales.SaleTerm.OETerms.Dtos
{
    public class OETermsDto : EntityDto
    {
        public int? TermID { get; set; }

        public string TermDesc { get; set; }

        public int? TermDays { get; set; }

        public bool Active { get; set; }

        public string AUDTUSER { get; set; }

        public DateTime? AudtDate { get; set; }

        public string CreatedBy { get; set; }

        public DateTime? CreatedDate { get; set; }

    }
}