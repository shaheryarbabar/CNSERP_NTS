using Abp.Application.Services.Dto;

namespace ERP.AccountPayables.InvoiceKnock.APINVKNOCKD.Dtos
{
    public class GetAllForLookupTableInput : PagedAndSortedResultRequestDto
    {
        public string Filter { get; set; }
    }
}