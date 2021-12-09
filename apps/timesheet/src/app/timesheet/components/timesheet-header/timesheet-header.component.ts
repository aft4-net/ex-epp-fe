import { Component, OnInit, Input, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { TimeEntry, Timesheet, TimesheetConfigResponse, TimesheetConfiguration } from '../../../models/timesheetModels';
import { TimesheetValidationService } from '../../services/timesheet-validation.service';
import { TimesheetService } from '../../services/timesheet.service';

@Component({
  selector: 'app-timesheet-header',
  templateUrl: './timesheet-header.component.html',
  styleUrls: ['./timesheet-header.component.scss']
})
export class TimesheetHeaderComponent implements OnInit,OnChanges {
  @Input() timesheet: Timesheet | null = null;
  @Input() timeEntries: TimeEntry[] | null = null;
  @Input() weekFirstDate: Date | null = null;
  @Input() weekLastDate: Date | null = null;
  @Input() weeklyTotalHours: number = 0;
  @Input() isSubmitted: boolean | undefined;
  btnText:string ='';
  timeSheetStatus="not-submitted-class";
  constructor(private timesheetService: TimesheetService, private timesheetValidationService: TimesheetValidationService) { }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.isSubmitted==true) {

      this.btnText="Submitted";
      this.timeSheetStatus="submitted-class";
  
    }
    else{
      this.btnText="Request for Approval";
      this.timeSheetStatus="not-submitted-class";
    };
  }
 

  ngOnInit(): void {
    console.log(this.isSubmitted)
    if (this.weekFirstDate && this.weekLastDate) {
      this.timesheetValidationService.fromDate = this.weekFirstDate;
      this.timesheetValidationService.toDate = this.weekLastDate;
    };
   
  
   }
  
  onRequestForApproval() {
    this.timesheetService.getTimeSheetConfiguration().subscribe(response => {
      let timesheetConfig: TimesheetConfiguration = response ? response : {
        WorkingDays: ["Monday", "Thursday", "Wednesday", "Thursday", "Friday", "Starday", "Sunday"],
        WorkingHour: 0
      };

      if (!this.timesheet) {
        return;
      }

      if (!this.timeEntries || this.timeEntries.length === 0) {
        return;
      }

       if (this.timesheetValidationService.isValidForApproval(this.timeEntries, timesheetConfig)) {
         this.timesheetService.addTimeSheetApproval(this.timesheet.Guid).subscribe();
         this.isSubmitted=true;
      }
    }, error => {
      console.log(error);
    });
  }
}
