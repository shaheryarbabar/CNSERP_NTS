using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using ERP.AccountPayables.InvoiceKnock.APINVKNOCKH.Dtos;
using ERP.Dto;

namespace ERP.AccountPayables.InvoiceKnock.APINVKNOCKH
{
    public interface IAPINVKNOCKHAppService : IApplicationService
    {
        Task<PagedResultDto<GetAPINVKNOCKHForViewDto>> GetAll(GetAllAPINVKNOCKHInput input);

        Task<GetAPINVKNOCKHForViewDto> GetAPINVKNOCKHForView(int id);

        Task<GetAPINVKNOCKHForEditOutput> GetAPINVKNOCKHForEdit(EntityDto input);

        Task CreateOrEdit(CreateOrEditAPINVKNOCKHDto input);

        Task Delete(EntityDto input);

    }
}