/* eslint-disable @nrwl/nx/enforce-module-boundaries */

import { BehaviorSubject, Observable } from 'rxjs';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TimesheetApproval, TimesheetApprovalProjectDetails } from '../models/timesheetModels';

import { CommonDataService } from 'libs/common-services/commonData.service';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { PaginatedResult } from '../models/PaginatedResult';
import { Router } from '@angular/router';
import { TimesheetService } from '../timesheet/services/timesheet.service';
import { delay } from 'rxjs/operators';
import { PermissionListService } from 'libs/common-services/permission.service';

@Component({
  selector: 'exec-epp-timesheet-approval',
  templateUrl: './timesheet-approval.component.html',
  styleUrls: ['./timesheet-approval.component.scss']
})
export class TimesheetApprovalComponent implements OnInit {
  private fristPagantionProjectsSource=  new BehaviorSubject<TimesheetApproval[]>([]);
   fristPagantionProjects$ = this.fristPagantionProjectsSource.asObservable();
  tabselected = 1;
  date = null;
  bulkCheck = true;
  statusColumn = true;
  cols: TemplateRef<any>[] = [];
   currentNameSubject =  new BehaviorSubject<boolean>(true);
   currentNameSubject$ = this.currentNameSubject.asObservable();

  qtyofItemsSelected = 0
  searchProject = new FormControl();
  isVisible = false;
  isOkLoading = false;


  timeSheetApproval!: TimesheetApproval[];
  timeSheetApprovalAll!: TimesheetApproval[];
  totalAll = 10;
  pageIndexAll = 1;
  pageSizeAll = 10;
  totalPageAll!: number;
  totalRecordsAll = 10;

  timeSheetApprovalAwaiting!: TimesheetApproval[];
  totalAwaiting = 10;
  pageIndexAwaiting = 1;
  pageSizeAwaiting = 10;
  totalPageAwaiting!: number;
  totalRecordsAwaiting = 10;

  timeSheetApprovalApproved!: TimesheetApproval[];
  totalApproved = 10;
  pageIndexApproved = 1;
  pageSizeApproved = 10;
  totalPageApproved!: number;
  totalRecordsApproved = 10;

  timeSheetApprovalReview!: TimesheetApproval[];
  totalReview = 10;
  pageIndexReview = 1;
  pageSizeReview = 10;
  totalPageReview!: number;
  totalRecordsReview = 10;

  loading = true;

  idParam = '';
  totalPage!: number;

  //table
  params!: NzTableQueryParams;
  timeSheetHistory!: TimesheetApproval[];
  total = 10;
  pageIndex = 1;
  pageSize = 10;

  sortByParam = "";
  sortDirection = "Ascending";

  checked = false;
  indeterminate = false;
  setOfCheckedId = new Set<string>();
  public arrayOfCheckedId:string[] =[];

  //setOfCheckedId:Set<Number>;

  ids: number[]=[];
  resources: any;

  // variables for generic method
    // variables for generic method
    // variables for generic method
  // variables for generic method
    supervisorId!: string | null;
    pageSizeG = 7;
    pageIndexG = 1;
    statusG = '';
    // searchKeyG :string | null = null;
    sortByG = '';
    // weekG = '';
    sortG = 'Ascending';
    searchKeyGBinded :string | null = null;
    searchKeyG = '';
    weekGBinded: Date | null = null;
    weekG = '';
    projectNameG?:  string[];
    clientNameG?: string[];  


    filteredClientNamesList: { text: string; value: string ; checked:boolean;}[] = [] as {
      text: string;
      value: string;
      checked:boolean;
    }[];
    // response
    TimesheetApprovalResponse!: TimesheetApproval[];
    totalResponse!: number;
    totalPageResponse!: number;
    onwaiting=1;
  loggedInUserInfo?: any; 
  filteredProjectNamesLists: { text: string; value: string ; checked:boolean;}[] = [] as {
    text: string;
    value: string;
    checked:boolean;
  }[];
  // end of generic variables

  constructor(
    private router: Router,
    private timeSheetService: TimesheetService,
    private http: HttpClient,
    private notification:NzNotificationService,
    public _commonData:CommonDataService,
    private _permissionService:PermissionListService,
  ) { }



  ngOnInit(): void {
    this.getCurrentUser();
    this.initialDataforTab();    
    this._commonData.getPermission();
    this.getProjectsList();
    this.getClientsList();

  }
getCurrentUser(){
  if(localStorage.getItem('loggedInUserInfo')){
    // eslint-disable-next-line prefer-const
    this.loggedInUserInfo = localStorage.getItem('loggedInUserInfo');
    const user = JSON.parse(this.loggedInUserInfo);
    this.supervisorId = user['EmployeeGuid'];
  }
}
getProjectsList() {
  const names = this.timeSheetService.getProjectsList().subscribe(
    result => {
      this.filteredProjectNamesLists=result;
      console.log(result);
    }
  )
  
}

getClientsList() {
  const names = this.timeSheetService.getClientsList().subscribe(
    result => {
      this.filteredClientNamesList=result;
      console.log(result);
    }
  )
  
}
authorize(key:string){
     
  return this._permissionService.authorizedPerson(key);
}

