import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { TimeEntry, Timesheet, TimesheetApproval } from '../../../models/timesheetModels';
import { TimesheetService } from '../../services/timesheet.service';
import { TimesheetStateService } from '../../state/timesheet-state.service';
interface ItemData {
  id: number;
  name: string;
  dateRange: string;
  projectName: number;
  clientName: string;
  hours: number;
  stats: string;
}
@Component({
  selector: 'tempview',
  templateUrl: './tempview.component.html',
  styleUrls: ['./tempview.component.scss']
})
export class TempviewComponent implements OnInit {
  @Output() reviewEvent = new EventEmitter();
  // date = null;

  
  isAll = true;
  notAll = false;
  timesheet: Timesheet | null = null;
  timesheetApp: TimesheetApproval[] | null = null;
 
  timeEntries: TimeEntry[] | null = null;
  timeEntries$: Observable<TimeEntry[] | null> = new Observable();
  Guid: string | null = null;
  project_id :string | undefined;
  
  userId: string | null = null;


  timesheet$: Observable<Timesheet | null> = new Observable();
  getweek(result: Date): void {
    console.log('week: ');
  }

  constructor(public state: TimesheetStateService, private router: Router,
   private _timesheetservice :TimesheetService)
  {

  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  submission = [
    {
      Guid: "5ac731c7-9b77-4ba1-ad31-5a95d7c17401",
      name: 'Wada',
      dateRange: new Date(),
      projectName: 'Applicant',
      clientName: 'HR',
      hours: 8,
      status: 'Request for review',
    },
    {
      Guid: "5ac731c7-9b77-4ba1-ad31-5a95d7c17401",
      name: 'Jira',
      dateRange: new Date(),
      projectName: 'Resource Management',
      clientName: 'Security Finance',
      hours: 12,
      status: 'Awaiting Approval',
    },
    {
      Guid: "5ac731c7-9b77-4ba1-ad31-5a95d7c17401",
      name: 'Soressa',
      dateRange:new Date(),
      projectName: 'REDES',
      clientName: 'Security Finance',
      hours: 12,
      status: 'Approved',
    },
    {
      Guid: "5ac731c7-9b77-4ba1-ad31-5a95d7c17401",
      name: 'Yero',
      dateRange: new Date(),
      projectName: 'EPP',
      clientName: 'Security Finance',
      hours: 12,
      status: 'Awaiting Approval',
    },
    {
      Guid: "5ac731c7-9b77-4ba1-ad31-5a95d7c17401",
      name: 'Dawi',
      dateRange: new Date(),
      projectName: 'CRTR',
      clientName: 'Security Finance',
      hours: 12,
      status: 'Awaiting Approval',
    },
    
  ];

  cols: TemplateRef<any>[] = [];


  public getTimesheetId(Guid: string) {
    console.log(Guid);
    const tid = this.submission.map(Guid=>Guid==Guid)
    this.router.navigate(['/review-submission', {state: {id: tid}}]);
 }

 onSelect(row: any) {
  this.timesheet$ = this.state.timesheet$;
  this.router.navigate(['/timesheet']);
}

reviewsubmissions(date:Date){
 date = this.state.date;
 this.userId = localStorage.getItem("userId");
  if (this.userId) {
      this.state.getTimesheet(this.userId,date);
      console.log("ffffffffff",date);
     this.router.navigate(['/timesheet']);
  }
   }

reviewSubmission( Guid:string,project_id:string) :void
  {

    this.userId = localStorage.getItem("userId");
    this.Guid =Guid;
    this.project_id =project_id;
    // this.state.timeEntries$ = of([]);
    this.timeEntries$ = this.state.timeEntries$  ;
      this._timesheetservice.getTimeEntriesByTimesheet_project(Guid,project_id).subscribe((data:any)=>{
      this.timeEntries$ = data ? data : null;
         if(data.length)
   { this.router.navigate(['/timesheet']);
     
  }
    });

}











// onSelect(submissio: {name: any, project:any, date:Date }) {
//   this.router.navigate(['/review-submission', submissio.name, submissio.project, submissio.date],{queryParams: {name: submissio.name, project:submissio.project, date: submissio.date}});
// }

  ngOnInit(): void {
    
  }

  
}
