using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;
using Abp.Domain.Entities;

namespace ERP.GeneralLedger.SetupForms.LCExpensesHD
{
    [Table("GLLCH")]
    public class LCExpensesHeader : Entity, IMustHaveTenant
    {
        public int TenantId { get; set; }

        [Required]
        public virtual int LocID { get; set; }
        [Required]
        public virtual int DocNo { get; set; }
        public virtual DateTime? DocDate { get; set; }
        public virtual string TypeID { get; set; }
        public virtual string AccountID { get; set; }
        public virtual int? SubAccID { get; set; }
        public virtual string LCNumber { get; set; }
        public virtual string PayableAccID { get; set; }
        public virtual int PayableSL { get; set; }
        public virtual string PayableSLName { get; set; }
        public virtual bool Active { get; set; }
        public virtual string AudtUser { get; set; }
        public virtual DateTime? AudtDate { get; set; }
        public virtual string CreatedBy { get; set; }
        public virtual DateTime? CreateDate { get; set; }
        public virtual int? LinkDetID { get; set; }
        public virtual bool? Posted { get; set; }

        public virtual string Narration { get; set; }
        public virtual string CurId { get; set; }
        public virtual string BankId { get; set; }
        public virtual string ConsigneeName { get; set; }
        public virtual string ConsigneeBank { get; set; }
        public virtual string Vessel { get; set; }
        public virtual string Remarks { get; set; }
        public decimal? TotalPkg { get; set; }
        public decimal? TotalWgt { get; set; }
        public DateTime? ShipDate { get; set; }
        public int? Days { get; set; }
    }
}
