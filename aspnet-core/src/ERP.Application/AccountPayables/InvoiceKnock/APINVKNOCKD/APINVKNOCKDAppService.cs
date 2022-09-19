using System;
using System.Linq;
using System.Linq.Dynamic.Core;
using Abp.Linq.Extensions;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using ERP.AccountPayables.InvoiceKnock.APINVKNOCKD.Dtos;
using ERP.Dto;
using Abp.Application.Services.Dto;
using ERP.Authorization;
using Abp.Extensions;
using Abp.Authorization;
using Microsoft.EntityFrameworkCore;
using Abp.UI;
using ERP.Storage;

namespace ERP.AccountPayables.InvoiceKnock.APINVKNOCKD
{
    [AbpAuthorize(AppPermissions.Pages_APINVKNOCKD)]
    public class APINVKNOCKDAppService : ERPAppServiceBase, IAPINVKNOCKDAppService
    {
        private readonly IRepository<APINVKNOCKD> _apinvknockdRepository;

        public APINVKNOCKDAppService(IRepository<APINVKNOCKD> apinvknockdRepository)
        {
            _apinvknockdRepository = apinvknockdRepository;

        }

        public async Task<PagedResultDto<GetAPINVKNOCKDForViewDto>> GetAll(GetAllAPINVKNOCKDInput input)
        {

            var filteredAPINVKNOCKD = _apinvknockdRepository.GetAll()
                        .WhereIf(!string.IsNullOrWhiteSpace(input.Filter), e => false || e.GRNDate.Contains(input.Filter))
                        .WhereIf(input.MinDetIDFilter != null, e => e.DetID >= input.MinDetIDFilter)
                        .WhereIf(input.MaxDetIDFilter != null, e => e.DetID <= input.MaxDetIDFilter)
                        .WhereIf(input.MinDocNoFilter != null, e => e.DocNo >= input.MinDocNoFilter)
                        .WhereIf(input.MaxDocNoFilter != null, e => e.DocNo <= input.MaxDocNoFilter)
                        .WhereIf(input.MinGRNNoFilter != null, e => e.GRNNo >= input.MinGRNNoFilter)
                        .WhereIf(input.MaxGRNNoFilter != null, e => e.GRNNo <= input.MaxGRNNoFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.GRNDateFilter), e => e.GRNDate == input.GRNDateFilter)
                        .WhereIf(input.MinPONoFilter != null, e => e.PONo >= input.MinPONoFilter)
                        .WhereIf(input.MaxPONoFilter != null, e => e.PONo <= input.MaxPONoFilter)
                        .WhereIf(input.MinAmountFilter != null, e => e.Amount >= input.MinAmountFilter)
                        .WhereIf(input.MaxAmountFilter != null, e => e.Amount <= input.MaxAmountFilter)
                        .WhereIf(input.MinAlreadyPaidFilter != null, e => e.GRNAdjusted >= input.MinAlreadyPaidFilter)
                        .WhereIf(input.MaxAlreadyPaidFilter != null, e => e.GRNAdjusted <= input.MaxAlreadyPaidFilter)
                        .WhereIf(input.MinPendingFilter != null, e => e.AdvPending >= input.MinPendingFilter)
                        .WhereIf(input.MaxPendingFilter != null, e => e.GRNPending <= input.MaxPendingFilter)
                        .WhereIf(input.MinAdvAdjustFilter != null, e => e.AdvAdjust >= input.MinAdvAdjustFilter)
                        .WhereIf(input.MaxAdvAdjustFilter != null, e => e.AdvAdjust <= input.MaxAdvAdjustFilter)
                        .WhereIf(input.MinGRNAdjustFilter != null, e => e.GRNAdjust >= input.MinGRNAdjustFilter)
                        .WhereIf(input.MaxGRNAdjustFilter != null, e => e.GRNAdjust <= input.MaxGRNAdjustFilter);

