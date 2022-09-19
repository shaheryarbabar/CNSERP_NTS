﻿
using System;
using Abp.Application.Services.Dto;

namespace ERP.SupplyChain.Purchase.PurchaseOrder.Dtos
{
    public class POPODetailDto : EntityDto
    {
		public int DetID { get; set; }

		public int LocID { get; set; }

		public int DocNo { get; set; }

		public string ItemID { get; set; }

		public string ItemDesc { get; set; }

		public string Unit { get; set; }

		public double? Conver { get; set; }

		public double? Qty { get; set; }

		public double? Rate { get; set; }

		public double? Amount { get; set; }

		public string TaxAuth { get; set; }

		public int? TaxClass { get; set; }

		public string TaxClassDesc { get; set; }

		public double? TaxRate { get; set; }

		public double? TaxAmt { get; set; }

		public string Remarks { get; set; }
		public bool? PoDocNo { get; set; }

		public double? NetAmount { get; set; }
        public int? TransType { get; set; }



    }
}