﻿
using System;
using Abp.Application.Services.Dto;

namespace ERP.SupplyChain.Inventory.ICOPT4.Dtos
{
    public class ICOPT4Dto : EntityDto
    {
		public int OptID { get; set; }

		public string Descp { get; set; }

		public bool Active { get; set; }

		public string AudtUser { get; set; }

		public DateTime? AudtDate { get; set; }

		public string CreatedBy { get; set; }

		public DateTime? CreateDate { get; set; }



    }
}