import { Component } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../services/contracts';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html'
})
export class EmployeeListComponent {
  public employees: Employee[];

  constructor(private readonly employeeService: EmployeeService) {
    this.employeeService.getAll().subscribe(result => {
      this.employees = result;
    }, error => console.error(error));
  }
}
