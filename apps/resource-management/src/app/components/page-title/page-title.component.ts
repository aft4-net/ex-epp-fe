import { Component, OnInit } from '@angular/core';
import { DatePipe, formatDate } from '@angular/common';
import { EmergencyContact, IEmergencyContact } from '../../Features/Models/emergencycontact';

import { Address } from '../../Features/Models/address.model';
import { Employee } from '../../Features/Models/Employee';
import { EmployeeOrganization } from '../../Features/Models/EmployeeOrganization/EmployeeOrganization';
import { EmployeeService } from '../../Features/Services/Employee/EmployeeService';
import { FamilyDetail } from '../../Features/Models/FamilyDetail/FamilyDetailModel';
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
  save="Save";

  constructor(private _formGenerator: FormGenerator,private _router:Router,
    private _employeeService:EmployeeService) {

        this.save=this._employeeService.save

     }
  employee !: Employee;
  selectednationality: Nationality [] = [] ;
  organization!: EmployeeOrganization;
  country!: ICountry;
  familyDetail : FamilyDetail [] = [];
  emergencyContacts: IEmergencyContact [] = [];

 dateofBirth = new Date("2021-11-17 14:29:03.107");


  ngOnInit(): void {
  }

  saveNext(){
    if (this._formGenerator.personalDetailsForm.valid) {
      const employee = this._formGenerator.getModelPersonalDetails()
      employee.EmployeeOrganization = this._formGenerator.getModelOrganizationDetails() as EmployeeOrganization
      employee.FamilyDetails =   this._formGenerator.getModelFamilyDetails() as FamilyDetail []
      employee.PersonalAddress = this._formGenerator.getModelAddressDetails() as Address[]
      //employee.EmergencyContact = this._formGenerator.getModelEmergencyContactDetails as IEmergencyContact[]

      this._employeeService.setEmployeeData(employee)
      this._employeeService.saveEmployee()
      console.log('Employee Success')
      console.log(employee)
    } else {
      console.log('Employee Failure')
      alert('Personal detail contains an error!')
    }

  //   this.selectednationality = [{
  //     Name :  "Ethiopian"
  //   }];
  //   this.country = {
  //     id : "6d928e2a-960e-252f-b738-b7686fcfcd0a",
  //     name : "Ethiopia"
  //   };

  //   this.organization = {
  //   Country:"Ethiopia",
  //   DutyStation: "Addis",
  //   DutyBranch: "a4d463e6-057e-409d-a97e-ef5bad93ba59",
  //   CompaynEmail: "aaa@excel.com",
  //   PhoneNumber: "1254789633",
  //   JoiningDate: this.dateofBirth,
  //   TerminationDate: this.dateofBirth,
  //   EmploymentType: "permanent",
  //   Department: "engineering",
  //   BusinessUnit:"All",
  //   ReportingManager: "Nathan",
  //   JobTitle: "Product Owner",
  //   Status: "Active"
  //   };

  //   this.familyDetail = [{
  //   Guid: "a4d463e6-057e-409d-a97e-ef5bad93ba59",
  //   EmployeeId:"a4d463e6-057e-409d-a97e-ef5bad93ba59",
  //   Remark: "This is a Test",
  //   RelationshipId:["ss"],
  //   FullName: "biruk",
  //   Gender: "Male",
  //   DateofBirth: this.dateofBirth.toDateString(),
  //   IsActive: true,
  //   IsDeleted: false,
  //   CreatedDate: this.dateofBirth.toDateString(),
  //   CreatedbyUserGuid: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  //   }];

  //   this.emergencyContacts = [{
  //     isActive: true,
  //     isDeleted: true,
  //     firstName: "simbo",
  //     fatherName: "abel",
  //     relationship: "bro"
  //   }]
  // //  // this._employeeService.setEmployeeData(this._formBuilder.personalDetailsForm.value);
  // //   //this._employeeService.setEmployeeData(this._formBuilder.addressForm.value);
  // //   //this._employeeService.setEmployeeData(this._formBuilder.familyDetail.value);
  // //   //this._employeeService.setEmployeeData(this._formBuilder.emergencyContact.value);
  // //   //this._employeeService.setEmployeeData(this._formBuilder.organizationalForm.value);

  //   this._employeeService.setEmployeeData({
  //     guid: "77f94782-b511-4426-b6d2-358506bc2fdc",
  //     employeeNumber : "1254523/21",
  //     FirstName: "newNathan",
  //     FatherName: "hosan",
  //     GrandFatherName:"abel",
  //     MobilePhone: "0911254875",
  //     Phone1:"0934758938",
  //     Phone2:"0987333674",
  //     PersonalEmail: "arif@gmail.com",
  //     PersonalEmail2: "Husen1234@yahoo.com",
  //     PersonalEmail3: "Husen12345@excel.com",
  //     Gender : "Male",
  //     DateofBirth:  this.dateofBirth,
  //     Nationality: this.selectednationality,
  //     EmployeeOrganization : this.organization,
  //     FamilyDetail : this.familyDetail,
  //     EmergencyContact: this.emergencyContacts,
  //   });

  //    this._employeeService.updateEmployee();
  //    alert("Employee Updated");

 // }
  }
  Cancel(){
    this._employeeService.isdefault = true;
    this._router.navigate(['']);
  }


}


