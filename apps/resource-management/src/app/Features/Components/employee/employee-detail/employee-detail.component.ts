import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { Observable } from 'rxjs';
import { EmployeeParams } from '../../../Models/Employee/EmployeeParams';
import { IEmployeeViewModel } from '../../../Models/Employee/EmployeeViewModel';
import { EmployeeService } from '../../../Services/Employee/EmployeeService';

@Component({
  selector: 'exec-epp-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  constructor(private _employeeService : EmployeeService) {

  }
  checked = false;
  loading = false;
  indeterminate = false;
  listOfData: readonly Data[] = [];
  listOfCurrentPageData: readonly Data[] = [];
  setOfCheckedId = new Set<string>();
  employeeViewModels$ !: Observable<IEmployeeViewModel[]>;
  employeeParams = new EmployeeParams();

  ngOnInit(): void {
    this.FeatchAllEmployees();
  }

  updateCheckedSet(employeeGuid: string, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(employeeGuid);
    } else {
      this.setOfCheckedId.delete(employeeGuid);
    }
  }

  onCurrentPageDataChange(listOfCurrentPageData: readonly Data[]): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    const listOfEnabledData = this.listOfCurrentPageData.filter(
      ({ disabled }) => !disabled
    );
    this.checked = listOfEnabledData.every(({ id }) =>
      this.setOfCheckedId.has(id)
    );
    this.indeterminate =
      listOfEnabledData.some(({ id }) => this.setOfCheckedId.has(id)) &&
      !this.checked;
  }

  onItemChecked(employeeGuid: string, checked: boolean): void {
    this.updateCheckedSet(employeeGuid, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(checked: boolean): void {
    this.listOfCurrentPageData
      .filter(({ disabled }) => !disabled)
      .forEach(({ id }) => this.updateCheckedSet(id, checked));
    this.refreshCheckedStatus();
  }

  sendRequest(): void {
    this.loading = true;
    const requestData = this.listOfData.filter((data) =>
      this.setOfCheckedId.has(data.id)
    );
    console.log(requestData);
    setTimeout(() => {
      this.setOfCheckedId.clear();
      this.refreshCheckedStatus();
      this.loading = false;
    }, 1000);
  }

  FeatchAllEmployees() {
    this.employeeViewModels$ = this._employeeService.SearchEmployeeData(this.employeeParams);
  }

  Edit(employeeGuid : string)
  {

  }

  Delete(employeeGuid : string)
  {

  }
}
