
using System;
using Abp.Application.Services.Dto;
using System.ComponentModel.DataAnnotations;

namespace ERP.PayRoll.EmployeeAdvances.Dtos
{
    public class CreateOrEditEmployeeAdvancesDto : EntityDto<int?>
    {
        public int TenantID { get; set; }

        [Required]
		public int AdvanceID { get; set; }

		[Required]
		public int EmployeeID { get; set; }

        [Required]
		public string EmployeeName { get; set; }
		public string Remarks { get; set; }
		[Required]
		public short SalaryYear { get; set; }
		[Required]
		public short SalaryMonth { get; set; }	
		public string AdvanceDate { get; set; }
		public double? Amount { get; set; }
		public bool Active { get; set; }
        public virtual bool? Approved { get; set; }
        public virtual string ApprovedBy { get; set; }
        public virtual string ApprovedDate { get; set; }
        public string AudtUser { get; set; }	
		public string AudtDate { get; set; }
		public string CreatedBy { get; set; }	
		public string CreateDate { get; set; }
        public virtual bool? Posted { get; set; }
        public virtual string PostedBy { get; set; }
        public virtual string PostedDate { get; set; }



    }
}