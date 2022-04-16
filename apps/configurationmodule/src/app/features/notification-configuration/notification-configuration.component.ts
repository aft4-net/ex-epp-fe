import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { NotificationWeek, TimesheetConfiguration, TimesheetNotification } from '../../models/timesheetModels';
import { TimesheetConfigurationStateService } from '../../state/timesheet-configuration-state.service';

@Component({
  selector: 'exec-epp-notification-configuration',
  templateUrl: './notification-configuration.component.html',
  styleUrls: ['./notification-configuration.component.scss']
})
export class NotificationConfigurationComponent implements OnInit {
  timesheetConfig$: Observable<TimesheetConfiguration> = new Observable();;
  timesheetConfig: TimesheetConfiguration = this.timesheetConfigStateService.defaultTimesheetConfig;
  notificationweek = Object.values(NotificationWeek);
  notificationConfigForm = new FormGroup({
    deadlineDate: new FormControl(),
    deadlineTime: new FormControl(),
    deadlineWeek: new FormControl(),
    timesheetEscalation: new FormGroup(
      {
        firstEscalation: new FormControl(1),
        secondEscalation: new FormControl(2, [Validators.min(2)])
      }
    )
  });

  public weekConfig = NotificationWeek;
  isCurrentWeek = this.weekConfig.next_week;
  arrConfig = this.weekConfig as unknown as Array<string>;
  day = new Date();
  time: Date = new Date(0, 0, 0, this.timesheetConfig.Deadline?.DeadlineTime, 0, 0);;
  defaultOpenValue = new Date(0, 0, 0, 0, 0, 0);
  selectedWeekConfig: any;
  timezone = this.day.getTimezoneOffset();

  constructor(
    private timesheetConfigStateService: TimesheetConfigurationStateService,
  ) { }

  ngOnInit(): void {
    this.timesheetConfig$ = this.timesheetConfigStateService.timesheetConfiguration$;

    this.timesheetConfig$.subscribe(config => {
      this.timesheetConfig = config ?? this.timesheetConfigStateService.defaultTimesheetConfig;
      this.selectedWeekConfig = Object.keys(this.weekConfig)[Object.values(this.weekConfig).indexOf(this.timesheetConfig.Deadline.Week)];
      this.notificationConfigForm.setValue({
        deadlineDate: this.timesheetConfig.Deadline?.DeadlineDate,
        deadlineTime: new Date().setHours(this.timesheetConfig.Deadline.DeadlineTime),
        deadlineWeek: this.selectedWeekConfig,
        timesheetEscalation: {
          firstEscalation: this.timesheetConfig.TimesheetEscalation.FirstEscalation,
          secondEscalation: this.timesheetConfig.TimesheetEscalation.SecondEscalation
        }
      });
    });
  }
  weekChangeEvent(event: any) {
    this.selectedWeekConfig = event.target.value;
  }

  onEscalationChange() {
    if(this.notificationConfigForm.value.timesheetEscalation.secondEscalation > this.notificationConfigForm.value.timesheetEscalation.firstEscalation) return;

    this.notificationConfigForm.patchValue({
      timesheetEscalation: {
        secondEscalation: this.notificationConfigForm.value.timesheetEscalation.firstEscalation + 1
      }
    });
  }

  saveNotificationConfiguration() {
    const configFormValues = this.notificationConfigForm.value;

    const deadlineConfig: TimesheetNotification = {
      DeadlineDate: configFormValues.deadlineDate,
      DeadlineTime: new Date(configFormValues.deadlineTime).getHours(),
      Week: configFormValues.deadlineWeek,
      TimeZone: this.timezone
    }
    this.timesheetConfig.Deadline = deadlineConfig;
    this.timesheetConfig.TimesheetEscalation.FirstEscalation = configFormValues.timesheetEscalation.firstEscalation;
    this.timesheetConfig.TimesheetEscalation.SecondEscalation = configFormValues.timesheetEscalation.secondEscalation;
    this.timesheetConfigStateService.addTimesheetConfiguration({ ...this.timesheetConfig });
  }
}
