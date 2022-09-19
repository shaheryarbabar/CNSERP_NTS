using Abp.Application.Services.Dto;
using System;

namespace ERP.AccountPayables.InvoiceKnock.APINVKNOCKD.Dtos
{
    public class GetAllAPINVKNOCKDInput : PagedAndSortedResultRequestDto
    {
        public string Filter { get; set; }

        public int? MaxDetIDFilter { get; set; }
        public int? MinDetIDFilter { get; set; }

        public int? MaxDocNoFilter { get; set; }
        public int? MinDocNoFilter { get; set; }

        public int? MaxGRNNoFilter { get; set; }
        public int? MinGRNNoFilter { get; set; }

        public string GRNDateFilter { get; set; }

        public int? MaxPONoFilter { get; set; }
        public int? MinPONoFilter { get; set; }

        public double? MaxAmountFilter { get; set; }
        public double? MinAmountFilter { get; set; }

        public double? MaxAlreadyPaidFilter { get; set; }
        public double? MinAlreadyPaidFilter { get; set; }

        public double? MaxPendingFilter { get; set; }
        public double? MinPendingFilter { get; set; }

        public double? MaxAdvAdjustFilter { get; set; }
        public double? MinAdvAdjustFilter { get; set; }

        public double? MaxGRNAdjustFilter { get; set; }
        public double? MinGRNAdjustFilter { get; set; }

    }
}