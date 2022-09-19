﻿
using System;
using Abp.Application.Services.Dto;
using System.ComponentModel.DataAnnotations;

namespace ERP.SupplyChain.Purchase.ReceiptEntry.Dtos
{
    public class CreateOrEditPORECHeaderDto : EntityDto<int>
    {

		[Required]
		public int LocID { get; set; }
		
		
		[Required]
		public int DocNo { get; set; }
		
		
		public string DocDate { get; set; }
		
		
		public string AccountID { get; set; }
		
		
		public int? SubAccID { get; set; }
		
		
		public string Narration { get; set; }
		
		
		public string IGPNo { get; set; }
		
		
		public string BillNo { get; set; }
		
		
		public string BillDate { get; set; }
		
		
		public double? BillAmt { get; set; }
		
		
		public double? TotalQty { get; set; }
		
		
		public double? TotalAmt { get; set; }
		
		
		public bool Posted { get; set; }

        public string PostedBy { get; set; }

        public string PostedDate { get; set; }

        public bool? Approved { get; set; }

        public string ApprovedBy { get; set; }

        public string ApprovedDate { get; set; }


        public int? LinkDetID { get; set; }
		
		
		public int? PODocNo { get; set; }
		
		
		public string OrdNo { get; set; }
		
		
		public int? RecDocNo { get; set; }
		
		
		public double? Freight { get; set; }
		
		
		public double? AddExp { get; set; }
		
		
		public string CCID { get; set; }
		
		
		public double? AddDisc { get; set; }
		
		
		public double? AddLeak { get; set; }
		
		
		public double? AddFreight { get; set; }
		
		
		public bool? onHold { get; set; }
		
		
		public bool? Active { get; set; }
		
		
		public string AudtUser { get; set; }
		
		
		public string AudtDate { get; set; }
		
		
		public string CreatedBy { get; set; }
		
		
		public string CreateDate { get; set; }
		
		

    }
}