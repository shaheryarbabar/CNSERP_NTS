using System;
using Abp.Application.Services.Dto;
using System.ComponentModel.DataAnnotations;

namespace ERP.SupplyChain.Sales.SaleTerm.OETerms.Dtos
{
    public class GetOETermsForEditOutput
    {
        public CreateOrEditOETermsDto OETerms { get; set; }

    }
}