

using System;
using System.Linq;
using System.Linq.Dynamic.Core;
using Abp.Linq.Extensions;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using ERP.SupplyChain.Purchase.PurchaseOrder.Dtos;
using ERP.Dto;
using Abp.Application.Services.Dto;
using ERP.Authorization;
using Abp.Extensions;
using Abp.Authorization;
using Microsoft.EntityFrameworkCore;
using ERP.SupplyChain.Inventory.IC_Item;
using ERP.CommonServices;
using ERP.SupplyChain.Purchase.ReceiptEntry;

namespace ERP.SupplyChain.Purchase.PurchaseOrder
{
	[AbpAuthorize(AppPermissions.Purchase_POPODetails)]
    public class POPODetailsAppService : ERPAppServiceBase, IPOPODetailsAppService
    {
		private readonly IRepository<POPODetail> _popoDetailRepository;
        private readonly IRepository<PORECDetail> _porecDetailRepository;
        private readonly IRepository<ICItem> _ICItemRepository;
        private readonly IRepository<PORECHeader> _porecHeaderRepository;
        private readonly IRepository<TaxClass> _taxClassRepository;

        public POPODetailsAppService(IRepository<POPODetail> popoDetailRepository, IRepository<PORECDetail> porecDetailRepository, IRepository<PORECHeader> porecHeaderRepository, IRepository<ICItem> ICItemRepository, IRepository<TaxClass> taxClassRepository) 
		  {
			_popoDetailRepository = popoDetailRepository;
            _porecDetailRepository = porecDetailRepository;
            _porecHeaderRepository = porecHeaderRepository;
            _ICItemRepository = ICItemRepository;
            _taxClassRepository = taxClassRepository;
        }

        public async Task<PagedResultDto<POPODetailDto>> GetPOPODData(int detId)
        {

            var filteredPOPODetails = _popoDetailRepository.GetAll().Where(e => e.DocNo == detId && e.TenantId == AbpSession.TenantId);
            var GrnDoc = _porecHeaderRepository.GetAll().Where(v => v.PODocNo == filteredPOPODetails.FirstOrDefault().DocNo && v.TenantId == AbpSession.TenantId && v.Approved == true);
            var docNo = 0;
            if (GrnDoc.Count()>0)
            {
                docNo = GrnDoc.FirstOrDefault().DocNo;
            }
            var popoDetails = from o in filteredPOPODetails
                              select new POPODetailDto()
                              {
                                    DetID = o.DetID,
                                    LocID = o.LocID,
                                    DocNo = o.DocNo,
                                    ItemID = o.ItemID,
                                    ItemDesc= _ICItemRepository.GetAll().Where(e => e.TenantId == AbpSession.TenantId && e.ItemId == o.ItemID).Count()>0? _ICItemRepository.GetAll().Where(e => e.TenantId == AbpSession.TenantId && e.ItemId == o.ItemID).SingleOrDefault().Descp:"",
                                    Unit = o.Unit,
                                    Conver = o.Conver,
                                    Qty = o.Qty,
                                    Rate = o.Rate,
                                    Amount = o.Amount,
                                    TaxAuth = o.TaxAuth,
                                    TaxClass = o.TaxClass,
                                    TaxClassDesc = _taxClassRepository.GetAll().Where(e => e.TenantId == AbpSession.TenantId && e.CLASSID == o.TaxClass).Count()> 0?_taxClassRepository.GetAll().Where(e => e.TenantId == AbpSession.TenantId && e.Id == o.TaxClass).SingleOrDefault().CLASSDESC:"",
                                    TaxRate = o.TaxRate,
                                    TaxAmt = o.TaxAmt,
                                    Remarks = o.Remarks,
                                    NetAmount = o.NetAmount,
                                    Id = o.Id,
                                    PoDocNo= _porecDetailRepository.GetAll().Where(v => v.DocNo == docNo && v.TenantId==AbpSession.TenantId && v.ItemID==o.ItemID).Count()>0? _porecDetailRepository.GetAll().Where(v => v.DocNo == docNo && v.TenantId == AbpSession.TenantId).FirstOrDefault().ItemStatus : false,
                                    TransType= o.TransType
                              };

            var totalCount = await filteredPOPODetails.CountAsync();

            return new PagedResultDto<POPODetailDto>(
                totalCount,
                await popoDetails.ToListAsync()
            );
        }

        [AbpAuthorize(AppPermissions.Purchase_POPODetails_Edit)]
		 public async Task<GetPOPODetailForEditOutput> GetPOPODetailForEdit(EntityDto input)
         {
            var popoDetail = await _popoDetailRepository.FirstOrDefaultAsync(input.Id);
           
		    var output = new GetPOPODetailForEditOutput {POPODetail = ObjectMapper.Map<CreateOrEditPOPODetailDto>(popoDetail)};
			
            return output;
         }

    }
}