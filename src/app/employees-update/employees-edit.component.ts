import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Employee } from '../employee';

@Component({
  selector: 'app-employees-edit',
  templateUrl: './employees-edit.component.html',
  styleUrls: ['./employees-edit.component.scss']
})
export class EmployeesEditComponent implements OnInit {

  employeeForm: FormGroup;
  _id:number=null;
  FirstName:string='';
  LastName:string='';
  Gender:string='';
  Salary:number=null;
  isLoadingResults = false;

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getEmployee(this.route.snapshot.params['id']);
    this.employeeForm = this.formBuilder.group({
      'FirstName' : [null, Validators.required],
      'LastName' : [null, Validators.required],
      'Gender' : [null, Validators.required],
      'Salary' : [null, Validators.required]
    });
  }

  getEmployee(id: number) {
    this.api.getEmployee(id)
    .subscribe(data => {
      this._id = data[0].id;
      this.employeeForm.setValue({
        FirstName: data[0].firstName,
        LastName: data[0].lastName,
        Gender: data[0].gender,
        Salary: data[0].salary
      });
    });
  }

  onFormSubmit(form:NgForm) {
    this.isLoadingResults = true;
    this.api.updateEmployee(this._id, form)
      .subscribe(res => {
          let id = res[0].id;
          console.log("_id " + id);
          this.isLoadingResults = false;
          this.router.navigate(['/employees-list', id]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  employeeDetalis () {
    this.router.navigate(['/employees-list', this._id]);
  }

}
