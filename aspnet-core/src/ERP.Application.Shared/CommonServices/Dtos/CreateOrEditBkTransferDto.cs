
using System;
using Abp.Application.Services.Dto;
using System.ComponentModel.DataAnnotations;

namespace ERP.CommonServices.Dtos
{
    public class CreateOrEditBkTransferDto : EntityDto<int?>
    {

		public string CMPID { get; set; }
		
		
		[Required]
		public int DOCID { get; set; }
		
		
		[Required]
		public DateTime DOCDATE { get; set; }
		
		
		[Required]
		public DateTime TRANSFERDATE { get; set; }
		
		
		public string DESCRIPTION { get; set; }
		
		
		public int? FROMBANKID { get; set; }
		
		
		public int? FROMCONFIGID { get; set; }
		
		
		public int? TOBANKID { get; set; }
		
		
		public int? TOCONFIGID { get; set; }
		
		
		public double? AVAILLIMIT { get; set; }
		
		
		public double? TRANSFERAMOUNT { get; set; }
		
		
		public DateTime? AUDTDATE { get; set; }
		
		
		public string AUDTUSER { get; set; }
		
		
		 public int BankId { get; set; }


        public bool STATUS { get; set; }

        public int? GLLINKID { get; set; }

        public int? GLDOCID { get; set; }

        public string CHNUMBER { get; set; }

        public string CHBOOK { get; set; }

    }
}