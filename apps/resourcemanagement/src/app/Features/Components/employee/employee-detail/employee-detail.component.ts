import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Data, Router } from '@angular/router';
import { Observable, fromEvent, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';

import { ColumnItem } from'../../../Models/EmployeeColumnItem';
import { EmployeeParams } from '../../../Models/Employee/EmployeeParams';
import { EmployeeService } from '../../../Services/Employee/EmployeeService';
import { IEmployeeViewModel } from '../../../Models/Employee/EmployeeViewModel';
import { NzConfigService } from 'ng-zorro-antd/core/config';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTableFilterList } from 'ng-zorro-antd/table';
import { ResponseDTO } from '../../../Models/response-dto.model';
import { data } from 'autoprefixer';
import { listtToFilter } from '../../../Models/listToFilter';
import { PaginationResult } from '../../../Models/PaginationResult';
import { Employee } from '../../../Models/Employee';
import { FormGenerator } from '../../custom-forms-controls/form-generator.model';
import { PermissionService } from 'libs/common-services/permission.service';

@Component({
  selector: 'exec-epp-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {

  @ViewChild('searchInput', { static: true })
  input!: ElementRef;
  employeeByID!: Employee;

  constructor(
    private _employeeService : EmployeeService,
    private _form: FormGenerator,
    private _router: Router, 
    private _permissionService: PermissionService
    ) {}

    isdefault = true;
    router="";
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
  canViewEmployeeDetail = false;
  canDeleteEmployee = false;

  //added by simbo just you remove

  isVisible = false;
  isConfirmLoading = false;

  listOfColumnsFullName : ColumnItem<IEmployeeViewModel>[] = [
    {
      name: 'Employee',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: IEmployeeViewModel, b: IEmployeeViewModel) => a.FullName.localeCompare(b.FullName),
      filterMultiple: false,
      listOfFilter: [

      ],
      filterFn: null
    },
    {
      name: 'Joining Date',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: IEmployeeViewModel, b: IEmployeeViewModel) => a.JoiningDate.localeCompare(b.JoiningDate),
      filterMultiple: true,
      listOfFilter:this.empJoinDate,
      filterFn: (list: string[], item: IEmployeeViewModel) => list.some(name => item.JoiningDate.indexOf(name) !== -1)
    }
  ];

  listOfColumns : ColumnItem<IEmployeeViewModel>[] = [];

  PopulateFilterColumns() : ColumnItem<IEmployeeViewModel>[] {
    return this.listOfColumns = [
      {
        name: 'Job Title',
        sortOrder: null,
        sortDirections: ['ascend', 'descend', null],
        sortFn: (a: IEmployeeViewModel, b: IEmployeeViewModel) => a.JobTitle.localeCompare(b.JobTitle),
        filterMultiple: true,
        listOfFilter: [],
        filterFn: (list: string[], item: IEmployeeViewModel) => list.some(name => item.JobTitle.indexOf(name) !== -1)
      },
      {
        name: 'Location',
        sortOrder: null,
        sortDirections: ['ascend', 'descend', null],
        sortFn: (a: IEmployeeViewModel, b: IEmployeeViewModel) => a.Location.localeCompare(b.Location),
        filterMultiple: true,
        listOfFilter: [],
        filterFn: (list: string[], item: IEmployeeViewModel) => list.some(name => item.Location.indexOf(name) !== -1)
      },
      {
        name: 'Status',
        sortOrder: null,
        sortDirections: ['ascend', 'descend', null],
        sortFn: (a: IEmployeeViewModel, b: IEmployeeViewModel) => a.Status.localeCompare(b.Status),
        filterMultiple: true,
        listOfFilter: [],
        filterFn: (list: string[], item: IEmployeeViewModel) => list.some(name => item.Status.indexOf(name) !== -1)
      }
    ];
  }

  ngOnInit(): void {
    this.PopulateFilterColumns();
    this.employeeViewModel as IEmployeeViewModel[];
    this.FeatchAllEmployees();
    //alert(this._permissionService.authorizedPerson('View_Employee')); 
    if((this._permissionService.authorizedPerson('View_Employee') || this._permissionService.authorizedPerson('Employee_Admin'))) {
      this.canViewEmployeeDetail = true;
    }

    if((this._permissionService.authorizedPerson('Delete Employee') || this._permissionService.authorizedPerson('Employee_Admin'))) {
      this.canDeleteEmployee = true;
    }
    // alert(this.canDeleteEmployee);
    // alert(this.canViewEmployeeDetail);
  }

  FillTheFilter() {
    this.holdItJobTitle.length = 0;
    this.holdItStatus.length = 0;
    this.holdItCountry.length = 0;
    this.employeeViewModels$.subscribe(
       val => {
        if(val.length > 0) {
          this.employeeViewModel = val
          for(let i=0; i < this.employeeViewModel.length;i++){
            if(this.holdItCountry.findIndex(x=>x.text === this.employeeViewModel[i].Location.trim()) === -1 ){
                this.holdItCountry.push(
                {
                  text: this.employeeViewModel.map(country=>country.Location)[i],
                  value:this.employeeViewModel.map(country=>country.Location)[i]
                })
              }
          }
          for(let i=0; i < this.employeeViewModel.length;i++){
            if(this.holdItJobTitle.findIndex(x=>x.text === this.employeeViewModel[i].JobTitle.trim()) === -1){
              this.holdItJobTitle.push(
                {
                  text:this.employeeViewModel.map(title=>title.JobTitle)[i],
                  value:this.employeeViewModel.map(title=>title.JobTitle)[i]
                }
              )
            }

          }
          for(let i=0; i < this.employeeViewModel.length;i++){
              if(this.holdItStatus.findIndex(x=>x.text === this.employeeViewModel[i].Status.trim()) === -1){
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
          this.empJoinDate = this.holdItJoinDate
          if(this.listOfColumns.length == 0)
          {
            this.PopulateFilterColumns();
          }
      }
      else
      {
        this.PopulateFilterColumns();
      }
    },error => {
      this.PopulateFilterColumns();
    });
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
      .forEach(({ EmployeeGUid }) => this.updateCheckedSet(EmployeeGUid, checked));
    this.refreshCheckedStatus();
  }

  FeatchAllEmployees() {
    this.loading = true;
    this._employeeService.SearchEmployeeData(this.employeeParams).subscribe((response:PaginationResult<IEmployeeViewModel[]>) => {
      if(response.Data) {
        this.employeeViewModels$=of(response.Data);
        this.employeeViewModel = response.Data;
        this.listOfCurrentPageData = response.Data;
        this.pageIndex=response.pagination.PageIndex;
        this.pageSize=response.pagination.PageSize;
        this.totalRecord=response.pagination.TotalRecord
        this.totalRows=response.pagination.TotalRows;
        this.lastRow = this.totalRows;
        this.beginingRow = 1;
        this.FillTheFilter();
        this.loading = false;
      }
      else
      {
        this.loading = false;
        this.employeeViewModel = [];
        this.employeeViewModels$=of([]);
        this.FillTheFilter();
      }

    },error => {
      this.loading = false;
      this.PopulateFilterColumns();
     });
    this.searchStateFound=false;
  }

  searchEmployees() {
    if(this.fullname.length > 2 || this.fullname == ""){
      this.employeeParams.searchKey = this.fullname;
      this._employeeService.SearchEmployeeData(this.employeeParams)
      .subscribe((response: PaginationResult<IEmployeeViewModel[]>) => {
        if(response.Data) {
          this.employeeViewModels$=of(response.Data);
          this.employeeViewModel = response.Data;
          this.listOfCurrentPageData = response.Data;
          this.pageIndex=response.pagination.PageIndex;
          this.pageSize=response.pagination.PageSize;
          this.totalRecord=response.pagination.TotalRecord
          this.totalRows=response.pagination.TotalRows;
          this.lastRow = this.totalRows;
          this.beginingRow = 1;
          this.FillTheFilter();
          this.loading = false;
        }
        else
        {
          this.loading = false;
          this.employeeViewModel = [];
          this.employeeViewModels$=of([]);
          this.FillTheFilter();
        }
      },error => {
        this.loading = false;
        this.PopulateFilterColumns();
       }
      );
      this.searchStateFound=true;
    }
  }

  Edit(employeeId:string):void
  {
    this._form.employeId=employeeId;
    this._employeeService.getEmployeeData(employeeId).subscribe((data:any)=>{
      this._employeeService.setEmployeeDataForEdit(data);
    if(this._employeeService.employeeById)
   {
    this._employeeService.isEdit=true;
    this._employeeService.save="Update";
    this._form.generateForms;
    this._form.generateForms(this._employeeService.employeeById);
    this._form.allAddresses=this._employeeService.employeeById?.EmployeeAddress?
      this._employeeService.employeeById?.EmployeeAddress:[];
      this._form.allFamilyDetails=this._employeeService.employeeById?.FamilyDetails?
      this._employeeService.employeeById?.FamilyDetails:[];
    this._employeeService.isdefault=false
    this._router.navigate(['/resourcemanagement/personal-info']);
  }
    });

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

  PageIndexChange(index: any): void {
    this.loading =true;
    this.employeeParams.pageIndex = index;
    this.employeeParams.searchKey = this.fullname ?? "";
    if(this.searchStateFound == true)
    {
      this._employeeService.SearchEmployeeData(this.employeeParams).subscribe(
        (response:PaginationResult<IEmployeeViewModel[]>)=>{
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
      this.loading = false;
    }
  }

  Delete(employeeGuid : string) {
  }
}
