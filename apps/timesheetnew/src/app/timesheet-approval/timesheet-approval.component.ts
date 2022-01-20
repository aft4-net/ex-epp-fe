import { BehaviorSubject, Observable } from 'rxjs';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TimesheetApproval, TimesheetApprovalProjectDetails } from '../models/timesheetModels';

import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { PaginatedResult } from '../models/PaginatedResult';
import { Router } from '@angular/router';
import { TimesheetService } from '../timesheet/services/timesheet.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'exec-epp-timesheet-approval',
  templateUrl: './timesheet-approval.component.html',
  styleUrls: ['./timesheet-approval.component.scss']
})
export class TimesheetApprovalComponent implements OnInit {
  private fristPagantionProjectsSource=  new BehaviorSubject<TimesheetApproval[]>([]);
fristPagantionProjects$=this.fristPagantionProjectsSource.asObservable();
  tabselected=1;
  date = null;
  bulkCheck = true;
  statusColumn = true;
  cols: TemplateRef<any>[] = [];
  currentNameSubject$ = new BehaviorSubject(true);

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
    filteredProjectNamesList = [
      { text: 'Application Tracking', value: 'Application Tracking', checked: false }
  ,{ text: 'Project Management', value: 'Project Management', checked: false }];



    filteredClientNamesList = [{ text: 'Excellerent1', value: 'Excellerent1', checked: false }];
    // response
    TimesheetApprovalResponse!: TimesheetApproval[];
    totalResponse!: number;
    totalPageResponse!: number;
    onwaiting=1;
  // end of generic variables

  constructor(
    private router: Router,
    private timeSheetService: TimesheetService,
    private http: HttpClient,
    private notification:NzNotificationService
  ) { }



