import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { PaginatedResult } from '../models/PaginatedResult';
import { TimesheetApproval } from '../models/timesheetModels';
import { TimesheetService } from '../timesheet/services/timesheet.service';

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
  sortDirection = "asc";

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
    searchKeyG = '';
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
    console.log(this.timesheetSubmissionPagination(1,10,'Requested','','Name','','','','Descending'));
  }

  timesheetSubmissionPagination(pageIndex: number,pageSize: number ,status:string,
                                searchKey: string,sortBy: string,projectName:string,
                                clientName: string, week: string, sort: string) {

    this.pageIndexG = pageIndex;
    this.pageSizeG = pageSize;
    this.statusG = status;
    this.searchKeyG =searchKey;
    this.sortByG = sortBy;
    this.projectNameG = projectName;
    this.clientNameG = clientName;
    this.weekG = week;
    this.sortG = sort;

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

      this.projectNameG,

      this.clientNameG,this.weekG,this.sortG,this.statusG);
    this.loading = false;
  }



  onAllTabClick() {
    this.timesheetSubmissionPagination(1,10,'','','','','','','');
  }

  onAwaitingTabClick() {
    this.timesheetSubmissionPagination(1,10,'Requested','','','','','','');
  }

  onApprovedTabClick() {
    this.timesheetSubmissionPagination(1,10,'Approved','','','','','','');
  }

  onReviewTabClick() {
    this.timesheetSubmissionPagination(1,10,'Rejected','','','','','','');
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
// for the table




emitArray(evt:Set<string>){
  if(evt){
    this.setOfCheckedId=evt;
    console.log(this.setOfCheckedId);
  }

}

  

  sorter(sortIndex: string) {

    if (this.sortDirection === 'desc') {
      this.sortDirection = 'Ascending';
    } else {
      this.sortDirection = 'Descending';
    }

    if (sortIndex === "name") {
      this.timesheetSubmissionPagination(this.pageIndexG,this.pageSizeG,this.searchKeyG,

        this.sortByG,this.projectNameG,this.clientNameG,

        this.weekG,this.sortG,'');
      console.log("name came"); //API call
    } else if (sortIndex === "dateRange") {
      console.log("dateRange came"); //API call
    } else if (sortIndex === "projectName") {
      console.log("projectName came"); //API call
    } else if (sortIndex === "clientName") {
      console.log("clientName came"); //API call
    }
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

    for (let element of this.setOfCheckedId) {
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
}
