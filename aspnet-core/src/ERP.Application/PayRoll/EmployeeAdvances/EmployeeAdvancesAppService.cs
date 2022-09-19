

using System;
using System.Linq;
using System.Linq.Dynamic.Core;
using Abp.Linq.Extensions;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using ERP.PayRoll.EmployeeAdvances.Exporting;
using ERP.PayRoll.EmployeeAdvances.Dtos;
using ERP.Dto;
using Abp.Application.Services.Dto;
using ERP.Authorization;
using Abp.Extensions;
using Abp.Authorization;
using Microsoft.EntityFrameworkCore;
using ERP.SupplyChain.Inventory;
using ERP.Authorization.Users;
using Microsoft.AspNetCore.Mvc;
using ERP.GeneralLedger.Transaction.VoucherEntry.GLTRD.Dtos;
using ERP.GeneralLedger.Transaction.VoucherEntry.Dtos;
using ERP.GeneralLedger.Transaction.VoucherEntry.GLTRH.Dtos;
using ERP.GeneralLedger.Transaction.VoucherEntry;

namespace ERP.PayRoll.EmployeeAdvances
{
    [AbpAuthorize(AppPermissions.PayRoll_EmployeeAdvances)]
    public class EmployeeAdvancesAppService : ERPAppServiceBase, IEmployeeAdvancesAppService
    {
        private readonly IRepository<EmployeeAdvances> _EmployeeAdvancesRepository;
        private readonly IRepository<EmployeeSalary.EmployeeSalary> _EmployeeSalary;
        private readonly IEmployeeAdvancesExcelExporter _EmployeeAdvancesExcelExporter;
        private readonly CommonAppService _commonappRepository;
        private readonly IRepository<User, long> _userRepository;
        private VoucherEntryAppService _voucherEntryAppService;
        private readonly IRepository<hrmSetup.HrmSetup> _hrmsetupRepository;
        public EmployeeAdvancesAppService(IRepository<EmployeeAdvances> EmployeeAdvancesRepository, VoucherEntryAppService voucherEntryAppService, IRepository<hrmSetup.HrmSetup> hrmsetupRepository,
            IEmployeeAdvancesExcelExporter EmployeeAdvancesExcelExporter, IRepository<User, long> userRepository, CommonAppService commonappRepository, IRepository<EmployeeSalary.EmployeeSalary> EmployeeSalary)
        {
            _EmployeeAdvancesRepository = EmployeeAdvancesRepository;
            _EmployeeAdvancesExcelExporter = EmployeeAdvancesExcelExporter;
            _EmployeeSalary = EmployeeSalary;
            _userRepository = userRepository;
            _commonappRepository = commonappRepository;
            _voucherEntryAppService = voucherEntryAppService;
            _hrmsetupRepository = hrmsetupRepository;

        }

        public async Task<PagedResultDto<GetEmployeeAdvancesForViewDto>> GetAll(GetAllEmployeeAdvancesInput input)
        {

            var filteredEmployeeAdvances = _EmployeeAdvancesRepository.GetAll()
                        .WhereIf(!string.IsNullOrWhiteSpace(input.Filter), e => false || e.AudtUser.Contains(input.Filter) || e.CreatedBy.Contains(input.Filter));
                      

            var pagedAndFilteredEmployeeAdvances = filteredEmployeeAdvances
                .OrderBy(input.Sorting ?? "id desc")
                .PageBy(input);

            var EmployeeAdvances = from o in pagedAndFilteredEmployeeAdvances
                                     select new GetEmployeeAdvancesForViewDto()
                                     {
                                         EmployeeAdvances = new EmployeeAdvancesDto
                                         {
                                             AdvanceID = o.AdvanceID,
                                             EmployeeID = o.EmployeeID,
                                             EmployeeName = o.EmployeeName,
                                             SalaryYear = o.SalaryYear,
                                             SalaryMonth = o.SalaryMonth,
                                             AdvanceDate = o.AdvanceDate,
                                             Amount = o.Amount,
                                             Active = o.Active,
                                             Remarks = o.Remarks,
                                             AudtUser = o.AudtUser,
                                             AudtDate = o.AudtDate,
                                             CreatedBy = o.CreatedBy,
                                             CreateDate = o.CreateDate,
                                             Id = o.Id
                                         }
                                     };

            var totalCount = await filteredEmployeeAdvances.CountAsync();

            return new PagedResultDto<GetEmployeeAdvancesForViewDto>(
                totalCount,
                await EmployeeAdvances.ToListAsync()
            );
        }

