using Abp.Application.Services.Dto;

namespace ERP.AccountPayables.InvoiceKnock.APINVKNOCKH.Dtos
{
    public class GetAllForLookupTableInput : PagedAndSortedResultRequestDto
    {
        public string Filter { get; set; }
    }
}