import { Component, OnInit } from '@angular/core';

import { EmployeeService } from '../../Features/Services/Employee/EmployeeService';
import { Router } from '@angular/router';
import { FormGenerator } from '../../Features/Components/custom-forms-controls/form-generator.model';
import { Employee } from '../../Features/Models/Employee';

@Component({
  selector: 'exec-epp-page-breadcrumb',
  templateUrl: './page-breadcrumb.component.html',
  styleUrls: ['./page-breadcrumb.component.scss'],
})
export class PageBreadcrumbComponent implements OnInit {
  //isdefault = true;
  emptyEmp!:Employee
  isdefault = this._employeeService.isdefault;

  router: string;
  route = '';

  constructor(
    public _employeeService: EmployeeService,
    private _router: Router,
    private _formGenerator: FormGenerator
  ) {
    this._router.events.subscribe((url: any) => console.log(url));
    this.router = _router.url;
    console.log('currentPath', this._router.url);
  }

  ngOnInit(): void {
    console.log('gggg', this.route);
    this.activeRoute(this.route);
    
 }

  saveEmployee() {

    const employee = this._formGenerator.getModelPersonalDetails() as Employee
    this._employeeService.setEmployeeData(employee)
    this._employeeService.saveEmployee()
  }

  reloadCurrentRoute() {
    const currentUrl = this._router.url;
    this._router.navigateByUrl('/', { skipLocationChange: false }).then(() => {
      this._router.navigate([currentUrl]);
      console.log('current route is', currentUrl);
    });
  }

  addEmployee() {
    this.route = '/resourcemanagement/employee/add-employee/personal-info';
    this._formGenerator.generateForms()
    this._employeeService.isEdit=false;
    this._employeeService.save="Save";
    this._employeeService.employeeById=this.emptyEmp
    this._formGenerator.allAddresses=[];
    this._formGenerator.allEmergencyContacts=[];
    this._formGenerator.allFamilyDetails=[];
    const currentUrl = this.route;
    this._router.navigateByUrl('/', { skipLocationChange: false }).then(() => {
    this._router.navigate([currentUrl]);
  
    });
     

  }

  
  activeRoute(routePath: string) {
    if(this.route== '')
  {
    this.route = this._router.url;
  }
    
    return this.route == routePath;

    
  }
}
