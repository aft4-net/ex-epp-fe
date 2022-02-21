import { Component, Input, OnInit } from '@angular/core';
import { DatePipe, formatDate } from '@angular/common';

import { Employee } from '../../Features/Models/Employee';
import { EmployeeOrganization } from '../../Features/Models/EmployeeOrganization/EmployeeOrganization';
import { EmployeeService } from '../../Features/Services/Employee/EmployeeService';
import { FamilyDetail } from '../../Features/Models/FamilyDetail/FamilyDetailModel';
import { FormGenerator } from '../../Features/Components/custom-forms-controls/form-generator.model';
import { ICountry } from '../../Features/Models/EmployeeOrganization/Country';
import {
  IEmergencyContact,
} from '../../Features/Models/emergencycontact';
import { Nationality } from '../../Features/Models/Nationality';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { PermissionListService } from 'libs/common-services/permission.service';
import { Router } from '@angular/router';
import { environment } from 'libs/environments/environment';

@Component({
  selector: 'exec-epp-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.scss'],
})
export class PageTitleComponent implements OnInit {
  @Input() title = 'Personal Detail'
  save = 'Save';

  constructor(
    private _formGenerator: FormGenerator,
    private _router: Router,
    private _employeeService: EmployeeService,
    private notification: NzNotificationService,
    private _permissionService: PermissionListService
  ) {
    this.save = this._employeeService.save;
  }
  employee!: Employee;
  selectednationality: Nationality[] = [];
  organization!: EmployeeOrganization;
  country!: ICountry;
  familyDetail: FamilyDetail[] = [];
  emergencyContacts: IEmergencyContact[] = [];

  dateofBirth = new Date('2021-11-17 14:29:03.107');
  isSaveButtonHidden = false;
  authorize(key: string) {
    return this._permissionService.authorizedPerson(key);
  }
  ngOnInit(): void {
    if (
      this._permissionService.authorizedPerson('Create_Employee') ||
      this._permissionService.authorizedPerson('Update_Employee') ||
      this._permissionService.authorizedPerson('Employee_Admin')
    ) {
      this.isSaveButtonHidden = true;
    }
  }

  saveNext() {
    if (!this._formGenerator.personalDetailsForm.valid) {
      this.notification.create("error",'Employee Registration','Please enter a valid Personal detail!');
      this._formGenerator.errorMessageforPersonalDetails(
        this._formGenerator.personalDetailsForm
      );
      this._router.navigate([
        'resourcemanagement/employee/add-employee/personal-info',
      ]);
    } else if (!this._formGenerator.organizationalForm.valid) {
      this.notification.create("error",'Employee Registration','Please enter a valid  Organizational detail');
      this._formGenerator.errorMessageforOrganizationDetails(
        this._formGenerator.organizationalForm
      );
      this._router.navigate([
        'resourcemanagement/employee/add-employee/Organization-Detail',
      ]);
    } else {
      if (this._employeeService.isEdit) {
        this._formGenerator.updateOneEmployee();
        setTimeout(() => {
          this._employeeService.sendempphoto();
          this._router.navigate(['resourcemanagement']); //.then(() => {
        }, 1000);
      } else {
        this._formGenerator.save();
        setTimeout(() => {
          this._employeeService.sendempphoto();
          this._router.navigate(['resourcemanagement']); //.then(() => {
        }, 1000);
      }
    }
  }
  Cancel() {
    this._employeeService.isdefault = true;
    this._router.navigate(['resourcemanagement']);
  }
}
