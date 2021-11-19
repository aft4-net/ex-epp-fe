import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Employee } from '../../Models/Employee';
import { EmployeeService } from '../../Services/Employee/EmployeeService';
import { LocationPhoneService } from '../../Services/address/location-phone.service';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
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

  personalEmail ="";
  firstName="";
  fatherName="";
  grandFatherName="";
  phoneNumber="";
  dateofBirth = new Date("2021-11-17 14:29:03.107");
  gender = "";
  nationality: string [] =[];
  

  constructor(private fb: FormBuilder,private employeeService:EmployeeService, private _locationPhoneService: LocationPhoneService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      personalEmail: [null, [Validators.email, Validators.required]],
      firstName: [null, [Validators.required]],
      fatherName: [null, [Validators.required]],
      grandFatherName: [null, [Validators.required]],
      phoneNumber: [null,[Validators.required]],
      dateofBirth: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      nationality: [null, [Validators.required]]

    });

   this._locationPhoneService.getListofCountries()
    .subscribe((response: string[]) => {
      this.nationality = response;
    })
    
  }
  addEmployee(){

     this.ValidateInput();
    console.log("Add Employee Executed");
    this.employeeService.setEmployeeData(this.employee);
    
  }
  saveEmployee(){
    this.ValidateInput();
    console.log("Save Employee Executed");
    this.employeeService.addEmployee(this.employee);
  }

  ValidateInput(){

    this.employee = {
      FirstName: this.firstName,
      FatherName: this.fatherName,
      GrandFatherName: this.grandFatherName,
      MobilePhone: this.phoneNumber,
     
      PersonalEmail: this.personalEmail,
     
      DateofBirth : this.dateofBirth,
      Gender : this.gender
     // Nationality: this.validateForm.value.nationality,
     
    }

  }





}
