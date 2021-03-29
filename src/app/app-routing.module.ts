import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeesDetailComponent } from './employees-list/employees-detail.component';
import { EmployeesAddComponent } from './employees-create/employees-add.component';
import { EmployeesEditComponent } from './employees-update/employees-edit.component';

const routes: Routes = [
  {
    path: 'employees',
    component: EmployeesComponent,
    data: { title: 'List of Employees' }
  },
  {
    path: 'employees-list/:id',
    component: EmployeesDetailComponent,
    data: { title: 'Employee Details' }
  },
  {
    path: 'employees-create',
    component: EmployeesAddComponent,
    data: { title: 'Add Employee' }
  },
  {
    path: 'employees-update/:id',
    component: EmployeesEditComponent,
    data: { title: 'Edit Employee' }
  },
  { path: '',
    redirectTo: '/employees',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
