using Abp.Application.Services.Dto;
using System;

namespace ERP.SupplyChain.Sales.SaleTerm.OETerms.Dtos
{
    public class GetAllOETermsInput : PagedAndSortedResultRequestDto
    {
        public string Filter { get; set; }

        public int? MaxTermIDFilter { get; set; }
        public int? MinTermIDFilter { get; set; }

        public string TermDescFilter { get; set; }

        public int? MaxTermDaysFilter { get; set; }
        public int? MinTermDaysFilter { get; set; }

        public int? ActiveFilter { get; set; }

        public string AUDTUSERFilter { get; set; }

        public DateTime? MaxAudtDateFilter { get; set; }
        public DateTime? MinAudtDateFilter { get; set; }

        public string CreatedByFilter { get; set; }

        public DateTime? MaxCreatedDateFilter { get; set; }
        public DateTime? MinCreatedDateFilter { get; set; }

    }
}