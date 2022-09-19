using System;
using Abp.Application.Services.Dto;
using System.ComponentModel.DataAnnotations;

namespace ERP.AccountPayables.InvoiceKnock.APINVKNOCKH.Dtos
{
    public class GetAPINVKNOCKHForEditOutput
    {
        public CreateOrEditAPINVKNOCKHDto APINVKNOCKH { get; set; }

    }
}