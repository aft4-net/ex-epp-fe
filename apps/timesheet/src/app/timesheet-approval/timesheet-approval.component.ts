import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'exec-epp-timesheet-approval',
  templateUrl: './timesheet-approval.component.html',
  styleUrls: ['./timesheet-approval.component.scss']
})
export class TimesheetApprovalComponent implements OnInit {
  date=null;
  isAll = true;
  notAll= false;
  getweek(result:Date):void{
    console.log('week: ');
  }
  employees = [
    {
        id:1,
        name: 'yosef',
        dateRange: Date.now().toString,
        projectName: 'HR Module',
        clientName: 'Connect+',
        hours: 8,
        status: 'Request for review'
    },
    {
      id:3,
      name: 'Daniel',
      dateRange: Date.now().toString,
      projectName: 'Finanace Module',
      clientName: 'Security Finance',
      hours: 12,
      status: 'Awaiting Approval'
    },
    {
      id: 9,
      name: 'Abel',
      dateRange: Date.now().toString,
      projectName: 'Test',
      clientName: 'test',
      hours: 20,
      status: 'Approved'
    },
    {
      id: 5,
      name: 'hana',
      dateRange: Date.now(),
      projectName: 'test',
      clientName: 'test',
      hours: 10,
      status: 'Approved'
    },
    {
      id:11,
      name: 'yosef',
      dateRange: Date.now().toString,
      projectName: 'HR Module',
      clientName: 'Connect+',
      hours: 8,
      status: 'Request for review'
  },
  {
    id:13,
    name: 'Daniel',
    dateRange: Date.now().toString,
    projectName: 'Finanace Module',
    clientName: 'Security Finance',
    hours: 12,
    status: 'Awaiting Approval'
  },
  {
    id: 19,
    name: 'Abel',
    dateRange: Date.now().toString,
    projectName: 'Test',
    clientName: 'test',
    hours: 20,
    status: 'Approved'
  },
  {
    id: 15,
    name: 'hana',
    dateRange: Date.now(),
    projectName: 'test',
    clientName: 'test',
    hours: 10,
    status: 'Approved'
  }
];

headingsForAll = [
    'Name',
    'Date Range',
    'Project Name',
    'Client Name',
    'Hours',
    'Stats'
];

headingsForNotAll = [
  'Name',
  'Date Range',
  'Project Name',
  'Client Name',
  'Hours'
];

cols: TemplateRef<any>[] = [];

ngOnInit(): void {

}

}
