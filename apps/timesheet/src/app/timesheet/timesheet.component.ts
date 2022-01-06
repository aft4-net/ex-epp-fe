import { Component, OnInit } from '@angular/core';
import { TimeEntry, Timesheet, TimesheetApproval, TimesheetConfiguration } from '../models/timesheetModels';
import { Observable } from 'rxjs';
import { TimesheetConfigurationStateService } from './state/timesheet-configuration-state.service';
import { TimesheetStateService } from './state/timesheet-state.service';

@Component({
  selector: 'exec-epp-app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss'],
})
export class TimesheetComponent implements OnInit {
  userId: string | null = null;

  timesheetConfig$: Observable<TimesheetConfiguration> = new Observable();
  timesheet$: Observable<Timesheet | null> = new Observable();
  timeEntries$: Observable<TimeEntry[] | null> = new Observable();
  timesheetApprovals$: Observable<TimesheetApproval[] | null> = new Observable();

  approval$: Observable<boolean> = new Observable();

  constructor(
    private timesheetConfigurationStateService: TimesheetConfigurationStateService,
    private timesheetStateService: TimesheetStateService,
  ) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem("userId");
    this.timesheetConfig$ = this.timesheetConfigurationStateService.timesheetConfiguration$;
    this.timesheet$ = this.timesheetStateService.timesheet$;
    this.timeEntries$ = this.timesheetStateService.timeEntries$;
    this.timesheetApprovals$ = this.timesheetStateService.timesheetApprovals$;

    this.approval$  = this.timesheetStateService.approval$;

    this.timesheetConfigurationStateService.getTimesheetConfiguration();
  }
}
