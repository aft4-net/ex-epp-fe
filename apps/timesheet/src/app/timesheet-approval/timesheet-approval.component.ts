import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
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

  timeSheetApprovalAwaiting!: TimesheetApproval[];
  totalAwaiting = 10;
  pageIndexAwaiting = 1;
  pageSizeAwaiting = 10;
  totalPageAwaiting!: number;

  timeSheetApprovalApproved!: TimesheetApproval[];
  totalApproved = 10;
  pageIndexApproved = 1;
  pageSizeApproved = 10;
  totalPageApproved!: number;

  timeSheetApprovalReview!: TimesheetApproval[];
  totalReview = 10;
  pageIndexReview = 1;
  pageSizeReview = 10;
  totalPageReview!: number;

  loading = true;

  idParam = '';
  totalPage!: number;

  //table

  total = 10;
  pageIndex = 1;
  pageSize = 10;

  sortByParam = "";
  sortDirection = "asc";

  checked = false;
  indeterminate = false;
  listOfCurrentPageData: readonly ItemData[] = [];
  listOfData: readonly ItemData[] = [];
  setOfCheckedId = new Set<number>();
  public arrayOfCheckedId:number[] =[];
  //setOfCheckedId:Set<Number>;
 
  ids: number[]=[];
  resources: any;
  employees = [
    { 
      //id:"13c41ba7-7b09-40b5-9e09-8869dc222ae4",
      id: 1,
      name: 'yosef',
      dateRange: Date.now(),
      projectName: 'HR Module',
      clientName: 'Connect+',
      hours: 8,
      status: 'Request for review'
    },
    {
      //id:"14c41ba7-7b09-40b5-9e09-8869dc222ae4",
      id: 2,
      name: 'Daniel James',
      dateRange: Date.now(),
      projectName: 'Finanace Module',
      clientName: 'Security Finance',
      hours: 12,
      status: 'Awaiting Approval'
    },
    {
      id: 3,
      //id:"15c41ba7-7b09-40b5-9e09-8869dc222ae4",
      name: 'Abel',
      dateRange: Date.now(),
      projectName: 'Test',
      clientName: 'test',
      hours: 20,
      status: 'Approved'
    },
    {
      id: 4,
      //d:"16c41ba7-7b09-40b5-9e09-8869dc222ae4",
      name: 'hana',
      dateRange: Date.now(),
      projectName: 'test',
      clientName: 'test',
      hours: 10,
      status: 'Approved'
    },
    {
      id: 5,
      //id:"17c41ba7-7b09-40b5-9e09-8869dc222ae4",
      name: 'yosef',
      dateRange: Date.now(),
      projectName: 'HR Module',
      clientName: 'Connect+',
      hours: 8,
      status: 'Request for review'
    },
    {
      id: 6,
      //id:"18c41ba7-7b09-40b5-9e09-8869dc222ae4",
      name: 'Daniel',
      dateRange: Date.now(),
      projectName: 'Finanace Module',
      clientName: 'Security Finance',
      hours: 12,
      status: 'Awaiting Approval'
    },
    {
      id: 7,
      //id:"19c41ba7-7b09-40b5-9e09-8869dc222ae4",
      name: 'Abel',
      dateRange: Date.now(),
      projectName: 'Test',
      clientName: 'test',
      hours: 20,
      status: 'Approved'
    },
    {
      id: 8,
      //id:"20c41ba7-7b09-40b5-9e09-8869dc222ae4",
      name: 'hana',
      dateRange: Date.now(),
      projectName: 'test',
      clientName: 'test',
      hours: 10,
      status: 'Approved'
    },
    {
      id: 9,
      //id:"21c41ba7-7b09-40b5-9e09-8869dc222ae4",
      name: 'Daniel',
      dateRange: Date.now(),
      projectName: 'Finanace Module',
      clientName: 'Security Finance',
      hours: 12,
      status: 'Awaiting Approval'
    },
    {
      id: 10,
      //id:"22c41ba7-7b09-40b5-9e09-8869dc222ae4",
      name: 'Abel',
      dateRange: Date.now(),
      projectName: 'Test',
      clientName: 'test',
      hours: 20,
      status: 'Approved'
    },
    {
      id: 11,
      //id:"23c41ba7-7b09-40b5-9e09-8869dc222ae4",
      name: 'hana',
      dateRange: Date.now(),
      projectName: 'test',
      clientName: 'test',
      hours: 10,
      status: 'Approved'
    }
  ];

  constructor(
    private router: Router,
    private timeSheetService: TimesheetService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.timesheetSubmissionPaginationAwaiting(1, 10);
  }

  timesheetApprovalPaginationAll(index: number, pageSize: number) {
    this.timeSheetService
      .getTimesheetApprovalPagination(index, pageSize)
      .subscribe((response: PaginatedResult<TimesheetApproval[]>) => {
        this.timeSheetApprovalAll = response.data;
        this.pageIndexAll = response.pagination.pageIndex;
        this.pageSizeAll = response.pagination.pageSize;
        this.totalAll = response.pagination.totalRecord;
        this.totalPageAll = response.pagination.totalPage;
      });
  }

  timesheetSubmissionPaginationAwaiting(index: number, pageSize: number) {
    this.timeSheetService
      .getTimesheetApprovalPagination(index, pageSize)
      .subscribe((response: PaginatedResult<TimesheetApproval[]>) => {
        this.timeSheetApprovalAwaiting = response.data;
        this.pageIndexAwaiting = response.pagination.pageIndex;
        this.pageSizeAwaiting = response.pagination.pageSize;
        this.totalAwaiting = response.pagination.totalRecord;
        this.totalPageAwaiting = response.pagination.totalPage;
      });
  }

  timesheetSubmissionPaginationApproved(index: number, pageSize: number) {
    this.timeSheetService
      .getTimesheetApprovalPagination(index, pageSize)
      .subscribe((response: PaginatedResult<TimesheetApproval[]>) => {
        this.timeSheetApprovalApproved = response.data;
        this.pageIndexApproved = response.pagination.pageIndex;
        this.pageSizeApproved = response.pagination.pageSize;
        this.totalApproved = response.pagination.totalRecord;
        this.totalPageApproved = response.pagination.totalPage;
      });
  }

  timesheetSubmissionPaginationReview(index: number, pageSize: number) {
    this.timeSheetService
      .getTimesheetApprovalPagination(index, pageSize)
      .subscribe((response: PaginatedResult<TimesheetApproval[]>) => {
        this.timeSheetApprovalReview = response.data;
        this.pageIndexReview = response.pagination.pageIndex;
        this.pageSizeReview = response.pagination.pageSize;
        this.totalReview = response.pagination.totalRecord;
        this.totalPageReview = response.pagination.totalPage;
      });
  }
test() {
  console.log("clicked");
}
  timesheetBulkApproval(arrayOfIds:number[]){
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

  PageIndexChange(index: any): void {
    this.pageIndex = index;
    this.loading = true;
    this.timesheetApprovalPaginationAll(index, 10);
    this.loading = false;
  }

emitArray(evt:Set<number>){
  if(evt){
    this.setOfCheckedId=evt;
    ///this.arrayOfCheckedId= evt; 
    console.log(this.setOfCheckedId);
  }
 
}

  // onCurrentPageDataChange($event: readonly ItemData[]): void {
  //   this.listOfCurrentPageData = $event;
  //   this.refreshCheckedStatus();
  // }

  // refreshCheckedStatus(): void {
  //   this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.id));
  //   this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  // }

  sorter(sortIndex: string) {
    if (sortIndex === "name") {
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
      //console.log(this.arrayOfCheckedId);
  }

    this.timesheetBulkApproval(this.arrayOfCheckedId);
    console.log("Approved"+this.arrayOfCheckedId);
    console.log(this.arrayOfCheckedId);
    this.arrayOfCheckedId.length=0;
  }
}
