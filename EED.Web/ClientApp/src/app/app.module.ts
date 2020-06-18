import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { EmployeeService } from './services/employee.service';
import { EmployeeListComponent } from './employee/employee-list.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    EmployeeListComponent,
    EmployeeFormComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'employees', component: EmployeeListComponent },
      { path: 'employees/details/:employeeId', component: EmployeeFormComponent },
      { path: 'employees/create', component: EmployeeFormComponent  },
    ])
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
