import { Component, OnInit } from '@angular/core';

import { FormGenerator } from '../../Features/Components/custom-forms-controls/form-generator.model';
import { Router } from '@angular/router';
import { EmployeeService } from '../../Features/Services/Employee/EmployeeService';

@Component({
  selector: 'exec-epp-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.scss']
})
export class PageTitleComponent implements OnInit {

  constructor(private _formBuilder: FormGenerator,private _router:Router,private _employeeService: EmployeeService) { }

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

    this._employeeService.setEmployeeData(this._formBuilder.personalDetailsForm.value);
    this._employeeService.setEmployeeData(this._formBuilder.addressForm.value);
    this._employeeService.setEmployeeData(this._formBuilder.familyDetail.value);
    this._employeeService.setEmployeeData(this._formBuilder.emergencyContact.value);
    this._employeeService.setEmployeeData(this._formBuilder.organizationalForm.value);

    this._employeeService.saveEmployee();
  }

}
