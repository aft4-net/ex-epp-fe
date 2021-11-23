import { Component, OnInit } from '@angular/core';

import { EmployeeService } from '../../Features/Services/Employee/EmployeeService';

@Component({
  selector: 'exec-epp-page-breadcrumb',
  templateUrl: './page-breadcrumb.component.html',
  styleUrls: ['./page-breadcrumb.component.scss']
})
export class PageBreadcrumbComponent implements OnInit {

  constructor(private _employeeService: EmployeeService) { }

  ngOnInit(): void {
  }

  saveEmployee(){
     this._employeeService.saveEmployee();
  }

}
