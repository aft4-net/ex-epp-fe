import { BehaviorSubject, Observable } from 'rxjs';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { PaginatedResult } from '../models/PaginatedResult';
import { Router } from '@angular/router';
import { TimesheetApproval } from '../models/timesheetModels';
import { TimesheetService } from '../timesheet/services/timesheet.service';
import { delay } from 'rxjs/operators';

interface ItemData {
  id: number,
  name: string;
  dateRange: string;
  projectName: number;
  clientName: string;
  hours: number,
  status: string
}


@Component({
  selector: 'exec-epp-timesheet-approval',
  templateUrl: './timesheet-approval.component.html',
  styleUrls: ['./timesheet-approval.component.scss']
})
export class TimesheetApprovalComponent implements OnInit {
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
  listOfCurrentPageData: readonly ItemData[] = [];
  listOfData: readonly ItemData[] = [];
  setOfCheckedId = new Set<string>();
  public arrayOfCheckedId:string[] =[];

  //setOfCheckedId:Set<Number>;

  ids: number[]=[];
  resources: any;

  // variables for generic method
    pageSizeG = 10;
    pageIndexG = 1;
    statusG = '';
    searchKeyG :string | null = null;
    sortByG = '';
    projectNameG = '';
    clientNameG = '';
    weekG = '';
    sortG = 'Ascending';

    // response
    TimesheetApprovalResponse!: TimesheetApproval[];
    totalResponse!: number;
    totalPageResponse!: number;
  // end of generic variables

  constructor(
    private router: Router,
    private timeSheetService: TimesheetService,
    private http: HttpClient
  ) { }



  ngOnInit(): void {

    console.log('direct');
    this.initialDataforTab();
  }

  timesheetSubmissionPagination(pageIndex: number,pageSize: number,
    searchKey: string,sortBy: string,projectName:string,
    clientName: string, week: string, sort: string ,status:string) {

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

      this.searchKeyG?this.searchKeyG:'',

      this.sortByG,

      this.projectNameG,

      this.clientNameG,this.weekG,this.sortG,this.statusG);
    this.loading = false;
  }

initialDataforTab() {
  this.statusG = 'Requested';

      this.timesheetSubmissionPagination(this.pageIndexG,this.pageSizeG,this.searchKeyG?this.searchKeyG:'',

        this.sortByG,this.projectNameG,this.clientNameG,

        this.weekG,this.sortG,this.statusG);
}

  onAllTabClick() {
    this.statusG = '';
    this.timesheetSubmissionPagination(this.pageIndexG,this.pageSizeG,this.searchKeyG?this.searchKeyG:'',

        this.sortByG,this.projectNameG,this.clientNameG,

        this.weekG,this.sortG,this.statusG);

  }

  onAwaitingTabClick() {
    this.statusG = 'Requested';
    this.timesheetSubmissionPagination(this.pageIndexG,this.pageSizeG,this.searchKeyG?this.searchKeyG:'',

        this.sortByG,this.projectNameG,this.clientNameG,

        this.weekG,this.sortG,this.statusG);

  }

  onApprovedTabClick() {
    this.statusG = 'Approved';
    this.timesheetSubmissionPagination(this.pageIndexG,this.pageSizeG,this.searchKeyG?this.searchKeyG:'',

        this.sortByG,this.projectNameG,this.clientNameG,

        this.weekG,this.sortG,this.statusG);

  }

  onReviewTabClick() {
    this.statusG = 'Rejected';
    this.timesheetSubmissionPagination(this.pageIndexG,this.pageSizeG,this.searchKeyG?this.searchKeyG:'',

        this.sortByG,this.projectNameG,this.clientNameG,

        this.weekG,this.sortG,this.statusG);

  }


test() {
  console.log("clicked");
}
  timesheetBulkApproval(arrayOfIds:any[]){
    this.timeSheetService.updateTimeSheetStatus(arrayOfIds);
    console.log("service"+arrayOfIds);
  }

  getweek(result: Date): void {
    console.log('week: ');
  }


  onTabSelected(tab: any) {
    console.log(tab);
    if (tab === 1) {
      // this.currentNameSubject$.next(true);
    }
    else {
      // this.currentNameSubject$.next(false);
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

      this.timesheetSubmissionPagination(this.pageIndexG,this.pageSizeG,this.searchKeyG?this.searchKeyG:'',

        this.sortByG,this.projectNameG,this.clientNameG,

        this.weekG,this.sortG,this.statusG);
        console.log(sortIndex+" came");
  }



  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
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
    //delay(3000);
    console.log("This"+this.timeSheetApprovalAwaiting);



  }
  SearchByResourceName()
  {
    if(!this.searchKeyG){

    //  return

    }else if(this.searchKeyG.length<2)
    {
      return
    }


    if(this.tabselected==0)
    {
      console.log("jijisjssss");

      this.timesheetSubmissionPagination(this.pageIndexG,

        this.pageSizeG,

        this.searchKeyG?this.searchKeyG:'',

        this.sortByG,

        this.projectNameG,

        this.clientNameG,this.weekG,this.sortG,this.statusG);
      // this.timesheetApprovalPaginationAll(1,10,'',this.searchKeyG?this.searchKeyG:'');
    }
    else if(this.tabselected==1)
    {

      console.log("tab 1 selected")
      this.timesheetSubmissionPagination(this.pageIndexG,

        this.pageSizeG,

        this.searchKeyG?this.searchKeyG:'',

        this.sortByG,

        this.projectNameG,

        this.clientNameG,this.weekG,this.sortG,this.statusG);
      // this.timesheetSubmissionPaginationAwaiting(1,10,'Requested',this.searchKeyG?this.searchKeyG:'');

    }
    else if(this.tabselected==2)
    {
      console.log("tab 2 selected")
      this.timesheetSubmissionPagination(this.pageIndexG,

        this.pageSizeG,

        this.searchKeyG?this.searchKeyG:'',

        this.sortByG,

        this.projectNameG,

        this.clientNameG,this.weekG,this.sortG,this.statusG);
      // this.timesheetSubmissionPaginationApproved(1,10,'Approved',this.searchKeyG?this.searchKeyG:'');

    }
    else if(this.tabselected==3)
    {
      console.log("tab 3 selected")
      this.timesheetSubmissionPagination(this.pageIndexG,

        this.pageSizeG,

        this.searchKeyG?this.searchKeyG:'',

        this.sortByG,

        this.projectNameG,

        this.clientNameG,this.weekG,this.sortG,this.statusG);
      // this.timesheetSubmissionPaginationReview(1,10,'Rejected',this.searchKeyG?this.searchKeyG:'');

    }



  }
}