  timesheetSubmissionPagination(pageIndex: number,pageSize: number,
    searchKey: string,sortBy: string, week: string, sort: string ,status:string,projectName?: string[],
    clientName?: string[]) {

    this.pageIndexG = pageIndex;
    this.pageSizeG = pageSize;
    this.searchKeyG =searchKey;
    this.sortByG = sortBy;
    this.projectNameG = projectName;
    this.clientNameG = clientName;
    this.weekG = week;
    this.sortG = sort;
    this.statusG = status;
    if(this.authorize('Timesheet_Admin')){
      this.supervisorId = ''
    }
   else{
      if(localStorage.getItem('loggedInUserInfo')){
        // eslint-disable-next-line prefer-const
        this.loggedInUserInfo = localStorage.getItem('loggedInUserInfo');
        const user = JSON.parse(this.loggedInUserInfo);
        this.supervisorId = user['EmployeeGuid'];
      }
    }

    this.timeSheetService

      .getTimesheetApprovalPagination(
         this.pageIndexG,
         this.pageSizeG,
         this.supervisorId,
         this.searchKeyG,
         this.sortByG,
         this.projectNameG,
         this.clientNameG,
         this.weekG,
         this.sortG,
         this.statusG

      )

      .subscribe((response: PaginatedResult<TimesheetApproval[]>) => {

        this.TimesheetApprovalResponse = response.data;

        this.pageIndexG = response.pagination.pageIndex;

        this.pageSizeG = response.pagination.pageSize;

        this.totalRecordsAll = response.data.length;

        this.totalResponse = response.pagination.totalRecord;

        this.totalPageResponse = response.pagination.totalPage;

      });

  }

  PageIndexChangeG(index: number): void {
    this.pageIndexG = index;
    this.UpdateData();
    this.loading = false;
  }

initialDataforTab() {
  this.statusG = 'Requested';

  this.UpdateData();
}

  onAllTabClick() {
    this.stateReset();   
    this.statusG = '';
    this.UpdateData();

  }

  onAwaitingTabClick() {
    this.stateReset();
    this.statusG = 'Requested';
    this.UpdateData();
  }

  onApprovedTabClick() {
    this.stateReset();
    this.statusG = 'Approved';
    this.UpdateData();

  }

  onReviewTabClick() {
   
    this.stateReset();
    this.statusG = 'Rejected';
    this.UpdateData();

   

  }


test() {
  console.log("clicked");
}
  timesheetBulkApproval(arrayOfIds:any[]){
    this.timeSheetService.updateTimeSheetStatus(arrayOfIds).subscribe((response:any)=>{
      if (response.ResponseStatus.toString() == 'Success') {
        this.notification.success("Bulk approval successfull","", { nzPlacement: 'bottomRight' });
        this.onAwaitingTabClick();
      }
      else{
        this.notification.error("Bulk approval is not successfull","", { nzPlacement: 'bottomRight' });
      }
    });
    console.log("service"+arrayOfIds);
  }

  getweek(result: Date): void {
    console.log('week: ');
     }


  onTabSelected(tab: any) {    
    if (tab == 1) {
      this.currentNameSubject.next(true);     
    }
    else {
      this.currentNameSubject.next(false);
    }
  }

onItemCheckStatusChange(event: number){
  this.qtyofItemsSelected = event;
}
updateProjectResourseList(resources: any) {
  this.resources = resources;
  console.log(this.resources);
}

emitArray(evt:Set<string>){
  if(evt){
    this.setOfCheckedId=evt;
    console.log(this.setOfCheckedId);
  }

}

sorterDirection(sortIndex: string) {
  console.log('emitter');
  if (sortIndex === 'Descending') {
    this.sortDirection = 'Ascending';
    console.log(this.sortDirection);
  } else {
    this.sortDirection = 'Descending';
    console.log(this.sortDirection);
  }
}

sortDirectionMethod() {
  if (this.sortDirection === 'Descending') {
    this.sortDirection = 'Ascending';
    this.sortG = this.sortDirection;


  } else if (this.sortDirection === 'Ascending') {
    this.sortDirection = 'Descending';
    this.sortG = this.sortDirection;
    console.log(this.sortDirection);
  }
}

  sorter(sortIndex: string) {
    this.sortDirectionMethod();
    this.sortByG = sortIndex;
    this.UpdateData();
  }

  FilterByProject(ProjectName:string[]) {
    this.sortDirectionMethod();   

    this.projectNameG = ProjectName;
   
    this.UpdateData();
  }

  FilterByClient(ProjectName:string[]) {
    this.sortDirectionMethod(); 
    this.clientNameG = ProjectName;
    this.UpdateData();
  }


  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 3000);
  }

  stateReset():void
  {

    this.sortByG = '';

    this.pageIndexG=1;

      this.pageSizeG=7;

      this.searchKeyG='';

      this.sortByG='';

     this.weekG='';
     this.sortG=''

     this.projectNameG=[] ;

     this.clientNameG=[];
  }
  handleCancel(): void {
    this.isVisible = false;
  }
  statusChanged(row:any)
  {
  
   if(this.tabselected===1)
   {
    this.onAwaitingTabClick();
   }
   else    if(this.tabselected===0)
    {
      this.onAllTabClick();
    }
  }
  onApprove(){

    for (const element of this.setOfCheckedId) {     
      this.arrayOfCheckedId.push(element);     
    }

    this.timesheetBulkApproval(this.arrayOfCheckedId);    
    this.arrayOfCheckedId.length=0;
    this.qtyofItemsSelected = 0;    
  }


    onSearchChange() {
      if(this.searchKeyGBinded) {
        if(this.searchKeyGBinded.length >= 2) {
          this.searchKeyG = this.searchKeyGBinded
          this.UpdateData();
        } 
        else {
          this.searchKeyG = '';
          this.UpdateData();
        }
      }    
    }

  onWeekChange() {
    this.weekG = this.weekGBinded?this.weekGBinded.toISOString():'';
    this.UpdateData();
  }

  UpdateData()
  {
    this.timesheetSubmissionPagination(
     this.pageIndexG,
     this.pageSizeG,
     this.searchKeyG,
     this.sortByG,
     this.weekG,
     this.sortG,
     this.statusG,
     this.projectNameG,
     this.clientNameG);

  }
}
