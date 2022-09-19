﻿using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ERP.PayRoll.Grades.Dtos
{
    public class CreateOrEditGradeDto: EntityDto<int?>
    {
        [Required]
        public int GradeID { get; set; }

        [Required]
        public string GradeName { get; set; }

        [Required]
        public int Type { get; set; }

        public bool Active { get; set; }

        public string AudtUser { get; set; }

        public DateTime? AudtDate { get; set; }

        public string CreatedBy { get; set; }

        public DateTime? CreateDate { get; set; }
    }
}
