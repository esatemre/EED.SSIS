using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EED.Web.Models
{
    public class Employee
    {
        public int Id { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public byte Age { get; set; }
        [Column(TypeName = "decimal(8,2)")]
        [Required]
        public decimal CurrentSalary { get; set; }
        [Required]
        public DateTime CreatedAt { get; set; }
        public DateTime? ModifiedAt { get; set; }
        [Required]
        public bool IsDeleted { get; set; }

        [InverseProperty("Employee")]
        public List<SalaryHistory> SalaryHistory { get; set; }

        public Employee()
        {
            CreatedAt = DateTime.UtcNow;
            IsDeleted = false;
        }
    }
}
