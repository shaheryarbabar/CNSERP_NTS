using Abp.Application.Services.Dto;

namespace ERP.SupplyChain.Sales.SaleTerm.OETerms.Dtos
{
    public class GetAllForLookupTableInput : PagedAndSortedResultRequestDto
    {
        public string Filter { get; set; }
    }
}