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
    
    this.employee = {
      FirstName: "Nathan",
      FatherName: "Daniel",
      GrandFatherName: "Zewdneh",
      MobilePhone: "+25112345677",
      Phone1: "25112345673",
      Phone2: "25112345673",
      PersonalEmail: "Abel@gmail.com",
      PersonalEmail2: "selam@gmail.com",
      PersonalEmail3: "nathan@gmail.com",
      DateofBirth : new Date("2021-11-17 14:29:03.107"),
      Gender : "Male"
    }
    
   
    

  }
  addEmployee(){
    console.log("Adde Employee Executed");
    this.employeeService.setEmployeeData(this.employee);
  }






}
