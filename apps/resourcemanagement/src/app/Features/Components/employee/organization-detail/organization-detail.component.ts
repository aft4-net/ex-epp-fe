import { Component, OnInit } from '@angular/core';

import { EmployeeOrganization } from '../../../Models/EmployeeOrganization/EmployeeOrganization';
import { EmployeeService } from '../../../Services/Employee/EmployeeService';
import { FormGenerator } from '../../custom-forms-controls/form-generator.model';

@Component({
  selector: 'exec-epp-organization-detail',
  templateUrl: './organization-detail.component.html',
  styleUrls: ['./organization-detail.component.scss'],
})
export class OrganizationDetailComponent implements OnInit {
  
  defaultTerminationDate = new Date();
  OrganizationSource!: EmployeeOrganization;
  isEdit = false;
  constructor(
    public employeeService: EmployeeService,
    private readonly _formGenerator: FormGenerator
  ) {
    this.isEdit = this._formGenerator.IsEdit;
    this.employeeService.isdefault = false;
  }

  ngOnInit() {}
  
}
