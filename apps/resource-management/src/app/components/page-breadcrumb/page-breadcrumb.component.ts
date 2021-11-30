import { Component, OnInit } from '@angular/core';

import { EmployeeService } from '../../Features/Services/Employee/EmployeeService';
import { Router } from '@angular/router';

@Component({
  selector: 'exec-epp-page-breadcrumb',
  templateUrl: './page-breadcrumb.component.html',
  styleUrls: ['./page-breadcrumb.component.scss'],
})
export class PageBreadcrumbComponent implements OnInit {
  constructor(
    private _employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  saveEmployee() {
    this._employeeService.saveEmployee();
  }

  addEmployee() {
    this.router.navigate(['/employee/add-employee/personal-info']);
  }
}
