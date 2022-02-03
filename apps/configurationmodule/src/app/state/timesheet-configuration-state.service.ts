import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TimesheetConfiguration } from './../models/timesheetModels';
import { ConfigurationService } from './../services/configuration.service';

@Injectable({
  providedIn: 'root'
})
export class TimesheetConfigurationStateService {
  readonly defaultTimesheetConfig: TimesheetConfiguration = {
    StartOfWeeks: [{DayOfWeek: "Monday", EffectiveDate: new Date(0)}],
    WorkingDays: [],
    WorkingHours: {Min: 0, Max: 24}
  };

  private timesheetConfigurationSource = new BehaviorSubject<TimesheetConfiguration>(this.defaultTimesheetConfig);
  timesheetConfiguration$ = this.timesheetConfigurationSource.asObservable();

  constructor(private configurationService: ConfigurationService) { }

  getTimesheetConfiguration() {
    this.configurationService.getTimeSheetConfiguration().subscribe(response => {
      const timesheetConfig : TimesheetConfiguration = response ?? this.defaultTimesheetConfig;

      timesheetConfig.StartOfWeeks = timesheetConfig.StartOfWeeks ?? this.defaultTimesheetConfig.StartOfWeeks;
      timesheetConfig.WorkingDays = timesheetConfig.WorkingDays ?? this.defaultTimesheetConfig.WorkingDays;
      timesheetConfig.WorkingHours = timesheetConfig.WorkingHours ?? this.defaultTimesheetConfig.WorkingHours;

      this.timesheetConfigurationSource.next(timesheetConfig);
    }, error => {
      console.log(error);
    });
  }

  addTimesheetConfiguration(timesheetConfig: TimesheetConfiguration) {
    this.configurationService.addTimeSheetConfiguration(timesheetConfig).subscribe(response => {
      if(!response) {
        return;
      }
    }, error => {
         console.log(error);
    });
  }
}
