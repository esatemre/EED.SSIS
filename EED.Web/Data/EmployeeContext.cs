using EED.Web.Models;
using Microsoft.EntityFrameworkCore;

namespace EED.Web.Data
{
    public class EmployeeContext : DbContext
    {
        public EmployeeContext(DbContextOptions<EmployeeContext> options)
            : base(options)
        {
        }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<SalaryHistory> SalaryHistories { get; set; }
    }
}
