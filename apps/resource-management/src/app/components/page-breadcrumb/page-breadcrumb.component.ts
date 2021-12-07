import { Component, OnInit } from '@angular/core';

import { EmployeeService } from '../../Features/Services/Employee/EmployeeService';
import { Router } from '@angular/router';

@Component({
  selector: 'exec-epp-page-breadcrumb',
  templateUrl: './page-breadcrumb.component.html',
  styleUrls: ['./page-breadcrumb.component.scss'],
})
export class PageBreadcrumbComponent implements OnInit {
  isdefault = true;

  router: string;

  constructor(
    private _employeeService: EmployeeService,
    private _router: Router
  ) {
    this._router.events.subscribe((url: any) => console.log(url));
    this.router = _router.url;
    // console.log(this.router);
  }

  ngOnInit(): void {
    this._router.events.subscribe((url: any) => console.log(url));
    this.router = this._router.url;
  }

  saveEmployee() {
    this._employeeService.saveEmployee();
  }

  reloadCurrentRoute() {
    const currentUrl = this._router.url;
    this._router.navigateByUrl('/', { skipLocationChange: false }).then(() => {
      this._router.navigate([currentUrl]);
      console.log('current route is', currentUrl);
    });
  }

  addEmployee() {
    this._router.navigate(['/employee/add-employee/personal-info']);
    this._router.events.subscribe((url: any) => console.log(url));
    this.router = this._router.url;
    this.isdefault = false;
  }
}
