import { ActivatedRoute, Data } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { Observable, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';

import { ColumnItem } from'../../../Models/EmployeeColumnItem';
import { EmployeeParams } from '../../../Models/Employee/EmployeeParams';
import { EmployeeService } from '../../../Services/Employee/EmployeeService';
import { IEmployeeViewModel } from '../../../Models/Employee/EmployeeViewModel';
import { NzConfigService } from 'ng-zorro-antd/core/config';
import { ResponseDTO } from '../../../Models/response-dto.model';
import { data } from 'autoprefixer';
import { listtToFilter } from '../../../Models/listToFilter';

@Component({
  selector: 'exec-epp-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {

  @ViewChild('searchInput', { static: true })
  input!: ElementRef;

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
  holdItJoiningDate: listtToFilter[] = [];

  empListCountry : NzTableFilterList=[];
  empListStatus: NzTableFilterList=[];
  empListJobType: NzTableFilterList=[];
  empJoinDate: NzTableFilterList=[];


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
          name: 'Joining Date',
          sortOrder: null,
          sortDirections: ['ascend', 'descend', null],
          sortFn: (a: IEmployeeViewModel, b: IEmployeeViewModel) => a.JoiningDate.length - b.JoiningDate.length,
          filterMultiple: true,
          listOfFilter:this.empJoinDate,
          filterFn: (list: string[], item: IEmployeeViewModel) => list.some(name => item.JobTitle.indexOf(name) !== -1)
    }
  ]

  listOfColumns!: ColumnItem[];

   // eslint-disable-next-line @typescript-eslint/no-empty-function
   constructor(private _employeeService : EmployeeService) {

  }

  ngOnInit(): void {

    this.FeatchAllEmployees();
    this.FillTheFilter();

  }
  ngAfterViewInit() {

    fromEvent<any>(this.input.nativeElement,'keyup')
     .pipe(
       map(event => event.target.value),
       startWith(''),
       debounceTime(3000),
       distinctUntilChanged(),
       switchMap( async (search) => {this.fullname = search,
        this.searchEmployees()
       })
     ).subscribe();
  }

  FillTheFilter(){

    this.employeeViewModels$.subscribe(
       val => {this.employeeViewModel = val,

        console.log(this.employeeViewModel.length)

        for(let i=0; i < this.employeeViewModel.length;i++){
          console.log(i+"-->"+this.employeeViewModel[i].Location.trim());
          if(this.employeeViewModel[i].Location){
          if(this.holdItCountry.findIndex(x=>x.text === this.employeeViewModel[i].Location) === -1 ){
          this.holdItCountry.push(
          {
            text: this.employeeViewModel.map(country=>country.Location).filter((value,index,self)=>self.indexOf(value)===index)[i],
            value:this.employeeViewModel.map(country=>country.Location).filter((value,index,self)=>self.indexOf(value)===index)[i]
          }
             )
          }
        }
        }
        for(let i=0; i < this.employeeViewModel.length;i++){
          if(this.employeeViewModel[i].JobTitle){
          if(this.holdItJobTitle.findIndex(x=>x.text === this.employeeViewModel[i].JobTitle) === -1){
        this.holdItJobTitle.push(
          {
            text:this.employeeViewModel.map(title=>title.JobTitle).filter((value,index,self)=>self.indexOf(value)===index)[i],
            value:this.employeeViewModel.map(title=>title.JobTitle).filter((value,index,self)=>self.indexOf(value)===index)[i]
          }
        )
          }
        }
        }
        for(let i=0; i < this.employeeViewModel.length;i++){
          if(this.employeeViewModel[i].Status){
        if(this.holdItStatus.findIndex(x=>x.text === this.employeeViewModel[i].Status) === -1){
        this.holdItStatus.push(
          {
            text:this.employeeViewModel.map(status=>status.Status).filter((value,index,self)=>self.indexOf(value)===index)[i],
            value:this.employeeViewModel.map(status=>status.Status).filter((value,index,self)=>self.indexOf(value)===index)[i]
          }
        )
        }
      }
        }
        for(let i=0; i < this.employeeViewModel.length;i++){
          if(this.employeeViewModel[i].JoiningDate){
          if(this.holdItJoiningDate.findIndex(x=>x.text === this.employeeViewModel[i].JoiningDate) === -1){
          this.holdItJoiningDate.push(
            {
              text:this.employeeViewModel.map(joindate=>joindate.JoiningDate).filter((value,index,self)=>self.indexOf(value)===index)[i],
              value:this.employeeViewModel.map(joindate=>joindate.JoiningDate).filter((value,index,self)=>self.indexOf(value)===index)[i]
            }
          )
          }
         }
        }

        this.empListCountry= this.holdItCountry,
        this.empListStatus=this.holdItStatus,
        this.empListJobType=this.holdItJobTitle,
        this.empJoinDate = this.holdItJoiningDate,

        this.listOfColumns = [
          {
            name: 'Job Title',
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
    this.employeeViewModels$ = this._employeeService.SearchEmployeeData(this.employeeParams);
  }
  searchEmployees() {
    if(this.fullname.length > 2 || this.fullname == ""){
    this.employeeParams.searchKey = this.fullname;
    this.employeeViewModels$ = this._employeeService.SearchEmployeeData(this.employeeParams);
    }
  }


  Edit(employeeGuid : string)
  {
  //not implemented
  }

  Delete(employeeGuid : string)
  {
  //not implemented
  }
}

