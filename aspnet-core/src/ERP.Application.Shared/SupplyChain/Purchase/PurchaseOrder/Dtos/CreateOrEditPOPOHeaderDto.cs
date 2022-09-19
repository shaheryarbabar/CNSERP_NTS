﻿
using System;
using Abp.Application.Services.Dto;
using System.ComponentModel.DataAnnotations;

namespace ERP.SupplyChain.Purchase.PurchaseOrder.Dtos
{
    public class CreateOrEditPOPOHeaderDto : EntityDto<int?>
    {

		[Required]
		public int LocID { get; set; }
		
		
		[Required]
		public int DocNo { get; set; }
		
		
		public string DocDate { get; set; }
		
		
		public string ArrivalDate { get; set; }
		
		
		public int? ReqNo { get; set; }
		
		
		public string AccountID { get; set; }
		
		
		public int? SubAccID { get; set; }
		
		
		public double? TotalQty { get; set; }
		
		
		public double? TotalAmt { get; set; }
		
		
		public string OrdNo { get; set; }
		
		
		public string CCID { get; set; }
		
		
		public string Narration { get; set; }
		
		
		public int? WHTermID { get; set; }
		
		
		public double? WHRate { get; set; }
		
		
		public string TaxAuth { get; set; }
		
		
		public int? TaxClass { get; set; }
		
		
		public double? TaxRate { get; set; }
		
		
		public double? TaxAmount { get; set; }
		
		
		public bool onHold { get; set; }
		
		
		public bool Active { get; set; }

        public bool Completed { get; set; }
		
		
		public string AudtUser { get; set; }
		
		
		public string AudtDate { get; set; }
		
		
		public string CreatedBy { get; set; }
		
		
		public string CreateDate { get; set; }

        public string Terms { get; set; }
        public virtual bool Approved { get; set; }
      

    }
}