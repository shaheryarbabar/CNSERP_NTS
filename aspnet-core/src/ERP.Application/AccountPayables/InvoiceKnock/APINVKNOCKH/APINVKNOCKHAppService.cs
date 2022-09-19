using System;
using System.Linq;
using System.Linq.Dynamic.Core;
using Abp.Linq.Extensions;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using ERP.AccountPayables.InvoiceKnock.APINVKNOCKH.Dtos;
using ERP.Dto;
using Abp.Application.Services.Dto;
using ERP.Authorization;
using Abp.Extensions;
using Abp.Authorization;
using Microsoft.EntityFrameworkCore;
using Abp.UI;
using ERP.Storage;
using ERP.GeneralLedger.Transaction.VoucherEntry;
using ERP.GeneralLedger.SetupForms;
using ERP.Authorization.Users;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using ERP.AccountPayables.InvoiceKnock.APINVKNOCKD.Dtos;
using ERP.GeneralLedger.Transaction.VoucherEntry.GLTRD.Dtos;
using ERP.GeneralLedger.Transaction.VoucherEntry.Dtos;
using ERP.GeneralLedger.Transaction.VoucherEntry.GLTRH.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace ERP.AccountPayables.InvoiceKnock.APINVKNOCKH
{
    [AbpAuthorize(AppPermissions.Pages_APINVKNOCKH)]
    public class APINVKNOCKHAppService : ERPAppServiceBase, IAPINVKNOCKHAppService
    {
        private readonly IRepository<APINVKNOCKH> _apinvknockhRepository;
        private readonly IRepository<User, long> _userRepository;
        private VoucherEntryAppService _voucherEntryAppService;
        private readonly IRepository<GLLocation> _glLocationRepository;
        private readonly IRepository<ChartofControl, string> _chartofControlRepository;
        private readonly IRepository<AccountSubLedger> _accountSubLedgerRepository;
        private readonly IRepository<APINVKNOCKD.APINVKNOCKD> _apinvknockdRepository;

        public APINVKNOCKHAppService(IRepository<APINVKNOCKH> apinvknockhRepository, IRepository<User, long> userRepository, VoucherEntryAppService voucherEntryAppService, IRepository<APINVKNOCKD.APINVKNOCKD> apinvknockdRepository, IRepository<AccountSubLedger> accountSubLedgerRepository, IRepository<GLLocation> glLocationRepository, IRepository<ChartofControl, string> chartofControlRepository)
        {
            _apinvknockhRepository = apinvknockhRepository;
            _glLocationRepository = glLocationRepository;
            _chartofControlRepository = chartofControlRepository;
            _accountSubLedgerRepository = accountSubLedgerRepository;
            _apinvknockdRepository = apinvknockdRepository;
            _userRepository = userRepository;
            _voucherEntryAppService = voucherEntryAppService;
        }

        public async Task<PagedResultDto<GetAPINVKNOCKHForViewDto>> GetAll(GetAllAPINVKNOCKHInput input)
        {

            var filteredAPINVKNOCKH = _apinvknockhRepository.GetAll()
                        .WhereIf(!string.IsNullOrWhiteSpace(input.Filter), e => false || e.VendorCtrlAc.Contains(input.Filter) || e.LiabilityCtrlAc.Contains(input.Filter) || e.PaymentOption.Contains(input.Filter) || e.BankID.Contains(input.Filter) || e.BAccountID.Contains(input.Filter) || e.InsNo.Contains(input.Filter) || e.CurID.Contains(input.Filter) || e.Narration.Contains(input.Filter) || e.PostedBy.Contains(input.Filter) || e.CreatedBy.Contains(input.Filter) || e.AudtUser.Contains(input.Filter))
                        .WhereIf(input.MinDocNoFilter != null, e => e.DocNo >= input.MinDocNoFilter)
                        .WhereIf(input.MaxDocNoFilter != null, e => e.DocNo <= input.MaxDocNoFilter)
                        .WhereIf(input.MinGLLOCIDFilter != null, e => e.GLLOCID >= input.MinGLLOCIDFilter)
                        .WhereIf(input.MaxGLLOCIDFilter != null, e => e.GLLOCID <= input.MaxGLLOCIDFilter)
                        .WhereIf(input.MinDocDateFilter != null, e => e.DocDate >= input.MinDocDateFilter)
                        .WhereIf(input.MaxDocDateFilter != null, e => e.DocDate <= input.MaxDocDateFilter)
                        .WhereIf(input.MinPostDateFilter != null, e => e.PostDate >= input.MinPostDateFilter)
                        .WhereIf(input.MaxPostDateFilter != null, e => e.PostDate <= input.MaxPostDateFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.VendorCtrlAcFilter), e => e.VendorCtrlAc == input.VendorCtrlAcFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.LiabilityCtrlAcFilter), e => e.LiabilityCtrlAc == input.LiabilityCtrlAcFilter)
                        .WhereIf(input.MinVendorIDFilter != null, e => e.VendorID >= input.MinVendorIDFilter)
                        .WhereIf(input.MaxVendorIDFilter != null, e => e.VendorID <= input.MaxVendorIDFilter)
                        .WhereIf(input.MinTotalAmountFilter != null, e => e.TotalAmount >= input.MinTotalAmountFilter)
                        .WhereIf(input.MaxTotalAmountFilter != null, e => e.TotalAmount <= input.MaxTotalAmountFilter)
                        .WhereIf(input.MinClosingBalanceFilter != null, e => e.ClosingBalance >= input.MinClosingBalanceFilter)
                        .WhereIf(input.MaxClosingBalanceFilter != null, e => e.ClosingBalance <= input.MaxClosingBalanceFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.PaymentOptionFilter), e => e.PaymentOption == input.PaymentOptionFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.BankIDFilter), e => e.BankID == input.BankIDFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.BAccountIDFilter), e => e.BAccountID == input.BAccountIDFilter)
                        .WhereIf(input.MinConfigIDFilter != null, e => e.ConfigID >= input.MinConfigIDFilter)
                        .WhereIf(input.MaxConfigIDFilter != null, e => e.ConfigID <= input.MaxConfigIDFilter)
                        .WhereIf(input.MinInsTypeFilter != null, e => e.InsType >= input.MinInsTypeFilter)
                        .WhereIf(input.MaxInsTypeFilter != null, e => e.InsType <= input.MaxInsTypeFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.InsNoFilter), e => e.InsNo == input.InsNoFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.CurIDFilter), e => e.CurID == input.CurIDFilter)
                        .WhereIf(input.MinCurRateFilter != null, e => e.CurRate >= input.MinCurRateFilter)
                        .WhereIf(input.MaxCurRateFilter != null, e => e.CurRate <= input.MaxCurRateFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.NarrationFilter), e => e.Narration == input.NarrationFilter)
                        .WhereIf(input.PostedFilter.HasValue && input.PostedFilter > -1, e => (input.PostedFilter == 1 && e.Posted) || (input.PostedFilter == 0 && !e.Posted))
                        .WhereIf(!string.IsNullOrWhiteSpace(input.PostedByFilter), e => e.PostedBy == input.PostedByFilter)
                        .WhereIf(input.MinPostedDateFilter != null, e => e.PostedDate >= input.MinPostedDateFilter)
                        .WhereIf(input.MaxPostedDateFilter != null, e => e.PostedDate <= input.MaxPostedDateFilter)
                        .WhereIf(input.MinLinkDetIDFilter != null, e => e.LinkDetID >= input.MinLinkDetIDFilter)
                        .WhereIf(input.MaxLinkDetIDFilter != null, e => e.LinkDetID <= input.MaxLinkDetIDFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.CreatedByFilter), e => e.CreatedBy == input.CreatedByFilter)
                        .WhereIf(input.MinCreatedDateFilter != null, e => e.CreatedDate >= input.MinCreatedDateFilter)
                        .WhereIf(input.MaxCreatedDateFilter != null, e => e.CreatedDate <= input.MaxCreatedDateFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.AudtUserFilter), e => e.AudtUser == input.AudtUserFilter)
                        .WhereIf(input.MinAudtDateFilter != null, e => e.AudtDate >= input.MinAudtDateFilter)
                        .WhereIf(input.MaxAudtDateFilter != null, e => e.AudtDate <= input.MaxAudtDateFilter);

            var pagedAndFilteredAPINVKNOCKH = filteredAPINVKNOCKH
                .OrderBy(input.Sorting ?? "id desc")
                .PageBy(input);

            var apinvknockh = from o in pagedAndFilteredAPINVKNOCKH
                              select new
                              {

                                  o.DocNo,
                                  o.GLLOCID,
                                  o.DocDate,
                                  o.PostDate,
                                  o.VendorCtrlAc,
                                  o.LiabilityCtrlAc,
                                  o.VendorID,
                                  o.TotalAmount,
                                  o.ClosingBalance,
                                  o.PaymentOption,
                                  o.BankID,
                                  o.BAccountID,
                                  o.ConfigID,
                                  o.InsType,
                                  o.InsNo,
                                  o.CurID,
                                  o.CurRate,
                                  o.Narration,
                                  o.Posted,
                                  o.PostedBy,
                                  o.PostedDate,
                                  o.LinkDetID,
                                  o.CreatedBy,
                                  o.CreatedDate,
                                  o.AudtUser,
                                  o.AudtDate,
                                  Id = o.Id
                              };

            var totalCount = await filteredAPINVKNOCKH.CountAsync();

            var dbList = await apinvknockh.ToListAsync();
            var results = new List<GetAPINVKNOCKHForViewDto>();

            foreach (var o in dbList)
            {
                var res = new GetAPINVKNOCKHForViewDto()
                {
                    APINVKNOCKH = new APINVKNOCKHDto
                    {

                        DocNo = o.DocNo,
                        GLLOCID = o.GLLOCID,
                        DocDate = o.DocDate,
                        PostDate = o.PostDate,
                        VendorCtrlAc = o.VendorCtrlAc,
                        LiabilityCtrlAc = o.LiabilityCtrlAc,
                        VendorID = o.VendorID,
                        TotalAmount = o.TotalAmount,
                        ClosingBalance = o.ClosingBalance,
                        PaymentOption = o.PaymentOption,
                        BankID = o.BankID,
                        BAccountID = o.BAccountID,
                        ConfigID = o.ConfigID,
                        InsType = o.InsType,
                        InsNo = o.InsNo,
                        CurID = o.CurID,
                        CurRate = o.CurRate,
                        Narration = o.Narration,
                        Posted = o.Posted,
                        PostedBy = o.PostedBy,
                        PostedDate = o.PostedDate,
                        LinkDetID = o.LinkDetID,
                        CreatedBy = o.CreatedBy,
                        CreatedDate = o.CreatedDate,
                        AudtUser = o.AudtUser,
                        AudtDate = o.AudtDate,
                        Id = o.Id,
                    }
                };

                results.Add(res);
            }

            return new PagedResultDto<GetAPINVKNOCKHForViewDto>(
                totalCount,
                results
            );

        }

        public async Task<GetAPINVKNOCKHForViewDto> GetAPINVKNOCKHForView(int id)
        {
            var apinvknockh = await _apinvknockhRepository.GetAsync(id);

            var output = new GetAPINVKNOCKHForViewDto { APINVKNOCKH = ObjectMapper.Map<APINVKNOCKHDto>(apinvknockh) };

            return output;
        }

        [AbpAuthorize(AppPermissions.Pages_APINVKNOCKH_Edit)]
        public async Task<GetAPINVKNOCKHForEditOutput> GetAPINVKNOCKHForEdit(EntityDto input)
        {
            var apinvknockh = await _apinvknockhRepository.FirstOrDefaultAsync(input.Id);

            var output = new GetAPINVKNOCKHForEditOutput { APINVKNOCKH = ObjectMapper.Map<CreateOrEditAPINVKNOCKHDto>(apinvknockh) };
            output.APINVKNOCKH.LocDesc = _glLocationRepository.GetAll().Where(o => o.LocId == output.APINVKNOCKH.GLLOCID).Count() > 0
                         ?
                         _glLocationRepository.GetAll().Where(o => o.LocId == output.APINVKNOCKH.GLLOCID).FirstOrDefault().LocDesc
                         : "";

            //Creditor Description
            output.APINVKNOCKH.VendorCtrlAcDesc = _chartofControlRepository.GetAll().Where(o => o.TenantId == AbpSession.TenantId && o.SLType == 1 && o.Inactive == false && o.Id == output.APINVKNOCKH.VendorCtrlAc).Count() > 0
                ? _chartofControlRepository.GetAll().Where(o => o.TenantId == AbpSession.TenantId && o.SLType == 1 && o.Inactive == false && o.Id == output.APINVKNOCKH.VendorCtrlAc).FirstOrDefault().AccountName
                : "";
            //Liability Description
            output.APINVKNOCKH.LiabilityCtrlAcDesc = _chartofControlRepository.GetAll().Where(o => o.TenantId == AbpSession.TenantId  && o.Inactive == false && o.Id == output.APINVKNOCKH.LiabilityCtrlAc).Count() > 0
                ? _chartofControlRepository.GetAll().Where(o => o.TenantId == AbpSession.TenantId && o.Inactive == false && o.Id == output.APINVKNOCKH.LiabilityCtrlAc).FirstOrDefault().AccountName
                : "";
            // Vendor Description
            output.APINVKNOCKH.VendorDesc = _accountSubLedgerRepository.GetAll().Where(x => x.TenantId == AbpSession.TenantId && x.Active == true && x.SLType == 1 && x.Id == output.APINVKNOCKH.VendorID).Count() > 0
                ? _accountSubLedgerRepository.GetAll().Where(x => x.TenantId == AbpSession.TenantId && x.Active == true && x.SLType == 1 && x.Id == output.APINVKNOCKH.VendorID).FirstOrDefault().SubAccName
                : "";

            var detailInvoices = _apinvknockdRepository.GetAll().Where(x => x.DetID == input.Id && x.TenantId == (int)AbpSession.TenantId);
            output.APINVKNOCKH.InvoiceKnockOffDetailDto = ObjectMapper.Map<List<APINVKNOCKDDto>>(detailInvoices);
            return output;
        }

        public async Task CreateOrEdit(CreateOrEditAPINVKNOCKHDto input)
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

        [AbpAuthorize(AppPermissions.Pages_APINVKNOCKH_Create)]
        protected virtual async Task Create(CreateOrEditAPINVKNOCKHDto input)
        {
            var apinvknockh = ObjectMapper.Map<APINVKNOCKH>(input);

            if (AbpSession.TenantId != null)
            {
                apinvknockh.TenantId = (int)AbpSession.TenantId;
                apinvknockh.CreatedDate = DateTime.Now;
                apinvknockh.CreatedBy = _userRepository.GetAll().Where(o => o.Id == AbpSession.UserId).SingleOrDefault().UserName;
                apinvknockh.DocNo = GetDocId();
            }

           var Getid= await _apinvknockhRepository.InsertAndGetIdAsync(apinvknockh);

            if (input.InvoiceKnockOffDetailDto != null)
            {
                foreach (var data in input.InvoiceKnockOffDetailDto)
                {
                    var InvoiceDetail = ObjectMapper.Map<APINVKNOCKD.APINVKNOCKD>(data);
                    if (AbpSession.TenantId != null)
                    {
                        InvoiceDetail.TenantId = (int)AbpSession.TenantId;
                    }
                    InvoiceDetail.DetID = Getid;
                    InvoiceDetail.DocNo = apinvknockh.DocNo;
                    await _apinvknockdRepository.InsertAsync(InvoiceDetail);
                }
            }
        }
        public int GetDocId()
        {
            var result = _apinvknockhRepository.GetAll().DefaultIfEmpty().Max(o => o.DocNo);
            return result = result + 1;
        }
        [AbpAuthorize(AppPermissions.Pages_APINVKNOCKH_Edit)]
        protected virtual async Task Update(CreateOrEditAPINVKNOCKHDto input)
        {
            var apinvknockh = await _apinvknockhRepository.FirstOrDefaultAsync((int)input.Id);
            apinvknockh.AudtDate = DateTime.Now;
            apinvknockh.AudtUser = _userRepository.GetAll().Where(o => o.Id == AbpSession.UserId).SingleOrDefault().UserName;

            ObjectMapper.Map(input, apinvknockh);

            var InvoiceDetail = await _apinvknockdRepository.GetAll().Where(x => x.TenantId == AbpSession.TenantId && x.DetID == input.Id).ToListAsync();
            if (InvoiceDetail != null)
            {
                foreach (var item in InvoiceDetail)
                {
                    await _apinvknockdRepository.DeleteAsync(item);
                }
            }

            if (input.InvoiceKnockOffDetailDto != null)
            {
                foreach (var data in input.InvoiceKnockOffDetailDto)
                {
                    var InvoiceDetail1 = ObjectMapper.Map<APINVKNOCKD.APINVKNOCKD>(data);
                    if (AbpSession.TenantId != null)
                    {
                        InvoiceDetail1.TenantId = (int)AbpSession.TenantId;
                    }
                    InvoiceDetail1.DetID = apinvknockh.Id;
                    InvoiceDetail1.DocNo = input.DocNo;
                    await _apinvknockdRepository.InsertAsync(InvoiceDetail1);
                }
            }


        }


        public List<APINVKNOCKDDto> GetPostedInvoices(string Debtor, int CustId)
        {
            string str = ConfigurationManager.AppSettings["ConnectionString"];
            var result = new List<APINVKNOCKDDto>();
            using (SqlConnection cn = new SqlConnection(str))
            {
                using (SqlCommand cmd = new SqlCommand("SP_InvoiceKnockOffAP", cn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@CREDITOR", Debtor);
                    cmd.Parameters.AddWithValue("@VENDOR", CustId);
                    cmd.Parameters.AddWithValue("@TenantId", AbpSession.TenantId);
                    cn.Open();
                    using (SqlDataReader dataReader = cmd.ExecuteReader())
                    {

                        while (dataReader.Read())
                        {

                            result.Add(new APINVKNOCKDDto
                            {
                                GRNNo = Convert.ToInt32(dataReader["InvNo"]),
                                GRNDate = dataReader["InvDate"].ToString(),
                                PONo =dataReader["poNo"] is DBNull?0: Convert.ToInt32(dataReader["poNo"]),
                                Amount = Convert.ToDouble(dataReader["Amount"]),
                                GRNAdjusted = Convert.ToDouble(dataReader["AlreadyPaid"]),
                                //Pending = Convert.ToDouble(dataReader["Pending"]),
                                PoAdvAmt = Convert.ToDouble(dataReader["POAdvPaid"]),
                                AdvAdjusted = Convert.ToDouble(dataReader["adv_adj"]),
                                AdvPending = Convert.ToDouble(dataReader["adv_Pending"]),
                                GRNPending = Convert.ToDouble(dataReader["grn_pending"]),


                            });
                        }
                    }
                }
            }
            return result;
        }

        [AbpAuthorize(AppPermissions.Pages_APINVKNOCKH_Delete)]
        public async Task Delete(EntityDto input)
        {
            await _apinvknockhRepository.DeleteAsync(input.Id);
        }
        public string ProcessInvoice(CreateOrEditAPINVKNOCKHDto input)
        {
            string alertMsg = "";
            alertMsg = ProcessInvoices(input);
            return alertMsg;
        }
        private string ProcessInvoices(CreateOrEditAPINVKNOCKHDto input)
        {
            var alertMsg = "";
            var currency = _voucherEntryAppService.GetBaseCurrency();
            var user = _userRepository.GetAll().Where(o => o.Id == AbpSession.UserId).Count() > 0 ?
                _userRepository.GetAll().Where(o => o.Id == AbpSession.UserId).SingleOrDefault().UserName : "";
            var glinvHedaer = _apinvknockhRepository.GetAll().Where(o => o.TenantId == AbpSession.TenantId && o.Id == input.Id).Count() > 0 ?
                _apinvknockhRepository.GetAll().Where(o => o.TenantId == AbpSession.TenantId && o.Id == input.Id).SingleOrDefault() : null;

            //update for tax
            


            //string narration = glinvHedaer.Narration + "-" + glinvHedaer.PartyInvNo + "-" + glinvHedaer.RefNo + "-" + glinvHedaer.ChequeNo;
            string refrence = "";
            List<CreateOrEditGLTRDetailDto> gltrdetailsList = new List<CreateOrEditGLTRDetailDto>();
            //For BP ,CP

            double? totalAmount = input.TotalAmount;
            if (input.VendorID != 0)
            {
                refrence = _accountSubLedgerRepository.GetAll().Where(o => o.TenantId == AbpSession.TenantId
                && o.Id == input.VendorID
                && o.AccountID == input.VendorCtrlAc
                ).Count() > 0 ?
                    _accountSubLedgerRepository.GetAll().Where(o => o.TenantId == AbpSession.TenantId
                    && o.Id == input.VendorID
                    && o.AccountID == input.VendorCtrlAc).First().SubAccName :
                    "";

                if (totalAmount > 0)
                {
                    gltrdetailsList.Add(new CreateOrEditGLTRDetailDto
                    {
                        Amount = totalAmount,
                        AccountID = input.VendorCtrlAc,
                        Narration = input.Narration,
                        SubAccID = input.VendorID,
                        LocId = input.GLLOCID.Value,
                        IsAuto = false
                    });
                }
                if (!string.IsNullOrWhiteSpace(input.BAccountID))
                {
                    gltrdetailsList.Add(new CreateOrEditGLTRDetailDto
                    {
                        Amount = -totalAmount,
                        AccountID = input.BAccountID,
                        Narration = input.Narration,
                        SubAccID = 0,
                        LocId = input.GLLOCID.Value,
                        IsAuto = true
                    });
                }
            }



            VoucherEntryDto autoEntry = new VoucherEntryDto()
            {
                GLTRHeader = new CreateOrEditGLTRHeaderDto
                {
                    BookID = glinvHedaer.PaymentOption.Trim() == "Bank" ? "BP" : "CP",
                    NARRATION = input.Narration,
                    DocDate = input.DocDate.Value,
                    DocMonth = input.DocDate.Value.Month,
                    Approved = true,
                    AprovedBy = user,
                    AprovedDate = DateTime.Now,
                    Posted = false,
                    PostedBy = user,
                    PostedDate = DateTime.Now,
                    LocId = glinvHedaer.GLLOCID.Value,
                    CreatedBy = user,
                    CreatedOn = DateTime.Now,
                    AuditUser = user,
                    AuditTime = DateTime.Now,
                    CURID = currency.Id,
                    CURRATE = currency.CurrRate,
                    ConfigID = 0,
                    ChType = input.InsType,
                    ChNumber = input.InsNo,
                    Reference = refrence,
                    Amount = glinvHedaer.TotalAmount == null ? 0 : Convert.ToDecimal(glinvHedaer.TotalAmount),
                    FmtDocNo = _voucherEntryAppService.GetMaxDocId(glinvHedaer.PaymentOption.Trim() == "Bank" ? "BP" : "CP", true, input.DocDate),
                    DocNo = _voucherEntryAppService.GetMaxDocId(glinvHedaer.PaymentOption.Trim() == "Bank" ? "BP" : "CP", false, input.DocDate)
                },
                GLTRDetail = gltrdetailsList
            };

            if (autoEntry.GLTRDetail.Count() > 0 && autoEntry.GLTRHeader != null)
            {
                var voucher = _voucherEntryAppService.ProcessVoucherEntry(autoEntry);

                glinvHedaer.Posted = true;
                glinvHedaer.PostedBy = user;
                glinvHedaer.PostedDate = DateTime.Now;
                glinvHedaer.LinkDetID = voucher[0].Id;
                var glinvh = _apinvknockhRepository.FirstOrDefault((int)glinvHedaer.Id);
                ObjectMapper.Map(glinvHedaer, glinvh);

                alertMsg = "Save";
            }
            else
            {
                alertMsg = "NoRecord";
            }

            //for JV
            string refrence1 = "";
            List<CreateOrEditGLTRDetailDto> gltrdetailsList1 = new List<CreateOrEditGLTRDetailDto>();

            double? totaladvadjust = input.InvoiceKnockOffDetailDto.Sum(c=>c.AdvAdjust);
            if (input.VendorID != 0)
            {
                refrence1 = _accountSubLedgerRepository.GetAll().Where(o => o.TenantId == AbpSession.TenantId
                && o.Id == input.VendorID
                && o.AccountID == input.VendorCtrlAc
                ).Count() > 0 ?
                    _accountSubLedgerRepository.GetAll().Where(o => o.TenantId == AbpSession.TenantId
                    && o.Id == input.VendorID
                    && o.AccountID == input.VendorCtrlAc).First().SubAccName :
                    "";

                if (totaladvadjust > 0)
                {
                    gltrdetailsList1.Add(new CreateOrEditGLTRDetailDto
                    {
                        Amount = totaladvadjust,
                        AccountID = input.VendorCtrlAc,
                        Narration = input.Narration,
                        SubAccID = input.VendorID,
                        LocId = input.GLLOCID.Value,
                        IsAuto = false
                    });
                }
                if (!string.IsNullOrWhiteSpace(input.BAccountID))
                {
                    gltrdetailsList1.Add(new CreateOrEditGLTRDetailDto
                    {
                        Amount = -totaladvadjust,
                        AccountID = input.LiabilityCtrlAc,
                        Narration = input.Narration,
                        SubAccID = input.VendorID,
                        LocId = input.GLLOCID.Value,
                        IsAuto = false
                    });
                }
            }



            VoucherEntryDto autoEntry1 = new VoucherEntryDto()
            {
                GLTRHeader = new CreateOrEditGLTRHeaderDto
                {
                    BookID = "JV",
                    NARRATION = input.Narration,
                    DocDate = input.DocDate.Value,
                    DocMonth = input.DocDate.Value.Month,
                    Approved = true,
                    AprovedBy = user,
                    AprovedDate = DateTime.Now,
                    Posted = false,
                    PostedBy = user,
                    PostedDate = DateTime.Now,
                    LocId = glinvHedaer.GLLOCID.Value,
                    CreatedBy = user,
                    CreatedOn = DateTime.Now,
                    AuditUser = user,
                    AuditTime = DateTime.Now,
                    CURID = currency.Id,
                    CURRATE = currency.CurrRate,
                    ConfigID = 0,
                    Reference = refrence,
                    Amount = Convert.ToDecimal(totaladvadjust),
                    FmtDocNo = _voucherEntryAppService.GetMaxDocId("JV", true, input.DocDate),
                    DocNo = _voucherEntryAppService.GetMaxDocId("JV", false, input.DocDate),
                   
                },
                GLTRDetail = gltrdetailsList1
            };

            if (autoEntry1.GLTRDetail.Count() > 0 && autoEntry1.GLTRHeader != null)
            {
                var voucher = _voucherEntryAppService.ProcessVoucherEntry(autoEntry1);

                glinvHedaer.Posted = true;
                glinvHedaer.PostedBy = user;
                glinvHedaer.PostedDate = DateTime.Now;
                glinvHedaer.LinkDetID = voucher[0].Id;
                var glinvh = _apinvknockhRepository.FirstOrDefault((int)glinvHedaer.Id);
                ObjectMapper.Map(glinvHedaer, glinvh);

                alertMsg = "Save";
            }
            else
            {
                alertMsg = "NoRecord";
            }


            return alertMsg;
        }
     
    }
}