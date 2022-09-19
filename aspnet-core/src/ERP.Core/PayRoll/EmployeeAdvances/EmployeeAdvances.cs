﻿using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;
using Abp.Domain.Entities;

namespace ERP.PayRoll.EmployeeAdvances
{
    [Table("EmployeeAdvances")]
    public class EmployeeAdvances : Entity, IMustHaveTenant
    {
        public int TenantId { get; set; }


        [Required]
        public virtual int AdvanceID { get; set; }

        [Required]
        public virtual int EmployeeID { get; set; }

        [Required]
        public virtual string EmployeeName { get; set; }
        public virtual string Remarks { get; set; }

        [Required]
        public virtual short SalaryYear { get; set; }

        [Required]
        public virtual short SalaryMonth { get; set; }

        public virtual DateTime? AdvanceDate { get; set; }

        public virtual double? Amount { get; set; }

        public virtual bool Active { get; set; }
        public virtual bool Approved { get; set; }
        public virtual string ApprovedBy { get; set; }
        public virtual DateTime? ApprovedDate { get; set; }

        public virtual string AudtUser { get; set; }

        public virtual DateTime? AudtDate { get; set; }

        public virtual string CreatedBy { get; set; }

        public virtual DateTime? CreateDate { get; set; }

        public virtual bool? Posted { get; set; }
        public virtual string PostedBy { get; set; }
        public virtual DateTime? PostedDate { get; set; }


    }
}