import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'exec-epp-timesheet-approval',
  templateUrl: './timesheet-approval.component.html',
  styleUrls: ['./timesheet-approval.component.scss']
})
export class TimesheetApprovalComponent implements OnInit {
  employees = [
    {
        id:1,
        name: 'yosef',
        dateRange: Date.now().toString,
        projectName: 'HR Module',
        clientName: 'Connect+',
        hours: 8,
        status: 'S'
    },
    {
      id:3,
      name: 'Daniel',
      dateRange: Date.now().toString,
      projectName: 'Finanace Module',
      clientName: 'Security Finance',
      hours: 12,
      status: 'W'
    },
    {
      id: 9,
      name: 'Abel',
      dateRange: Date.now().toString,
      projectName: 'Test',
      clientName: 'test',
      hours: 20,
      status: 'E'
    },
    {
      id: 5,
      name: 'hana',
      dateRange: Date.now(),
      projectName: 'test',
      clientName: 'test',
      hours: 10,
      status: 'F'
    }
];

headings = [
    'Name',
    'Date Range',
    'Project Name',
    'Client Name',
    'Hours',
    'Stats'
];

@ViewChild('id', { static: true }) id: TemplateRef<any>;
@ViewChild('name', { static: true }) name: TemplateRef<any>;
@ViewChild('des', { static: true }) des: TemplateRef<any>;
@ViewChild('exp', { static: true }) exp: TemplateRef<any>;

cols: TemplateRef<any>[] = [];

ngOnInit(): void {
    this.cols.push(this.id, this.name, this.des, this.exp);
}
}
