import { Component, OnInit } from '@angular/core';

import { ColumnItem } from'../../../Models/EmployeeColumnItem';
import { Data } from '@angular/router';
import { EmployeeParams } from '../../../Models/Employee/EmployeeParams';
import { EmployeeService } from '../../../Services/Employee/EmployeeService';
import { IEmployeeViewModel } from '../../../Models/Employee/EmployeeViewModel';
import { Observable } from 'rxjs';
import { ResponseDTO } from '../../../Models/response-dto.model';
import { data } from 'autoprefixer';
import { listtToFilter } from '../../../Models/listToFilter';
import { map } from 'rxjs/operators';

@Component({
  selector: 'exec-epp-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css'],
})
export class EmployeeDetailComponent implements OnInit {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private _employeeService : EmployeeService) {

  }
  checked = false;
  loading = false;
  indeterminate = false;
  listOfData: readonly Data[] = [];
  listOfCurrentPageData: readonly Data[] = [];
  setOfCheckedId = new Set<number>();
  employeeViewModels$ !: Observable<IEmployeeViewModel[]>;
  employeeParams = new EmployeeParams();
  fullname!: string;
  empList !: listtToFilter[];

  listOfColumnsFullName: ColumnItem[] = [
    {
      name: 'Employee',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: IEmployeeViewModel, b: IEmployeeViewModel) => a.FullName.length - b.FullName.length,
      filterMultiple: false,
      listOfFilter: [

      ],
      filterFn: null
    }
  ]

  listOfColumns: ColumnItem[] = [


    {
      name: 'JobTitle',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: IEmployeeViewModel, b: IEmployeeViewModel) => a.JobTitle.length - b.JobTitle.length,
      filterMultiple: false,
      listOfFilter: [

      ],
      filterFn: null
    },
    {
      name: 'Status',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: IEmployeeViewModel, b: IEmployeeViewModel) => a.Status.length - b.Status.length,
      filterMultiple: true,
      listOfFilter: [
        {
          text:"string",
          value:"string"
        },
        {
          text:"Active",
          value:"Active"
        },
        {
          text:"On Leave",
          value:"On Leave"
        },
        {
          text:"Terminated",
          value:"Terminated"
        }
      ],
      filterFn: (list: string[], item: IEmployeeViewModel) => list.some(name => item.Status.indexOf(name) !== -1)
    },

    {
      name: 'Location',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: IEmployeeViewModel, b: IEmployeeViewModel) => a.Location.length - b.Location.length,
      filterMultiple: true,
      listOfFilter: [
        {
          text:"string",
          value:"string"
        },
        {
          text:"Ethiopia",
          value:"Ethiopia"
        },
        {
          text:"America",
          value:"America"
        },
        {
          text:"India",
          value:"India"
        }
      ],
      filterFn: (list: string[], item: IEmployeeViewModel) => list.some(name => item.Location.indexOf(name) !== -1)
    }
  ];

  listOfData2: IEmployeeViewModel[] = [
    {
      EmployeeGuid:'default',
      Location:"default",
      FullName: 'default',
      JobTitle: 'default',
      Status: 'default'
    }
  ];

  ngOnInit(): void {
    this.FeatchAllEmployees();
  }

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
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

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
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
  searchEmployees() {
    this.employeeParams.searchKey = this.fullname;
    console.log(this.fullname);
    this.employeeViewModels$ = this._employeeService.SearchEmployeeData(this.employeeParams);


  }
}


