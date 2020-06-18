using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EED.Web.Data;
using EED.Web.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace EED.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EmployeeController : ControllerBase
    {
        private readonly ILogger<EmployeeController> _logger;
        private readonly EmployeeContext _dbContext;

        public EmployeeController(ILogger<EmployeeController> logger, EmployeeContext dbContext)
        {
            _logger = logger;
            _dbContext = dbContext;
        }

        // GET: api/employee
        [HttpGet]
        public IEnumerable<Employee> Get()
        {
            return _dbContext.Employees.Where(p => !p.IsDeleted).ToList();
        }

        // GET: api/employee/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAsync([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var employee = await _dbContext.Employees.SingleOrDefaultAsync(m => m.Id == id && !m.IsDeleted);

            if (employee == null)
            {
                return NotFound();
            }

            return Ok(employee);
        }

        // PUT: api/employee/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee([FromRoute] int id, [FromBody] Employee employee)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            employee.Id = id;
            employee.ModifiedAt = DateTime.UtcNow;
            _dbContext.Entry(employee).State = EntityState.Modified;

            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/employee
        [HttpPost]
        public async Task<IActionResult> PostEmployee([FromBody] Employee employee)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _dbContext.Employees.Add(employee);
            await _dbContext.SaveChangesAsync();

            return CreatedAtAction("GetEmployee", new { id = employee.Id }, employee);
        }

        // DELETE: api/employee/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var employee = await _dbContext.Employees.SingleOrDefaultAsync(m => m.Id == id);
            if (employee == null)
            {
                return NotFound();
            }

            employee.ModifiedAt = DateTime.UtcNow;
            employee.IsDeleted = true;
            _dbContext.Entry(employee).State = EntityState.Modified;

            await _dbContext.SaveChangesAsync();

            return Ok(employee);
        }

        private bool EmployeeExists(int id)
        {
            return _dbContext.Employees.Any(e => e.Id == id);
        }
    }
}
