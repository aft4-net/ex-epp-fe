import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'exec-epp-timesheet-approval',
  templateUrl: './timesheet-approval.component.html',
  styleUrls: ['./timesheet-approval.component.scss']
})
export class TimesheetApprovalComponent implements OnInit {
  date=null;
  bulkCheck = true;
  statusColumn = true;
  cols: TemplateRef<any>[] = [];
  currentNameSubject$ = new BehaviorSubject(true);

  resources: any;

  employees = [
    {
        id:1,
        name: 'yosef',
        dateRange: Date.now(),
        projectName: 'HR Module',
        clientName: 'Connect+',
        hours: 8,
        status: 'Request for review'
    },
    {
      id:3,
      name: 'Daniel James',
      dateRange: Date.now(),
      projectName: 'Finanace Module',
      clientName: 'Security Finance',
      hours: 12,
      status: 'Awaiting Approval'
    },
    {
      id: 9,
      name: 'Abel',
      dateRange: Date.now(),
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
      dateRange: Date.now(),
      projectName: 'HR Module',
      clientName: 'Connect+',
      hours: 8,
      status: 'Request for review'
  },
  {
    id:13,
    name: 'Daniel',
    dateRange: Date.now(),
    projectName: 'Finanace Module',
    clientName: 'Security Finance',
    hours: 12,
    status: 'Awaiting Approval'
  },
  {
    id: 19,
    name: 'Abel',
    dateRange: Date.now(),
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

headings = [
    'Name',
    'Date Range',
    'Project Name',
    'Client Name',
    'Hours',
];

headingswithStatus = [
  'Name',
  'Date Range',
  'Project Name',
  'Client Name',
  'Hours',
  'Status'
];

getweek(result:Date):void{
  console.log('week: ');
}

ngOnInit(): void {

}
onTabSelected(tab:any) {
  console.log(tab);
   if (tab === 1){
   this.currentNameSubject$.next(true);
   }
   else {
     this.currentNameSubject$.next(false);
   }
}

updateProjectResourseList(resources: any) {
  this.resources = resources;
  console.log(this.resources);
}

}
