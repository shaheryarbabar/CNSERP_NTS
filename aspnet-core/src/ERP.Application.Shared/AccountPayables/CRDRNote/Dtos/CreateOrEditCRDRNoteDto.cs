
using System;
using Abp.Application.Services.Dto;
using System.ComponentModel.DataAnnotations;

namespace ERP.AccountPayables.CRDRNote.Dtos
{
    public class CreateOrEditCRDRNoteDto : EntityDto<int?>
    {

        [Required]
        public int LocID { get; set; }

        [Required]
        public int DocNo { get; set; }

        public string DocDate { get; set; }

        public string PostingDate { get; set; }
        public string PaymentDate { get; set; }

        public short? TypeID { get; set; }

        public string TransType { get; set; }

        public string AccountID { get; set; }

        public int? SubAccID { get; set; }

        public int? InvoiceNo { get; set; }

        public string PartyInvNo { get; set; }
        public string PartyInvDate { get; set; }
        public double? PartyInvAmount { get; set; }
        public double? Amount { get; set; }

        public string Reason { get; set; }
        public string StkAccID { get; set; }

        public bool Posted { get; set; }

        public int? LinkDetID { get; set; }

        public bool Active { get; set; }

        public string AudtUser { get; set; }

        public string AudtDate { get; set; }

        public string CreatedBy { get; set; }

        public string CreateDate { get; set; }


    }
}