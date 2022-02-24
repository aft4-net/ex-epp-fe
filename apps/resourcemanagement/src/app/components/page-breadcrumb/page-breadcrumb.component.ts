import { Component, OnInit } from '@angular/core';

import { Employee } from '../../Features/Models/Employee';
import { EmployeeService } from '../../Features/Services/Employee/EmployeeService';
import { FormGenerator } from '../../Features/Components/custom-forms-controls/form-generator.model';
import { PermissionListService } from '../../../../../../libs/common-services/permission.service';
import { Router } from '@angular/router';

@Component({
  selector: 'exec-epp-page-breadcrumb',
  templateUrl: './page-breadcrumb.component.html',
  styleUrls: ['./page-breadcrumb.component.scss'],
})
export class PageBreadcrumbComponent implements OnInit {
  //isdefault = true;
  emptyEmp!: Employee;
  isdefault = this._employeeService.isdefault;
  canAddEmployee = false;
 
  route = '';

  constructor(
    private _permissionService: PermissionListService,
    public _employeeService: EmployeeService,
    private _router: Router,
    private _formGenerator: FormGenerator
  ) {}

  ngOnInit(): void {
    this._employeeService.empNum = '';
    this._employeeService.ephoto = null;

    if (
      this._permissionService.authorizedPerson('Create_Employee') ||
      this._permissionService.authorizedPerson('Employee_Admin')
    ) {
      this.canAddEmployee = true;
    }
  }

  saveEmployee() {
    const employee = this._formGenerator.getModelPersonalDetails() as Employee;
    this._employeeService.setEmployeeData(employee);
    this._employeeService.saveEmployee();
  }

  addEmployee() {
    this.route = '/resourcemanagement/employee/add-employee/personal-info';
    this._formGenerator.generateForms();
    this._employeeService.isEdit = false;
    this._employeeService.save = 'Save';
    this._employeeService.employeeById = this.emptyEmp;
    this._formGenerator.allAddresses = [];
    this._formGenerator.allEmergencyContacts = [];
    this._formGenerator.allFamilyDetails = [];
    const currentUrl = this.route;
    if (this.authorize('Create_Employee')) {
      this._router
        .navigateByUrl('/', { skipLocationChange: false })
        .then(() => {
          this._router.navigate([currentUrl]);
        });
    }
  }

  authorize(key: string) {
    return this._permissionService.authorizedPerson(key);
  }

  activeRoute(routePath: string) {
    if (this.route == '') {
      this.route = this._router.url;
    }

    return this.route == routePath;
  }
}
