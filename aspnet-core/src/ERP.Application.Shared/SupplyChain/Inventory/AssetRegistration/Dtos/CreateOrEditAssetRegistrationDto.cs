﻿
using System;
using Abp.Application.Services.Dto;
using System.ComponentModel.DataAnnotations;

namespace ERP.SupplyChain.Inventory.AssetRegistration.Dtos
{
    public class CreateOrEditAssetRegistrationDto : EntityDto<int?>
    {

		public int? AssetID { get; set; }
		
		
		public string FmtAssetID { get; set; }
		
		
		public string AssetName { get; set; }
		
		
		public string ItemID { get; set; }
		
		
		public int? LocID { get; set; }
		
		
		public string RegDate { get; set; }
		
		
		public string PurchaseDate { get; set; }
		
		
		public string ExpiryDate { get; set; }
		
		
		public bool Warranty { get; set; }
		
		
		public short? AssetType { get; set; }
		
		
		public decimal? DepRate { get; set; }
		
		
		public short? DepMethod { get; set; }
		
		
		public string SerialNumber { get; set; }
		
		
		public decimal? PurchasePrice { get; set; }
		
		
		public string Narration { get; set; }
		
		
		public string AccAsset { get; set; }
		
		
		public string AccDepr { get; set; }
		
		
		public string AccExp { get; set; }
		
		
		public string DepStartDate { get; set; }
		
		
		public decimal? AssetLife { get; set; }
		
		
		public decimal? BookValue { get; set; }
		
		
		public decimal? LastDepAmount { get; set; }
		
		
		public string LastDepDate { get; set; }
		
		
		public bool Disolved { get; set; }
		
		
		public short? Active { get; set; }
		
		
		public string AudtUser { get; set; }
		
		
		public string AudtDate { get; set; }
		
		
		public string CreatedBy { get; set; }
		
		
		public string CreateDate { get; set; }

        public decimal? AccumulatedDepAmt { get; set; }
        public bool? Finance { get; set; }

        public bool? Insurance { get; set; }
        public int? RefID { get; set; }

        public CreateOrEditAssetRegistrationDetailDto createAssetRegistrationDetail { get; set; }


    }
}