import { Component, OnInit } from '@angular/core';
import { FormGenerator } from '../../Features/Components/custom-forms-controls/form-generator.model';
import { Employee } from '../../Features/Models/Employee';
import { EmployeeService } from '../../Features/Services/Employee/EmployeeService';

@Component({
  selector: 'exec-epp-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.scss']
})
export class PageTitleComponent implements OnInit {

  constructor(
    private _formGenerator: FormGenerator,
    private _employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
  }

  save() {
    const employee = this._formGenerator.getModelPersonalDetails() as Employee
    this._employeeService.setEmployeeData(employee)
    this._employeeService.saveEmployee()
  }

}
