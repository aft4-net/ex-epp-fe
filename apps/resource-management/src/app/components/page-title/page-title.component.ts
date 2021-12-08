import { Component, OnInit } from '@angular/core';
import { DatePipe, formatDate } from '@angular/common';

import { Employee } from '../../Features/Models/Employee';
import { EmployeeOrganization } from '../../Features/Models/EmployeeOrganization/EmployeeOrganization';
import { EmployeeService } from '../../Features/Services/Employee/EmployeeService';
import { FormGenerator } from '../../Features/Components/custom-forms-controls/form-generator.model';
import { ICountry } from '../../Features/Models/EmployeeOrganization/Country';
import { Nationality } from '../../Features/Models/Nationality';
import { Router } from '@angular/router';

@Component({
  selector: 'exec-epp-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.scss']
})
export class PageTitleComponent implements OnInit {

  employee !: Employee;
  selectednationality: Nationality [] = [] ;
  organization!: EmployeeOrganization;
  country!: ICountry;

 dateofBirth = new Date("2021-11-17 14:29:03.107");

  constructor(private _formBuilder: FormGenerator,private _router:Router,private _employeeService: EmployeeService
    ) { }

  ngOnInit(): void {
  }

  saveNext(){
    const currentUrl = this._router.url;
    if(this._formBuilder.personalDetailsForm.valid && currentUrl === 'employee/add-employee/personal-info'){
      this._router.navigate(['employee/add-employee/personal-address'])
    }
    else if(this._formBuilder.addressForm.valid && currentUrl === 'employee/add-employee/personal-address'){
      this._router.navigate(['employee/add-employee/family-detail'])
    }
    else if(this._formBuilder.familyDetail.valid && currentUrl === 'employee/add-employee/family-detail'){
      this._router.navigate(['employee/add-employee/emergency-contact'])
    }
    else if(this._formBuilder.emergencyContact.valid && currentUrl === 'employee/add-employee/emergency-contact'){
      this._router.navigate(['employee/add-employee/Organization-Detail'])
    }

    this.selectednationality = [{
      Name :  "Ethiopian"
    }];
    this.country = {
      id : "6d928e2a-960e-252f-b738-b7686fcfcd0a",
      name : "Ethiopia"
    };

    this.organization = {
    Country:this.country,
    DutyStation: "Addis",
    DutyBranch: "a4d463e6-057e-409d-a97e-ef5bad93ba59",
    CompaynEmail: "aaa@excel.com",
    PhoneNumber: "1254789633",
    JoiningDate: this.dateofBirth,
    TerminationDate: this.dateofBirth,
    EmploymentType: "permanent",
    Department: "engineering",
    BusinessUnit:"All",
    ReportingManager: "Nathan",
    JobTitle: "Developer",
    Status: "Active"
    };


   // this._employeeService.setEmployeeData(this._formBuilder.personalDetailsForm.value);
    //this._employeeService.setEmployeeData(this._formBuilder.addressForm.value);
    //this._employeeService.setEmployeeData(this._formBuilder.familyDetail.value);
    //this._employeeService.setEmployeeData(this._formBuilder.emergencyContact.value);
    //this._employeeService.setEmployeeData(this._formBuilder.organizationalForm.value);

    this._employeeService.setEmployeeData({
      employeeNumber : "2333233/21",
      FirstName: "Nathan",
      FatherName: "Daniel",
      GrandFatherName:"Zewdn",
      MobilePhone: "0987834271",
      Phone1:"0934758938",
      Phone2:"0987333674",
      PersonalEmail: "nat11@gmail.com",
      PersonalEmail2: "nat222@yahoo.com",
      PersonalEmail3: "nat33@excel.com",
      Gender : "Male",
      DateofBirth:  this.dateofBirth,
      Nationality: this.selectednationality,
      EmployeeOrganization : this.organization
    });

    this._employeeService.saveEmployee();
  }


}
function moment(dateString: any, arg1: string) {
  throw new Error('Function not implemented.');
}