            var pagedAndFilteredAPINVKNOCKD = filteredAPINVKNOCKD
                .OrderBy(input.Sorting ?? "id asc")
                .PageBy(input);

            var apinvknockd = from o in pagedAndFilteredAPINVKNOCKD
                              select new
                              {

                                  o.DetID,
                                  o.DocNo,
                                  o.GRNNo,
                                  o.GRNDate,
                                  o.PONo,
                                  o.Amount,
                                  o.GRNAdjusted,
                                  o.AdvPending,
                                  o.GRNPending,
                                  o.AdvAdjust,
                                  o.GRNAdjust,
                                  o.PoAdvAmt,
                                  o.AdvAdjusted,
                                  Id = o.Id
                              };

            var totalCount = await filteredAPINVKNOCKD.CountAsync();

            var dbList = await apinvknockd.ToListAsync();
            var results = new List<GetAPINVKNOCKDForViewDto>();

            foreach (var o in dbList)
            {
                var res = new GetAPINVKNOCKDForViewDto()
                {
                    APINVKNOCKD = new APINVKNOCKDDto
                    {

                        DetID = o.DetID,
                        DocNo = o.DocNo,
                        GRNNo = o.GRNNo,
                        GRNDate = o.GRNDate,
                        PONo = o.PONo,
                        Amount = o.Amount,
                        GRNAdjusted = o.GRNAdjusted,
                        AdvPending = o.AdvPending,
                        GRNPending = o.GRNPending,
                        AdvAdjust = o.AdvAdjust,
                        GRNAdjust = o.GRNAdjust,
                        PoAdvAmt = o.PoAdvAmt,
                        AdvAdjusted = o.AdvAdjusted,
                        Id = o.Id,
                    }
                };

                results.Add(res);
            }

            return new PagedResultDto<GetAPINVKNOCKDForViewDto>(
                totalCount,
                results
            );

        }

        public async Task<GetAPINVKNOCKDForViewDto> GetAPINVKNOCKDForView(int id)
        {
            var apinvknockd = await _apinvknockdRepository.GetAsync(id);

            var output = new GetAPINVKNOCKDForViewDto { APINVKNOCKD = ObjectMapper.Map<APINVKNOCKDDto>(apinvknockd) };

            return output;
        }

        [AbpAuthorize(AppPermissions.Pages_APINVKNOCKD_Edit)]
        public async Task<GetAPINVKNOCKDForEditOutput> GetAPINVKNOCKDForEdit(EntityDto input)
        {
            var apinvknockd = await _apinvknockdRepository.FirstOrDefaultAsync(input.Id);

            var output = new GetAPINVKNOCKDForEditOutput { APINVKNOCKD = ObjectMapper.Map<CreateOrEditAPINVKNOCKDDto>(apinvknockd) };

            return output;
        }

        public async Task CreateOrEdit(CreateOrEditAPINVKNOCKDDto input)
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

        [AbpAuthorize(AppPermissions.Pages_APINVKNOCKD_Create)]
        protected virtual async Task Create(CreateOrEditAPINVKNOCKDDto input)
        {
            var apinvknockd = ObjectMapper.Map<APINVKNOCKD>(input);

            if (AbpSession.TenantId != null)
            {
                apinvknockd.TenantId = (int)AbpSession.TenantId;
            }

            await _apinvknockdRepository.InsertAsync(apinvknockd);

        }

        [AbpAuthorize(AppPermissions.Pages_APINVKNOCKD_Edit)]
        protected virtual async Task Update(CreateOrEditAPINVKNOCKDDto input)
        {
            var apinvknockd = await _apinvknockdRepository.FirstOrDefaultAsync((int)input.Id);
            ObjectMapper.Map(input, apinvknockd);

        }

        [AbpAuthorize(AppPermissions.Pages_APINVKNOCKD_Delete)]
        public async Task Delete(EntityDto input)
        {
            await _apinvknockdRepository.DeleteAsync(input.Id);
        }

    }
}