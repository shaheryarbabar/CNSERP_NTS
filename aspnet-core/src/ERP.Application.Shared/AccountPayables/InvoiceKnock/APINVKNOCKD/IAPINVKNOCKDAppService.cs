using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using ERP.AccountPayables.InvoiceKnock.APINVKNOCKD.Dtos;
using ERP.Dto;

namespace ERP.AccountPayables.InvoiceKnock.APINVKNOCKD
{
    public interface IAPINVKNOCKDAppService : IApplicationService
    {
        Task<PagedResultDto<GetAPINVKNOCKDForViewDto>> GetAll(GetAllAPINVKNOCKDInput input);

        Task<GetAPINVKNOCKDForViewDto> GetAPINVKNOCKDForView(int id);

        Task<GetAPINVKNOCKDForEditOutput> GetAPINVKNOCKDForEdit(EntityDto input);

        Task CreateOrEdit(CreateOrEditAPINVKNOCKDDto input);

        Task Delete(EntityDto input);

    }
}