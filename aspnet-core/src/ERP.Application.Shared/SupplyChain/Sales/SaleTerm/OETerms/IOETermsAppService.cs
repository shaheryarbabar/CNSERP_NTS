using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using ERP.SupplyChain.Sales.SaleTerm.OETerms.Dtos;
using ERP.Dto;

namespace ERP.SupplyChain.Sales.SaleTerm.OETerms
{
    public interface IOETermsAppService : IApplicationService
    {
        Task<PagedResultDto<GetOETermsForViewDto>> GetAll(GetAllOETermsInput input);

        Task<GetOETermsForViewDto> GetOETermsForView(int id);

        Task<GetOETermsForEditOutput> GetOETermsForEdit(EntityDto input);

        Task CreateOrEdit(CreateOrEditOETermsDto input);

        Task Delete(EntityDto input);

    }
}