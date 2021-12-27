import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaginatedResult } from '../../../models/PaginatedResult';
import { TimesheetHistory } from '../../../models/timesheetHistory';
import { TimesheetService } from '../../services/timesheet.service';

@Component({
  selector: 'exec-epp-view-submissions',
  templateUrl: './view-submissions.component.html',
  styleUrls: ['./view-submissions.component.scss'],
})
export class ViewSubmissionsComponent implements OnInit {
  timeSheetHistory!: TimesheetHistory[];
  total = 10;
  loading = true;
  pageSize = 10;
  pageIndex = 1;
  idParam = '';
  totalPage!: number;
  sortByParam = '';
  sortDirection = 'asc';

  constructor(
    private router: Router,
    private timeSheetService: TimesheetService
  ) {}

  ngOnInit(): void {
    this.timeSheetService
      .getTimesheetSubmissionHistory(1, 10)
      .subscribe((response: PaginatedResult<TimesheetHistory[]>) => {
        this.timeSheetHistory = response.data;
        this.pageIndex = response.pagination.pageIndex;
        this.pageSize = response.pagination.pageSize;
        this.total = response.pagination.totalRecord;
        this.totalPage = response.pagination.totalPage;
      });
  }

  navaigateToTimeSheet() {
    this.router.navigateByUrl('timesheet');
  }

  PageIndexChange(index: any): void {
    this.pageIndex = index;
    this.loading = true;
    this.timeSheetService
      .getTimesheetSubmissionHistory(1, 10)
      .subscribe((response: PaginatedResult<TimesheetHistory[]>) => {
        this.timeSheetHistory = response.data;
        this.pageIndex = response.pagination.pageIndex;
        this.pageSize = response.pagination.pageSize;
        this.loading = false;
      });
  }
  statusCSSClass(status: string) {
    return {
      submited: status.localeCompare('Submited') == 0,
      approved: status.localeCompare('Approved') == 0,
      review: status.localeCompare('Request for review') == 0,
    };
  }
  sorter(id: number) {
    if (id === 1) {
      this.sortByParam = 'startDate';
    } else if (id === 2) {
      this.sortByParam = 'projectName';
    } else if (id === 3) {
      this.sortByParam = 'clientName';
    } else if (id === 4) {
      this.sortByParam = 'status';
    }

    if (this.sortDirection === 'desc') {
      this.sortDirection = 'asc';
    } else {
      this.sortDirection = 'desc';
    }
  }
  get sampleData() {
    return [
      {
        startDate:'Dec 13',
        endDate:'Dec 19, 2021' ,
        projectName: 'Fizer',
        clientName: 'Security finance Coperation',
        status: 'Submited',
        managerNote: '',
      },
      {
        startDate:'Dec 13',
        endDate:'Dec 19, 2021',
        projectName: 'Connect Plus',
        clientName: 'Security finance Coperation',
        status: 'Submited',
        managerNote: '',
      },
      {
        startDate:'Dec 13',
        endDate:'Dec 19, 2021',
        projectName: 'Chat Plus',
        clientName: 'Brown finance ',
        status: 'Submited',
        managerNote: '',
      },
      {
        startDate:'Dec 13',
        endDate:'Dec 19, 2021',
        projectName: 'Email Marketing',
        clientName: 'Security finance Coperation',
        status: 'Request for review',
        managerNote: 'Please Re-check it',
      },

      {
        startDate:'Dec 13',
        endDate:'Dec 19, 2021',
        projectName: 'Email Marketing',
        clientName: 'Security finance Coperation',
        status: 'Approved',
        managerNote: '',
      },
      {
        startDate:'Dec 15',
        endDate:'Dec 19, 2021',
        projectName: ' Plus',
        clientName: 'Security finance Coperation',
        status: 'Submited',
        managerNote: '',
      },
      {
        startDate:'Dec 17',
        endDate:'Dec 19, 2021',
        projectName: 'Connect Plus',
        clientName: 'Security finance Coperation',
        status: 'Submited',
        managerNote: '',
      },

      {
        startDate:'Dec 13',
        endDate:'Dec 19, 2021',
        projectName: 'Email Marketing',
        clientName: 'finance Coperation',
        status: 'Approved',
        managerNote: '',
      },

      {
        startDate:'Sept 1',
        endDate:'Sep  10, 2021',
        projectName: 'Connect Plus',
        clientName: 'ABC Coperation',
        status: 'Submited',
        managerNote: '',
      },
      {
        startDate:'Dec 30',
        endDate:'Dec 19, 2021',
        projectName: 'Email Marketing',
        clientName: 'OOPfinance Coperation',
        status: 'Request for review',
        managerNote: 'Please Re-check it',
      },
    ];
  }
}
