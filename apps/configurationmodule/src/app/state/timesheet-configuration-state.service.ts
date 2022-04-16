import { Injectable } from '@angular/core';
import { NzNotificationPlacement, NzNotificationService } from 'ng-zorro-antd/notification';
import { BehaviorSubject } from 'rxjs';
import {  NotificationWeek, TimesheetConfiguration } from './../models/timesheetModels';
import { ConfigurationService } from './../services/configuration.service';

@Injectable({
  providedIn: 'root'
})
export class TimesheetConfigurationStateService {
  readonly defaultTimesheetConfig: TimesheetConfiguration = {
    StartOfWeeks: [{DayOfWeek: "Monday", EffectiveDate: new Date(0)}],
    WorkingDays: [],
    WorkingHours: {Min: 0, Max: 24},
    Deadline: {
      DeadlineDate:"Friday",
      DeadlineTime: 12,
      Week: NotificationWeek.next_week,
      TimeZone:0
      
    }
  };

  private timesheetConfigurationSource = new BehaviorSubject<TimesheetConfiguration>(this.defaultTimesheetConfig);
  timesheetConfiguration$ = this.timesheetConfigurationSource.asObservable();

  constructor(
    private configurationService: ConfigurationService,
    private notification: NzNotificationService
  ) { }

  getTimesheetConfiguration() {
    this.configurationService.getTimeSheetConfiguration().subscribe(response => {
      const timesheetConfig : TimesheetConfiguration = response ?? this.defaultTimesheetConfig;

      timesheetConfig.StartOfWeeks = timesheetConfig.StartOfWeeks ?? this.defaultTimesheetConfig.StartOfWeeks;
      timesheetConfig.WorkingDays = timesheetConfig.WorkingDays ?? this.defaultTimesheetConfig.WorkingDays;
      timesheetConfig.WorkingHours = timesheetConfig.WorkingHours ?? this.defaultTimesheetConfig.WorkingHours;
      timesheetConfig.Deadline=timesheetConfig.Deadline??this.defaultTimesheetConfig.Deadline;
      this.timesheetConfigurationSource.next(timesheetConfig);
    }, error => {
      console.log(error);
    });
  }

  addTimesheetConfiguration(timesheetConfig: TimesheetConfiguration) {
    this.configurationService.addTimeSheetConfiguration(timesheetConfig).subscribe(response => {
      if(response?.ResponseStatus === "Success") {
        this.createNotification("success", "Timesheet configuration updated successfully");
        this.getTimesheetConfiguration();
      }
      else{
        this.createNotification("warning", "There was some problem updating the timesheet configuration");
      }
    }, error => {
        this.createNotification("error", error.message);
    });
  }

  createNotification(type: string, message: string, position?: NzNotificationPlacement) {
    if (!position) {
      position = 'topRight';
    }

    switch (type.toLowerCase()) {
      case 'success':
        this.notification.success('', message, { nzPlacement: position });
        break;
      case 'info':
        this.notification.info('', message, { nzPlacement: position });
        break;
      case 'warning':
        this.notification.warning('', message, { nzPlacement: position });
        break;
      case 'error':
        this.notification.error('', message, { nzPlacement: position });
        break;
    }
  }
}
