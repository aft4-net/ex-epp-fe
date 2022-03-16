import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'libs/common-services/Authentication.service';
import { EmployeeService } from '../../Services/Employee/EmployeeService';
import { FormGenerator } from '../custom-forms-controls/form-generator.model';

@Component({
  selector: 'exec-epp-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  constructor(
    private _employeeService: EmployeeService,
    private _form: FormGenerator,
    private _router: Router,
    private _authenticationService: AuthenticationService,
  ) {
    this.getUser();
   }

  ngOnInit(): void {
  }
  getUser() {
    const uemail = this._authenticationService.getEmail();
    this._employeeService.getUser(uemail).subscribe((response: any) => {
      const theEmpguid = response.Guid;

      if (theEmpguid !== null) {

        this.Edit(theEmpguid);
      }

    });
  }

  Edit(employeeId: string): void {
    
    this._form.employeId = employeeId;
    this._form.isProfile = true;

    this._employeeService.getEmployeeData(employeeId).subscribe((data: any) => {


      this._employeeService.empNum = data.EmployeeNumber;

      this._employeeService.setEmployeeDataForEdit(data);

      if (this._employeeService.employeeById) {
        this._employeeService.isEdit = true;

        this._employeeService.save = 'Update';

        this._form.generateForms;

        this._form.generateForms(this._employeeService.employeeById);

        this._form.allAddresses = this._employeeService.employeeById
          ?.EmployeeAddress
          ? this._employeeService.employeeById?.EmployeeAddress
          : [];

        this._form.allFamilyDetails = this._employeeService.employeeById
          ?.FamilyDetails
          ? this._employeeService.employeeById?.FamilyDetails
          : [];

        this._employeeService.isdefault = false;

        this._router.navigate([
          'resourcemanagement/employee/add-employee/personal-info',
        ]);
      }
    });
  }

}
