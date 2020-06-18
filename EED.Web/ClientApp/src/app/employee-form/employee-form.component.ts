import { Component, OnInit } from '@angular/core';
import { EmployeeService, Employee } from '../services';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html'
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup;  
  employeeId?: string;
  private employee: Employee;

  ngOnInit() {
    if (!this.employee) {
      this.employee = <Employee>{};
      this.buildForm();
    }    
  }

  constructor(public fb: FormBuilder, private readonly route: ActivatedRoute, private readonly router: Router, private readonly employeeService: EmployeeService) {
    this.route.paramMap.subscribe(paramMap => {
      this.employeeId = paramMap.get('employeeId');
    });
    
    this.employeeService.getById(Number.parseInt(this.employeeId)).subscribe(result => {
      this.employee = result;
      this.buildForm();
    }, error => console.error(error));
    
  }

  private buildForm() {
    this.employeeForm = this.fb.group({
      firstName: [this.employee!.firstName],
      lastName: [this.employee!.lastName],
      age: [this.employee!.age],
      currentSalary: [this.employee!.currentSalary]
    });
  }

  submitForm() {
    if (this.employeeId) {

      this.employeeService.update(this.employeeId, this.employeeForm.value).subscribe(res => {
        this.router.navigateByUrl('/employees');
      });
    }
    else {
      this.employeeService.create(this.employeeForm.value).subscribe(res => {
        this.router.navigateByUrl('/employees/details/' + res.id);
      });
    }
    
  }

  deleteEmployee() {
    this.employeeService.delete(this.employeeId).subscribe(res => {
      this.router.navigateByUrl('/employees');
    });
  }
}