        [AbpAuthorize(AppPermissions.PayRoll_EmployeeAdvances_Edit)]
        public async Task<GetEmployeeAdvancesForEditOutput> GetEmployeeAdvancesForEdit(EntityDto input)
        {
            var EmployeeAdvances = await _EmployeeAdvancesRepository.FirstOrDefaultAsync(input.Id);

            var output = new GetEmployeeAdvancesForEditOutput { EmployeeAdvances = ObjectMapper.Map<CreateOrEditEmployeeAdvancesDto>(EmployeeAdvances) };

            return output;
        }

        public async Task CreateOrEdit(CreateOrEditEmployeeAdvancesDto input)
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

        [AbpAuthorize(AppPermissions.PayRoll_EmployeeAdvances_Create)]
        protected virtual async Task Create(CreateOrEditEmployeeAdvancesDto input)
        {
            var EmployeeAdvances = ObjectMapper.Map<EmployeeAdvances>(input);


            if (AbpSession.TenantId != null)
            {
                EmployeeAdvances.TenantId = (int)AbpSession.TenantId;
            }

            EmployeeAdvances.AdvanceID = GetMaxID();

            await _EmployeeAdvancesRepository.InsertAsync(EmployeeAdvances);
        }

        [AbpAuthorize(AppPermissions.PayRoll_EmployeeAdvances_Edit)]
        protected virtual async Task Update(CreateOrEditEmployeeAdvancesDto input)
        {
            var EmployeeAdvances = await _EmployeeAdvancesRepository.FirstOrDefaultAsync((int)input.Id);
            if (input.TenantID==0)
            {
                input.TenantID = Convert.ToInt32(AbpSession.TenantId);
            }
            ObjectMapper.Map(input, EmployeeAdvances);
        }

        [AbpAuthorize(AppPermissions.PayRoll_EmployeeAdvances_Delete)]
        public async Task Delete(EntityDto input)
        {
            DeleteLog(input.Id);
            await _EmployeeAdvancesRepository.DeleteAsync(input.Id);
        }
        public void DeleteLog(int detid)
        {
            var data = _EmployeeAdvancesRepository.FirstOrDefault(c => c.Id == detid);
            LogModel model = new LogModel()
            {
                Action = "Delete",
                Detid = detid,
                DocNo = data.AdvanceID,
                FormName = "Advance",
                Status = true,
                ApprovedBy = _userRepository.GetAll().Where(o => o.Id == AbpSession.UserId).SingleOrDefault().UserName,
                TenantId = AbpSession.TenantId
            };
            _commonappRepository.ApproveLog(model);
        }
        public async Task<FileDto> GetEmployeeAdvancesToExcel(GetAllEmployeeAdvancesForExcelInput input)
        {

            var filteredEmployeeAdvances = _EmployeeAdvancesRepository.GetAll()
                        .WhereIf(!string.IsNullOrWhiteSpace(input.Filter), e => false || e.AudtUser.Contains(input.Filter) || e.CreatedBy.Contains(input.Filter));

            var query = (from o in filteredEmployeeAdvances
                         select new GetEmployeeAdvancesForViewDto()
                         {
                             EmployeeAdvances = new EmployeeAdvancesDto
                             {
                                 AdvanceID = o.AdvanceID,
                                 EmployeeID = o.EmployeeID,
                                 EmployeeName = o.EmployeeName,
                                 SalaryYear = o.SalaryYear,
                                 SalaryMonth = o.SalaryMonth,
                                 AdvanceDate = o.AdvanceDate,
                                 Amount = o.Amount,
                                 Active = o.Active,
                                 AudtUser = o.AudtUser,
                                 AudtDate = o.AudtDate,
                                 CreatedBy = o.CreatedBy,
                                 CreateDate = o.CreateDate,
                                 Id = o.Id
                             }
                         });


            var EmployeeAdvancesListDtos = await query.ToListAsync();

            return _EmployeeAdvancesExcelExporter.ExportToFile(EmployeeAdvancesListDtos);
        }
        public int GetMaxID()
        {
            var maxid = ((from tab1 in _EmployeeAdvancesRepository.GetAll().Where(o => o.TenantId == AbpSession.TenantId) select (int?)tab1.AdvanceID).Max() ?? 0) + 1;
            return maxid;
        }

        public bool GetIsValidAmount(int advanceAmount, int EmpID)
        {
            var salary = _EmployeeSalary.FirstOrDefault(x => x.EmployeeID == EmpID && x.TenantId == AbpSession.TenantId).Gross_Salary;

            return advanceAmount <= salary;
        }


