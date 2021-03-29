import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from  '@angular/forms';

@Component({
  selector: 'app-employees-add',
  templateUrl: './employees-add.component.html',
  styleUrls: ['./employees-add.component.scss']
})
export class EmployeesAddComponent implements OnInit {

  employeeForm: FormGroup;
  firstName:string='';
  lastName:string='';
  gender:string='';
  salary:number=null;
  isLoadingResults = false;

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.employeeForm = this.formBuilder.group({
      'firstName' : [null, Validators.required],
      'lastName' : [null, Validators.required],
      'gender' : [null, Validators.required],
      'salary' : [null, Validators.required]
    })
  }

  onFormSubmit(form:NgForm) {
    this.isLoadingResults = true;
    this.api.addEmployee(form)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/employees']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }  

}
