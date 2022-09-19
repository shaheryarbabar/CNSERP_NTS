﻿using Abp.Application.Services;
using ERP.Reports.PayRoll.Dtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace ERP.Reports.PayRoll
{
    public interface IDepartmentListingAppService : IApplicationService
    {
        List<DepartmentListingDto> GetData(int? TenantId, string fromCode, string toCode, string description);
    }
}
