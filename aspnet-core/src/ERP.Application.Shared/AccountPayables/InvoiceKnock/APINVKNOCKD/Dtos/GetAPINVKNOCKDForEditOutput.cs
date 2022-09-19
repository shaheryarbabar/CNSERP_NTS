using System;
using Abp.Application.Services.Dto;
using System.ComponentModel.DataAnnotations;

namespace ERP.AccountPayables.InvoiceKnock.APINVKNOCKD.Dtos
{
    public class GetAPINVKNOCKDForEditOutput
    {
        public CreateOrEditAPINVKNOCKDDto APINVKNOCKD { get; set; }

    }
}