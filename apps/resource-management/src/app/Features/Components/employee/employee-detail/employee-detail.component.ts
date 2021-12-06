import { Component, OnInit } from '@angular/core';
import { NzTableFilterList } from 'ng-zorro-antd/table';
import { ColumnItem } from'../../../Models/EmployeeColumnItem';
import { Data } from '@angular/router';
import { EmployeeParams } from '../../../Models/Employee/EmployeeParams';
import { IEmployeeViewModel } from '../../../Models/Employee/EmployeeViewModel';
import { EmployeeService } from '../../../Services/Employee/EmployeeService';
import {  from, Observable, of, pipe } from 'rxjs';
import { listtToFilter } from '../../../Models/listToFilter';
import { NzModalService } from 'ng-zorro-antd/modal';
import { PaginationResult } from '../../../Models/PaginationResult';
import { map, throttleTime } from 'rxjs/operators';
import { Result } from 'postcss';


@Component({
  selector: 'exec-epp-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  constructor(private _employeeService : EmployeeService,modalService: NzModalService) {

  }
  checked = false;
  loading = false;
  indeterminate = false;
  listOfData: readonly Data[] = [];
  listOfCurrentPageData: readonly Data[] = [];
  setOfCheckedId = new Set<string>();
  employeeViewModels$ : Observable<IEmployeeViewModel[]>= new Observable<any>();
  employeeViewModel : IEmployeeViewModel[] = [];
  paginatedResult !: PaginationResult<IEmployeeViewModel[]>;
  employeeParams = new EmployeeParams();
  searchStateFound !: boolean;
  pageSize = 10;
  pageIndex = 1;
  totalRows !:number;
  totalRecord !: number;
  beginingRow !: number;
  lastRow !: number;
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
    },
    {
      name: 'JoiningDate',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: IEmployeeViewModel, b: IEmployeeViewModel) => a.JoiningDate.length - b.JoiningDate.length,
      filterMultiple: true,
      listOfFilter:this.empJoinDate,
      filterFn: (list: string[], item: IEmployeeViewModel) => list.some(name => item.JoiningDate.indexOf(name) !== -1)
    }
  ]

  listOfColumns!: ColumnItem[];


  ngOnInit(): void {

    this.FeatchAllEmployees();
    this.FillTheFilter();

  }

  FillTheFilter(){

    this.holdItJobTitle.length = 0;

    this.employeeViewModels$.subscribe(
       val => {this.employeeViewModel = val,

        console.log("From HERE "+ val);

        for(let i=0; i < this.employeeViewModel.length;i++){
          if(this.holdItCountry.findIndex(x=>x.text === this.employeeViewModel[i].Location) === -1){
        this.holdItCountry.push(
          {
            text: this.employeeViewModel.map(country=>country.Location)[i],
            value:this.employeeViewModel.map(country=>country.Location)[i]
          }
             )
          }
        }
        for(let i=0; i < this.employeeViewModel.length;i++){
          if(this.holdItJobTitle.findIndex(x=>x.text === this.employeeViewModel[i].JobTitle) === -1){
        this.holdItJobTitle.push(
          {
            text:this.employeeViewModel.map(title=>title.JobTitle)[i],
            value:this.employeeViewModel.map(title=>title.JobTitle)[i]
          }
        )
          }
        
        }
        for(let i=0; i < this.employeeViewModel.length;i++){
        if(this.holdItStatus.findIndex(x=>x.text === this.employeeViewModel[i].Status) === -1){
        this.holdItStatus.push(
          {
            text:this.employeeViewModel.map(status=>status.Status)[i],
            value:this.employeeViewModel.map(status=>status.Status)[i]
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
    this._employeeService.SearchEmployeeData(this.employeeParams).subscribe((response:PaginationResult<IEmployeeViewModel[]>) => {
      this.employeeViewModels$=of(response.Data);
      console.log(response.Data);
      this.employeeViewModel = response.Data;
      this.pageIndex=response.pagination.PageIndex;
      this.pageSize=response.pagination.PageSize;
      this.totalRecord=response.pagination.TotalRecord
      this.totalRows=response.pagination.TotalRows;
      this.lastRow = this.totalRows;
      this.beginingRow = 1;
      console.log(response.pagination);
      this.FillTheFilter();
    }   
  );
  this.searchStateFound=false; 
}

searchEmployees() {
    this.employeeParams.searchKey = this.fullname;
    this._employeeService.SearchEmployeeData(this.employeeParams).subscribe((response:PaginationResult<IEmployeeViewModel[]>) => {
      this.employeeViewModels$=of(response.Data);
      this.employeeViewModel = response.Data;
      this.pageIndex=response.pagination.PageIndex;
      this.pageSize=response.pagination.PageSize;
      this.totalRecord=response.pagination.TotalRecord
      this.totalRows=response.pagination.TotalRows;
      this.beginingRow = 1;
      this.lastRow = this.totalRows;
    });
    this.searchStateFound=true; 
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

  PageIndexChange(index: any): void {
    this.loading =true;
    this.employeeParams.pageIndex = index;
    this.employeeParams.searchKey = this.fullname ?? "";
    if(this.searchStateFound == true)
    {
      this._employeeService.SearchEmployeeData(this.employeeParams).subscribe(
        (response:PaginationResult<IEmployeeViewModel[]>)=>{
          console.log("Search key is "+ this.employeeParams.searchKey);
          this.employeeViewModels$= of(response.Data);
          this.employeeViewModel= response.Data;
          this.totalRows = response.pagination.TotalRows;
          this.pageIndex = response.pagination.PageIndex;
          if(this.totalRows === this.pageSize)
          {
            this.lastRow = this.pageSize * index;
            this.beginingRow = (this.totalRows * (index-1)) + 1;
          }
          else if((this.totalRows < this.pageSize))
          {
            this.lastRow = this.totalRecord;
            this.beginingRow = (this.totalRecord - this.totalRows) + 1;  
          }
          this.loading =false;
          this.FillTheFilter();
        });
    }else {
      this._employeeService.SearchEmployeeData(this.employeeParams)
      .subscribe((response:PaginationResult<IEmployeeViewModel[]>)=>{
        console.log("" + this.employeeParams.searchKey);
        this.employeeViewModels$=of(response.Data);
        this.employeeViewModel = response.Data;
        this.totalRows = response.pagination.TotalRows;
        this.pageIndex = response.pagination.PageIndex;
        if(this.totalRows === this.pageSize)
        {
          this.lastRow = this.pageSize * index;
          this.beginingRow = (this.totalRows * (index-1)) + 1;
        }
        else if((this.totalRows < this.pageSize))
        {
          this.lastRow = this.totalRecord;
          this.beginingRow = (this.totalRecord - this.totalRows) + 1;  
        }
        this.loading =false;
        this.FillTheFilter();
      });
      this.searchStateFound=false;
    }
  }
}
