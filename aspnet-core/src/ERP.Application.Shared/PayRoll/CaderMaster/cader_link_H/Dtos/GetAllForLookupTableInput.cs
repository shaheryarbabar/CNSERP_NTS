﻿using Abp.Application.Services.Dto;

namespace ERP.PayRoll.CaderMaster.cader_link_H.Dtos
{
    public class GetAllForLookupTableInput : PagedAndSortedResultRequestDto
    {
        public string Filter { get; set; }
    }
}