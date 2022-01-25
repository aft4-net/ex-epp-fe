import { TimesheetApproval } from '../../../models/timesheetModels';
import { Component, OnInit } from '@angular/core';
import {
  NzTableFilterFn,
  NzTableFilterList,
  NzTableQueryParams,
  NzTableSortFn,
  NzTableSortOrder,
} from 'ng-zorro-antd/table';

import { Router } from '@angular/router';
import { TimesheetService } from '../../services/timesheet.service';
import { TimesheetStateService } from '../../state/timesheet-state.service';
import { PermissionListService } from '../../../../../../../libs/common-services/permission.service';

interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<TimesheetApproval> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<TimesheetApproval> | null;
  filterMultiple: boolean;
  sortDirections: NzTableSortOrder[];
}
@Component({
  selector: 'exec-epp-view-submissions',
  templateUrl: './view-submissions.component.html',
  styleUrls: ['./view-submissions.component.scss'],
})
export class ViewSubmissionsComponent implements OnInit {
  date = null;
  userId: string | null = null;
  listOfColumns: ColumnItem[] = [
    {
      name: 'Date Range',
      sortOrder: null,
      sortFn: {} as NzTableSortFn<TimesheetApproval>,
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: false,
      listOfFilter: [] as { text: string; value: string }[],
      filterFn: null,
    },
    {
      name: 'Project Name',
      sortOrder: null,
      sortFn: {} as NzTableSortFn<TimesheetApproval>,
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [] as { text: string; value: string }[],
      filterFn: (list: string[], item: TimesheetApproval) =>
        list.some((name) => item.ProjectName.indexOf(name) !== -1),
    },
    {
      name: 'Client Name',
      sortOrder: null,
      sortFn: {} as NzTableSortFn<TimesheetApproval>,
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [] as { text: string; value: string }[],
      filterFn: (list: string[], item: TimesheetApproval) =>
        list.some((name) => item.ClientName.indexOf(name) !== -1),
    },
    {
      name: 'Hours',
      sortOrder: null,
      sortFn: null,
      sortDirections: [null],
      filterMultiple: false,
      listOfFilter: [],
      filterFn: null,
    },
    {
      name: 'Status',
      sortOrder: null,
      sortFn: {} as NzTableSortFn<TimesheetApproval>,
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [] as { text: string; value: string }[],
      filterFn: (list: string[], item: TimesheetApproval) =>
        list.some((name) => item.Status.toLocaleString().indexOf(name) !== -1),
    },
    {
      name: "Manager's Notes",
      sortOrder: null,
      sortFn: null,
      sortDirections: [null],
      filterMultiple: false,
      listOfFilter: [],
      filterFn: null,
    },
  ];
  timeSheetHistory: any;
  total = 0;
  loading = true;
  pageSize = 9;
  pageIndex = 1;
  idParam = '';
  totalPage!: number;
  dataCount = 0;
  clientNameFliter!: { text: string; value: string }[];
  projectNameFliter!: { text: string; value: string }[];
  statusFilter!: { text: string; value: string }[];
  params!: NzTableQueryParams;
  intialLoad = false;
  constructor(
    private router: Router,
    private timeSheetService: TimesheetService,
    private state: TimesheetStateService,
    private _permissionService:PermissionListService
  ) {
    this.state.setTimesheetPageTitle("View Submissions");
  }

  ngOnInit(): void {
    this.state.setApproval(true);
    this.timesheetSubmissionPaginatin(1, this.pageSize, null, []);

    this.timeSheetService
      .getUserTimesheetApprovalSubmissions(1, this.pageSize, null, null, [])
      .subscribe((response: any) => {
        this.timeSheetHistory = response.data;
        this.dataCount = this.timeSheetHistory.length;
        this.pageIndex = response.pagination.pageIndex;
        this.pageSize = response.pagination.pageSize;
        this.total = response.pagination.totalRecord;
        this.totalPage = response.pagination.totalPage;
        this.listOfColumns[1].listOfFilter = response.projectFilter;
        this.listOfColumns[2].listOfFilter = response.clientFilters;
        this.listOfColumns[4].listOfFilter = response.statusFilter;
        this.loading = false;
      });
  }

  navaigateToTimeSheet() {
    this.router.navigateByUrl('/timesheet');
  }

  timesheetSubmissionPaginatin(
    pageIndex: number,
    sortField: any,
    sortOrder: any,
    filter: any
  ) {
    this.loading = true;
    this.timeSheetService
      .getUserTimesheetApprovalSubmissions(
        pageIndex,
        this.pageSize,
        sortField,
        sortOrder,
        filter
      )
      .subscribe((response: any) => {
        this.timeSheetHistory = response.data;
        this.pageIndex = response.pagination.pageIndex;
        this.pageSize = response.pagination.pageSize;
        this.total = response.pagination.totalRecord;
        this.totalPage = response.pagination.totalPage;
        this.dataCount = this.timeSheetHistory.length;
        this.loading = false;
      });
  }

  getWeek($event: Date) {
    if (this.date) {
      let index = -1;
      for (let i = 0; i < this.params.filter.length; i++)
        if (this.params.filter[i].key == 'DateWeek') index = i;

      if (index != -1) this.params.filter[index].value = $event;
      else this.params.filter.push({ key: 'DateWeek', value: $event });
    } else {
      for (let i = 0; i < this.params.filter.length; i++)
        if (this.params.filter[i].key == 'DateWeek')
          this.params.filter[i].value = null;
    }
    const { pageSize, pageIndex, sort, filter } = this.params;
    const currentSort = sort.find((item) => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;

    this.timesheetSubmissionPaginatin(
      pageIndex,
      sortField,
      sortOrder,
      this.params.filter
    );
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    this.loading = true;
    this.params = params;
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find((item) => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.timesheetSubmissionPaginatin(pageIndex, sortField, sortOrder, filter);
  }

  PageIndexChange(index: number): void {
    this.pageIndex = index;
    const { pageSize, pageIndex, sort, filter } = this.params;
    const currentSort = sort.find((item) => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;

    this.timesheetSubmissionPaginatin(index, sortField, sortOrder, filter);
    this.loading = false;
  }
  reviewsubmissions(date: Date) {
    date = new Date(date);
    this.state.date = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    this.userId = localStorage.getItem('userId');
    if (this.userId) {
      this.state.getTimesheet(this.userId);
      this.router.navigate(['/timesheet']);
    }
  }
  authorize(key: string){
    return this._permissionService.authorizedPerson(key);
  }
}
