import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';

import { AddMultiComponent } from './add-multi/add-multi.component';
import { AngularFileUploaderComponent } from 'angular-file-uploader';
import { Employee } from '../../Models/Employee';
import { EmployeeService } from '../../Services/Employee/EmployeeService';
import { HttpClient } from '@angular/common/http';
import { LocationPhoneService } from '../../Services/address/location-phone.service';
import { Nationality } from '../../Models/Nationality';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { ValueTransformer } from '@angular/compiler/src/util';

@Component({
  selector: 'exec-epp-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {

  validateForm!: FormGroup;
  listOfOption: string[] = ["male","female"];
  employee !: Employee;
  multiEmail = false;
  multiPhone = false;
  multiNational = false;

  fileName = "";

  employeeNumber="";
  personalEmail ="";
  personalEmail2="sample1@gmail.com" ;
  personalEmail3="sample1@gmail.com";
  firstName="";
  fatherName="";
  grandFatherName="";
  phoneNumber="";
  phoneNumber2="+111111111";
  phoneNumber3="+222222222";
  dateofBirth = new Date("2021-11-17 14:29:03.107");
  gender = "";
  nationality: string [] =[];
  selectednationality: Nationality [] = [] ;

  currentemployee !: Employee ;


  constructor(private fb: FormBuilder,private employeeService:EmployeeService,
    private _locationPhoneService: LocationPhoneService,private msg: NzMessageService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      employeeNumber:[null,[Validators.required]],
      personalEmail: [null, [Validators.email, Validators.required]],
      personalEmail2:[null,null],
      personalEmail3:[null,null],
      firstName: [null, [Validators.required]],
      fatherName: [null, [Validators.required]],
      grandFatherName: [null, [Validators.required]],
      phoneNumber: [null,[Validators.required]],
      phoneNumber2:[null,null],
      phoneNumber3:[null,null],
      dateofBirth: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      nationality: [null, [Validators.required]],
      nationality2:[null,null],
      nationality3:[null,null]

    });
   this._locationPhoneService.getListofCountries()
    .subscribe((response: string[]) => {
      this.nationality = response;
    })
    this.currentemployee = this.employeeService.getPersonalInfo();
    this.fillCurrentEmployee(this.currentemployee);
  }

  fillCurrentEmployee(employee: Employee){
    this.employeeNumber=employee.employeeNumber,
    this.personalEmail=employee.PersonalEmail,
    this.personalEmail2=employee.PersonalEmail2,
    this.personalEmail3=employee.PersonalEmail3,
    this.firstName=employee.FirstName,
    this.fatherName=employee.FatherName,
    this.grandFatherName=employee.GrandFatherName,
    this.phoneNumber=employee.MobilePhone,
    this.phoneNumber2=employee.Phone1,
    this.phoneNumber3=employee.Phone2,
    this.dateofBirth=employee.DateofBirth,
    this.gender=employee.Gender,
    this.selectednationality=employee.Nationality;

  }

  addEmployee(){
  if(this.validateForm.invalid){
      alert("Invalid inputs on the form");
    }
    else{
     this.ValidateInput();
    console.log("Add Employee Executed");
    this.employeeService.setEmployeeData(this.employee);

    }
  }
  saveEmployee(){
    if(this.validateForm.invalid){
      alert("Invalid inputs on the form!");
    }
    else{
    this.ValidateInput();
    console.log("Save Employee Executed");
    this.employeeService.setEmployeeData(this.employee);
    this.employeeService.addEmployee(this.employee);

  }
}

  ValidateInput(){

   /* if(this.phoneNumber === this.phoneNumber2){
       this.phoneNumber2="";
       alert("Duplicate phone number detected, will be ignored !");
    }
    else if(this.phoneNumber === this.phoneNumber3){
      this.phoneNumber3 = "";
      alert("Duplicate phone number detected, will be ignored !");
    }
    else if(this.phoneNumber3 === this.phoneNumber2){
      this.phoneNumber2 = "";
      alert("Duplicate phone number detected, will be ignored !");
    }
    if(this.personalEmail === this.personalEmail2){
       this.personalEmail2="";
       alert("Duplicate email address detected, will be ignored !");
    }
    else if(this.personalEmail === this.personalEmail3){
      this.personalEmail3 = "";
      alert("Duplicate  email address detected, will be ignored !");
    }
    else if(this.personalEmail3 === this.personalEmail2){
      this.personalEmail2 = "";
      alert("Duplicate  email address detected, will be ignored !");
    }
*/
    const today = new Date().toLocaleDateString();

    if(new Date() > this.dateofBirth){
      alert(today+" --> "+this.dateofBirth);
    }

    this.selectednationality = [{
      Name :  this.validateForm.value.nationality
    },
  {Name: this.validateForm.value.nationality2},
  {Name: this.validateForm.value.nationality3}
]

    this.employee = {
      employeeNumber : this.employeeNumber,
      FirstName: this.firstName,
      FatherName: this.fatherName,
      GrandFatherName: this.grandFatherName,
      MobilePhone: this.phoneNumber,
      Phone1:this.phoneNumber2,
      Phone2:this.phoneNumber3,
      PersonalEmail: this.personalEmail,
      PersonalEmail2: this.personalEmail2,
      PersonalEmail3: this.personalEmail3,
      DateofBirth : this.dateofBirth,
      Gender : this.gender,
      Nationality: this.selectednationality


    }

  }

  EnablemultiEmail(){
    this.multiEmail = true;
  }
  DisableMultiEmail(){
    this.multiEmail = false;
  }
  EnablemultiPhone(){
     this.multiPhone = true;
  }
  DisableMultiPhone(){
    this.multiPhone = false;
 }
 EnablemultiNational(){
   this.multiNational = true;
 }
 DisableMultiNational(){
   this.multiNational = false;
 }

  handleChange(info: NzUploadChangeParam): void {

    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      this.msg.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      this.msg.error(`${info.file.name} file upload failed.`);
    }
  }

  ValidateFutureDate = (control: FormControl) =>

  new Observable((observer: Observer<ValidationErrors | null>) => {

      const currentDateTime = new Date();

      const controlDate = new Date(control.value);

      if (!control?.pristine) {

          if(!(controlDate <= currentDateTime)) {

              observer.next({ error: true, isFutureDate: true });

          }

      } else {

        observer.next(null);

      }

      observer.complete();

    }

  );


}