        [HttpGet]
        public void statusAdvance(int Id, int stat)
        {
            try
            {

                var DocNo = 0;

                if (stat == 0)
                {
                    (from a in _EmployeeAdvancesRepository.GetAll().Where(o => o.TenantId == AbpSession.TenantId && o.Id == Id)
                     select a).ToList().ForEach(x =>
                     {
                         
                         x.Approved = false;
                         x.ApprovedDate = DateTime.Now;
                         x.ApprovedBy = _userRepository.GetAll().Where(o => o.Id == AbpSession.UserId).SingleOrDefault().UserName;
                         DocNo = x.AdvanceID;
                     });

                }
                else
                {
                    (from a in _EmployeeAdvancesRepository.GetAll().Where(o => o.TenantId == AbpSession.TenantId && o.Id == Id)
                     select a).ToList().ForEach(x =>
                     {
                         x.Approved = true;
                         x.ApprovedDate = DateTime.Now;
                         x.ApprovedBy = _userRepository.GetAll().Where(o => o.Id == AbpSession.UserId).SingleOrDefault().UserName;
                         DocNo = x.AdvanceID;
                     });
                }
                LogModel Log = new LogModel()
                {
                    Status = stat == 1 ? true : false,
                    ApprovedBy = _userRepository.GetAll().Where(o => o.Id == AbpSession.UserId).SingleOrDefault().UserName,
                    Detid = Id,
                    DocNo = DocNo,
                    FormName = "Advance",
                    Action = stat == 1 ? "Approval" : "UnApproval",
                    TenantId = AbpSession.TenantId
                };
                _commonappRepository.ApproveLog(Log);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        [HttpGet]
        public string ProcessAdvance(int Id)
        {
            var alertMsg = "";
            var currency = _voucherEntryAppService.GetBaseCurrency();
            var user = _userRepository.GetAll().Where(o => o.Id == AbpSession.UserId).SingleOrDefault().UserName;
            var empAdvance = _EmployeeAdvancesRepository.GetAll().Where(c => c.Id == Id && c.TenantId == AbpSession.TenantId).FirstOrDefault();
            if (empAdvance != null)
            {
                var hrmsetup = _hrmsetupRepository.GetAll().Where(c => c.TenantId == AbpSession.TenantId).FirstOrDefault();
                if (hrmsetup != null)
                {
                    List<CreateOrEditGLTRDetailDto> gltrdetailsList = new List<CreateOrEditGLTRDetailDto>();
                    gltrdetailsList.Add(new CreateOrEditGLTRDetailDto
                    {
                        Amount = -empAdvance.Amount,
                        AccountID = hrmsetup.AdvToPayable,
                        Narration = empAdvance.Remarks,
                        SubAccID = 0,
                        LocId = 2,
                        IsAuto = false
                    });

                    gltrdetailsList.Add(new CreateOrEditGLTRDetailDto
                    {
                        Amount = empAdvance.Amount,
                        AccountID = hrmsetup.AdvToStSal,
                        Narration = empAdvance.Remarks,
                        SubAccID = empAdvance.EmployeeID,
                        LocId = 2,
                        IsAuto = false
                    });
                    VoucherEntryDto autoEntry = new VoucherEntryDto()
                    {
                        GLTRHeader = new CreateOrEditGLTRHeaderDto
                        {
                            BookID = "JV",
                            NARRATION = empAdvance.Remarks,
                            DocDate = Convert.ToDateTime(empAdvance.AdvanceDate),
                            DocMonth = Convert.ToDateTime(empAdvance.AdvanceDate).Month,
                            Approved = true,
                            AprovedBy = user,
                            AprovedDate = DateTime.Now,
                            Posted = false,
                            LocId = 2,
                            CreatedBy = user,
                            CreatedOn = DateTime.Now,
                            AuditUser = user,
                            AuditTime = DateTime.Now,
                            CURID = currency.Id,
                            CURRATE = currency.CurrRate,
                            ConfigID = 0
                        },
                        GLTRDetail = gltrdetailsList
                    };

                    if (autoEntry.GLTRDetail.Count() > 0 && autoEntry.GLTRHeader != null)
                    {
                        var voucher = _voucherEntryAppService.ProcessVoucherEntry(autoEntry);
                        empAdvance.Posted = true;
                        empAdvance.PostedBy = user;
                        empAdvance.PostedDate = DateTime.Now;

                        var transh = _EmployeeAdvancesRepository.FirstOrDefault((int)empAdvance.Id);

                        ObjectMapper.Map(empAdvance, transh);

                        alertMsg = "Save";
                    }
                    else
                    {
                        alertMsg = "NoRecord";
                    }
                }
                else
                {
                    alertMsg = "NoAccount";
                }
            }
            return alertMsg;
        }

    }
}