import { Component, OnInit } from '@angular/core';
import { NzTableFilterList } from 'ng-zorro-antd/table';
import { ColumnItem } from'../../../Models/EmployeeColumnItem';
import { Data } from '@angular/router';
import { EmployeeParams } from '../../../Models/Employee/EmployeeParams';
import { IEmployeeViewModel } from '../../../Models/Employee/EmployeeViewModel';
import { EmployeeService } from '../../../Services/Employee/EmployeeService';
import {  Observable, pipe } from 'rxjs';
import { listtToFilter } from '../../../Models/listToFilter';
import { NzModalService } from 'ng-zorro-antd/modal';


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
  employeeViewModel !: IEmployeeViewModel[];
  employeeParams = new EmployeeParams();
  fullname!: string;
  holdItCountry: listtToFilter[] = [];
  holdItJobTitle: listtToFilter[] = [];
  holdItStatus: listtToFilter[] = [];
  holdItJoinDate: listtToFilter[]=[];

  empListCountry : NzTableFilterList=[];
  empListStatus: NzTableFilterList=[];
  empListJobType: NzTableFilterList=[];
  empJoinDate:NzTableFilterList=[];


  //added by simbo just you remove 

  isVisible = false;
  isConfirmLoading = false;
  
  
  ///


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

  listOfColumns!: ColumnItem[];


  ngOnInit(): void {

    this.FeatchAllEmployees();
    this.FillTheFilter();

  }

  FillTheFilter(){

    this.employeeViewModels$.subscribe(
       val => {this.employeeViewModel = val,

        console.log(this.employeeViewModel.length)

        for(let i=0; i < this.employeeViewModel.length;i++){
          if(this.holdItCountry.findIndex(x=>x.text === this.employeeViewModel[i].Status) === -1){
        this.holdItCountry.push(
          {
            text: this.employeeViewModel.map(country=>country.Location).filter((value,index,self)=>self.indexOf(value)===index)[i],
            value:this.employeeViewModel.map(country=>country.Location).filter((value,index,self)=>self.indexOf(value)===index)[i]
          }
             )
          }
        }
        for(let i=0; i < this.employeeViewModel.length;i++){
          if(this.holdItJobTitle.findIndex(x=>x.text === this.employeeViewModel[i].Status) === -1){
        this.holdItJobTitle.push(
          {
            text:this.employeeViewModel.map(title=>title.JobTitle).filter((value,index,self)=>self.indexOf(value)===index)[i],
            value:this.employeeViewModel.map(title=>title.JobTitle).filter((value,index,self)=>self.indexOf(value)===index)[i]
          }
        )
          }
        }
        for(let i=0; i < this.employeeViewModel.length;i++){
        if(this.holdItStatus.findIndex(x=>x.text === this.employeeViewModel[i].Status) === -1){
        this.holdItStatus.push(
          {
            text:this.employeeViewModel.map(status=>status.Status).filter((value,index,self)=>self.indexOf(value)===index)[i],
            value:this.employeeViewModel.map(status=>status.Status).filter((value,index,self)=>self.indexOf(value)===index)[i]
          }
        )
        }
        }
        for(let i=0; i < this.employeeViewModel.length;i++){
          if(this.holdItJoinDate.findIndex(x=>x.text === this.employeeViewModel[i].JoiningDate.toString()) === -1){
          this.holdItJoinDate.push(
            {
              text:this.employeeViewModel.map(join=>join.JoiningDate).filter((value,index,self)=>self.indexOf(value)===index)[i].toString(),
              value:this.employeeViewModel.map(join=>join.JoiningDate).filter((value,index,self)=>self.indexOf(value)===index)[i].toString()
            }
          )
          }
          }


        this.empListCountry= this.holdItCountry,
        this.empListStatus=this.holdItStatus,
        this.empListJobType=this.holdItJobTitle,
        this.empJoinDate = this.holdItJoinDate,
       // array.map(item => item.age)
       // .filter((value, index, self) => self.indexOf(value) === index)

        this.listOfColumns = [
          {
            name: 'JobTitle',
            sortOrder: null,
            sortDirections: ['ascend', 'descend', null],
            sortFn: (a: IEmployeeViewModel, b: IEmployeeViewModel) => a.JobTitle.length - b.JobTitle.length,
            filterMultiple: true,
            listOfFilter:this.empListJobType,
            filterFn: (list: string[], item: IEmployeeViewModel) => list.some(name => item.JobTitle.indexOf(name) !== -1)
          },
          {
            name: 'JoiningDate',
            sortOrder: null,
            sortDirections: ['ascend', 'descend', null],
            sortFn: (a: IEmployeeViewModel, b: IEmployeeViewModel) => a.JoiningDate.toString().length - b.JoiningDate.toString().length,
            filterMultiple: true,
            listOfFilter:this.empJoinDate,
            filterFn: (list: string[], item: IEmployeeViewModel) => list.some(name => item.JobTitle.indexOf(name) !== -1)
          },
          {
            name: 'Location',
            sortOrder: null,
            sortDirections: ['ascend', 'descend', null],
            sortFn: (a: IEmployeeViewModel, b: IEmployeeViewModel) => a.Location.length - b.Location.length,
            filterMultiple: true,
            listOfFilter: this.empListCountry,
            filterFn: (list: string[], item: IEmployeeViewModel) => list.some(name => item.Location.indexOf(name) !== -1)
          },
          {
            name: 'Status',
            sortOrder: null,
            sortDirections: ['ascend', 'descend', null],
            sortFn: (a: IEmployeeViewModel, b: IEmployeeViewModel) => a.Status.length - b.Status.length,
            filterMultiple: true,
            listOfFilter: this.empListStatus,
            filterFn: (list: string[], item: IEmployeeViewModel) => list.some(name => item.Status.indexOf(name) !== -1)
          }


        ];

      },

    );


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
  searchEmployees() {
    this.employeeParams.searchKey = this.fullname;
    console.log(this.fullname);
    this.employeeViewModels$ = this._employeeService.SearchEmployeeData(this.employeeParams);
  }


  Edit(employeeGuid : string)
  {
    this.isVisible = true;
  }

  Delete(employeeGuid : string)
  {
  //not implemented
  }


  //added by simbo just you can delete

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }


  //
}
