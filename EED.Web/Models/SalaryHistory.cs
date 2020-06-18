using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EED.Web.Models
{
    public class SalaryHistory
    {
        public int Id { get; set; }
        [Required]
        public int EmployeeId { get; set; }
        [ForeignKey("EmployeeId")]
        public Employee Employee { get; set; }
        [Required]
        public decimal PreviousSalary { get; set; }
        [Required]
        public DateTime Date { get; set; }
    }
}
