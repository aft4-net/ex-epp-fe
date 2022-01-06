import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TimesheetConfiguration } from '../../models/timesheetModels';
import { TimesheetService } from '../services/timesheet.service';

@Injectable({
  providedIn: 'root'
})
export class TimesheetConfigurationStateService {
  private timesheetConfigurationSource = new BehaviorSubject<TimesheetConfiguration>({
    StartOfWeeks: [{DayOfWeek: "Monday", EffectiveDate: new Date(0)}],
    WorkingDays: [],
    WorkingHours: {Min: 0, Max: 24}
  });
  timesheetConfiguration$ = this.timesheetConfigurationSource.asObservable();

  constructor(private timesheetService: TimesheetService) { }

  getTimesheetConfiguration() {
    this.timesheetService.getTimeSheetConfiguration().subscribe(response => {
      var timesheetConfig : TimesheetConfiguration = response ?? {
        StartOfWeeks: [{DayOfWeek: "Monday", EffectiveDate: new Date(0)}],
        WorkingDays: [],
        WorkingHour: 0
      }

      this.timesheetConfigurationSource.next(timesheetConfig);
    });
  }

  addTimesheetConfiguration(timesheetConfig: TimesheetConfiguration) {
    this.timesheetService.addTimeSheetConfiguration(timesheetConfig).subscribe(response => {
      if(!response) {
        return;
      }
    }, error => {

    });
  }
}
