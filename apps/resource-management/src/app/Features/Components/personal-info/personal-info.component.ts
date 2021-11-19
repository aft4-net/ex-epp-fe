import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Employee } from '../../Models/Employee';
import { EmployeeService } from '../../Services/Employee/EmployeeService';
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
  listOfOptionNationality: string[] = ["Ethiopia","US","Kenya","UK","China"];
  employee !: Employee;

  personalEmail ="";
  firstName="";
  fatherName="";
  grandFatherName="";
  phoneNumber="";
  dateofBirth = new Date("2021-11-17 14:29:03.107");
  gender = "";
  nationality = "";

  constructor(private fb: FormBuilder,private employeeService:EmployeeService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      personalEmail: [null, [Validators.email, Validators.required]],
      firstName: [null, [Validators.required]],
      fatherName: [null, [Validators.required]],
      grandFatherName: [null, [Validators.required]],
      phoneNumber: [null,[Validators.required]],
      dateofBirth: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      nationality: [null, [Validators.required]],
      phoneNumberPrefix:[null,[Validators.required]]

    });
    
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
      Phone1: "25112345673",
      Phone2: "25112345673",
      PersonalEmail: this.personalEmail,
      PersonalEmail2: "test@gmail.com",
      PersonalEmail3: "test@gmail.com",
      DateofBirth : this.dateofBirth,
      Gender : this.gender
     /* Nationality: Nationality[],
      Organization: EmployeeOrganization,
      PersonalAddress: Address[],
      FamilyDetail: FamilyDetails[],
      EmergencyContact: EmergencyContact[]*/
    }

  }





}