  ngOnInit(): void {
    this.initialDataforTab();

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

    this.timeSheetService

      .getTimesheetApprovalPagination(

        this.pageIndexG,

         this.pageSizeG,

         this.searchKeyG,

         this.sortByG,

         this.projectNameG,

         this.clientNameG,this.weekG,this.sortG,this.statusG

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
    this.timesheetSubmissionPagination(this.pageIndexG,

      this.pageSizeG,

      this.searchKeyG,

      this.sortByG,

     this.weekG,this.sortG,this.statusG,
     this.projectNameG,

     this.clientNameG);
    this.loading = false;
  }

initialDataforTab() {
  this.statusG = 'Requested';

      this.timesheetSubmissionPagination(this.pageIndexG,

        this.pageSizeG,

        this.searchKeyG,

        this.sortByG,

       this.weekG,this.sortG,this.statusG,
       this.projectNameG,

       this.clientNameG);
}

  onAllTabClick() {
    this.stateReset();
    this.statusG = '';

    this.timesheetSubmissionPagination(this.pageIndexG,

      this.pageSizeG,

      this.searchKeyG,

      this.sortByG,

     this.weekG,this.sortG,this.statusG,
     this.projectNameG,

     this.clientNameG);

  }

  onAwaitingTabClick() {
    this.stateReset();
    this.statusG = 'Requested';

    this.timesheetSubmissionPagination(this.pageIndexG,

      this.pageSizeG,

      this.searchKeyG,

      this.sortByG,

     this.weekG,this.sortG,this.statusG,
     this.projectNameG,

     this.clientNameG);


  }

  onApprovedTabClick() {
    this.stateReset();
    this.statusG = 'Approved';

    this.timesheetSubmissionPagination(this.pageIndexG,

      this.pageSizeG,

      this.searchKeyG,

      this.sortByG,

     this.weekG,this.sortG,this.statusG,
     this.projectNameG,

     this.clientNameG);

  }

  onReviewTabClick() {
    this.stateReset();
    this.statusG = 'Rejected';

    this.timesheetSubmissionPagination(this.pageIndexG,

      this.pageSizeG,

      this.searchKeyG,

      this.sortByG,

     this.weekG,this.sortG,this.statusG,
     this.projectNameG,

     this.clientNameG);

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
    console.log(tab);
    if (tab === 1) {
      this.currentNameSubject$.next(true);
    }
    else {
      this.currentNameSubject$.next(false);
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

      this.timesheetSubmissionPagination(this.pageIndexG,

        this.pageSizeG,

        this.searchKeyG,

        this.sortByG,

       this.weekG,this.sortG,this.statusG,
       this.projectNameG,

       this.clientNameG);
  }

  FilterByProject(ProjectName:string[]) {
    this.sortDirectionMethod();
    //p?:Array<{ key: string; value: string[] }>;

      //this.projectNameG?.push({"ProjectName":ProjectName});

    this.projectNameG = ProjectName;
    console.log(ProjectName);
      this.timesheetSubmissionPagination(this.pageIndexG,

        this.pageSizeG,

        this.searchKeyG,

        this.sortByG,

       this.weekG,this.sortG,this.statusG,
       this.projectNameG,

       this.clientNameG);
  }
  FilterByClient(ProjectName:string[]) {
    this.sortDirectionMethod();
    //p?:Array<{ key: string; value: string[] }>;

      //this.projectNameG?.push({"ProjectName":ProjectName});

    this.clientNameG = ProjectName;
    console.log(ProjectName);
      this.timesheetSubmissionPagination(this.pageIndexG,

        this.pageSizeG,

        this.searchKeyG,

        this.sortByG,

       this.weekG,this.sortG,this.statusG,
       this.projectNameG,

       this.clientNameG);
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
   // alert("grand parent");
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
      console.log(element);
      this.arrayOfCheckedId.push(element);
      console.log(this.arrayOfCheckedId);
    }

    this.timesheetBulkApproval(this.arrayOfCheckedId);
    console.log("Approved"+this.arrayOfCheckedId);
    console.log(this.arrayOfCheckedId);
    this.arrayOfCheckedId.length=0;
    console.log("This"+this.timeSheetApprovalAwaiting);
  }


    onSearchChange() {
      if(this.searchKeyGBinded) {
        if(this.searchKeyGBinded.length < 2) {
          this.searchKeyG = '';
        } else {
          this.searchKeyG = this.searchKeyGBinded
        }
      } else {
        this.searchKeyG = '';
      }
      this.UpdateData();
    }

  onWeekChange() {
    this.weekG = this.weekGBinded?this.weekGBinded.toISOString():'';
    this.UpdateData();
  }

  UpdateData()
  {

    if(this.tabselected==0)
    {
      console.log("jijisjssss");

      this.timesheetSubmissionPagination(this.pageIndexG,

        this.pageSizeG,

        this.searchKeyG,

        this.sortByG,

       this.weekG,this.sortG,this.statusG,
       this.projectNameG,

       this.clientNameG);
      // this.timesheetApprovalPaginationAll(1,10,'',this.searchKeyG?this.searchKeyG:'');
    }
    else if(this.tabselected==1)
    {

      console.log("tab 1 selected")
      this.timesheetSubmissionPagination(this.pageIndexG,

        this.pageSizeG,

        this.searchKeyG,

        this.sortByG,

       this.weekG,this.sortG,this.statusG,
       this.projectNameG,

       this.clientNameG);
      // this.timesheetSubmissionPaginationAwaiting(1,10,'Requested',this.searchKeyG?this.searchKeyG:'');

    }
    else if(this.tabselected==2)
    {
      console.log("tab 2 selected")
      this.timesheetSubmissionPagination(this.pageIndexG,

        this.pageSizeG,

        this.searchKeyG,

        this.sortByG,

       this.weekG,this.sortG,this.statusG,
       this.projectNameG,

       this.clientNameG);
      // this.timesheetSubmissionPaginationApproved(1,10,'Approved',this.searchKeyG?this.searchKeyG:'');

    }
    else if(this.tabselected==3)
    {
      console.log("tab 3 selected")
      this.timesheetSubmissionPagination(this.pageIndexG,

        this.pageSizeG,

        this.searchKeyG,

        this.sortByG,

       this.weekG,this.sortG,this.statusG,
       this.projectNameG,

       this.clientNameG);
      // this.timesheetSubmissionPaginationReview(1,10,'Rejected',this.searchKeyG?this.searchKeyG:'');

    }



  }
}
