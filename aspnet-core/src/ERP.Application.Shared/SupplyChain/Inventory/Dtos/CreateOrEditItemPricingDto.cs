
using System;
using Abp.Application.Services.Dto;
using System.ComponentModel.DataAnnotations;

namespace ERP.SupplyChain.Inventory.Dtos
{
    public class CreateOrEditItemPricingDto : EntityDto<int?>
    {
        public string DocDate { get; set; }

        [Required]
		public string PriceList { get; set; }
        public string PriceListDesc { get; set; }

        [Required]
		public string ItemID { get; set; }

        public string ItemDesc { get; set; }
        //public string priceType { get; set; }


        public decimal? Price { get; set; }
		
		
		public double? DiscValue { get; set; }
		
		
		public decimal? NetPrice { get; set; }
		
		
		public bool Active { get; set; }
		
		
		public string AudtUser { get; set; }
		
		
		public string AudtDate { get; set; }
		
		
		public string CreatedBy { get; set; }
		
		
		public string CreateDate { get; set; }
		
		

    }
}