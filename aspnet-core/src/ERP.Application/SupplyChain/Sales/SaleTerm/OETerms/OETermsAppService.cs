using System;
using System.Linq;
using System.Linq.Dynamic.Core;
using Abp.Linq.Extensions;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using ERP.SupplyChain.Sales.SaleTerm.OETerms.Dtos;
using ERP.Dto;
using Abp.Application.Services.Dto;
using ERP.Authorization;
using Abp.Extensions;
using Abp.Authorization;
using Microsoft.EntityFrameworkCore;
using Abp.UI;
using ERP.Storage;

namespace ERP.SupplyChain.Sales.SaleTerm.OETerms
{
    [AbpAuthorize(AppPermissions.Sales_OETerms)]
    public class OETermsAppService : ERPAppServiceBase, IOETermsAppService
    {
        private readonly IRepository<OETerms> _oeTermsRepository;

        public OETermsAppService(IRepository<OETerms> oeTermsRepository)
        {
            _oeTermsRepository = oeTermsRepository;

        }

        public async Task<PagedResultDto<GetOETermsForViewDto>> GetAll(GetAllOETermsInput input)
        {

            var filteredOETerms = _oeTermsRepository.GetAll()
                        .WhereIf(!string.IsNullOrWhiteSpace(input.Filter), e => false || e.TermDesc.Contains(input.Filter) || e.AUDTUSER.Contains(input.Filter) || e.CreatedBy.Contains(input.Filter))
                        .WhereIf(input.MinTermIDFilter != null, e => e.TermID >= input.MinTermIDFilter)
                        .WhereIf(input.MaxTermIDFilter != null, e => e.TermID <= input.MaxTermIDFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.TermDescFilter), e => e.TermDesc == input.TermDescFilter)
                        .WhereIf(input.MinTermDaysFilter != null, e => e.TermDays >= input.MinTermDaysFilter)
                        .WhereIf(input.MaxTermDaysFilter != null, e => e.TermDays <= input.MaxTermDaysFilter)
                        .WhereIf(input.ActiveFilter.HasValue && input.ActiveFilter > -1, e => (input.ActiveFilter == 1 && e.Active) || (input.ActiveFilter == 0 && !e.Active))
                        .WhereIf(!string.IsNullOrWhiteSpace(input.AUDTUSERFilter), e => e.AUDTUSER == input.AUDTUSERFilter)
                        .WhereIf(input.MinAudtDateFilter != null, e => e.AudtDate >= input.MinAudtDateFilter)
                        .WhereIf(input.MaxAudtDateFilter != null, e => e.AudtDate <= input.MaxAudtDateFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.CreatedByFilter), e => e.CreatedBy == input.CreatedByFilter)
                        .WhereIf(input.MinCreatedDateFilter != null, e => e.CreatedDate >= input.MinCreatedDateFilter)
                        .WhereIf(input.MaxCreatedDateFilter != null, e => e.CreatedDate <= input.MaxCreatedDateFilter);

            var pagedAndFilteredOETerms = filteredOETerms
                .OrderBy(input.Sorting ?? "id asc")
                .PageBy(input);

            var oeTerms = from o in pagedAndFilteredOETerms
                          select new
                          {

                              o.TermID,
                              o.TermDesc,
                              o.TermDays,
                              o.Active,
                              o.AUDTUSER,
                              o.AudtDate,
                              o.CreatedBy,
                              o.CreatedDate,
                              Id = o.Id
                          };

            var totalCount = await filteredOETerms.CountAsync();

            var dbList = await oeTerms.ToListAsync();
            var results = new List<GetOETermsForViewDto>();

            foreach (var o in dbList)
            {
                var res = new GetOETermsForViewDto()
                {
                    OETerms = new OETermsDto
                    {

                    TermID= o.TermID,
                        TermDesc = o.TermDesc,
                        TermDays = o.TermDays,
                        Active = o.Active,
                        AUDTUSER = o.AUDTUSER,
                        AudtDate = o.AudtDate,
                        CreatedBy = o.CreatedBy,
                        CreatedDate = o.CreatedDate,
                        Id = o.Id,
                    }
                };

                results.Add(res);
            }

            return new PagedResultDto<GetOETermsForViewDto>(
                totalCount,
                results
            );

        }

        public async Task<GetOETermsForViewDto> GetOETermsForView(int id)
        {
            var oeTerms = await _oeTermsRepository.GetAsync(id);

            var output = new GetOETermsForViewDto { OETerms = ObjectMapper.Map<OETermsDto>(oeTerms) };

            return output;
        }

        [AbpAuthorize(AppPermissions.Sales_OETerms_Edit)]
        public async Task<GetOETermsForEditOutput> GetOETermsForEdit(EntityDto input)
        {
            var oeTerms = await _oeTermsRepository.FirstOrDefaultAsync(input.Id);

            var output = new GetOETermsForEditOutput { OETerms = ObjectMapper.Map<CreateOrEditOETermsDto>(oeTerms) };

            return output;
        }

        public async Task CreateOrEdit(CreateOrEditOETermsDto input)
        {
            if (input.Id == null)
            {
                await Create(input);
            }
            else
            {
                await Update(input);
            }
        }

        [AbpAuthorize(AppPermissions.Sales_OETerms_Create)]
        protected virtual async Task Create(CreateOrEditOETermsDto input)
        {
            var oeTerms = ObjectMapper.Map<OETerms>(input);

            if (AbpSession.TenantId != null)
            {
                oeTerms.TenantId = (int)AbpSession.TenantId;
            }

            await _oeTermsRepository.InsertAsync(oeTerms);

        }

        [AbpAuthorize(AppPermissions.Sales_OETerms_Edit)]
        protected virtual async Task Update(CreateOrEditOETermsDto input)
        {
            var oeTerms = await _oeTermsRepository.FirstOrDefaultAsync((int)input.Id);
            ObjectMapper.Map(input, oeTerms);

        }

        [AbpAuthorize(AppPermissions.Sales_OETerms_Delete)]
        public async Task Delete(EntityDto input)
        {
            await _oeTermsRepository.DeleteAsync(input.Id);
        }
        public int GetmaxDocNo()
        {
            var id = 0;
            var rec = _oeTermsRepository.GetAll().Where(c => c.TenantId == AbpSession.TenantId).DefaultIfEmpty().Max(c => c.TermID);
            if (rec == 0)
            {
                id = 1;
            }
            else
            {
                id = rec + 1;
            }
            return id;
        }

    }
}