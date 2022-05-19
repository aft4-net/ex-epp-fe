import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { NotificationWeek, TimesheetConfiguration, TimesheetDeadline } from '../../models/timesheetModels';
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
  time: Date = new Date(0, 0, 0, this.timesheetConfig.TimesheetDeadline?.DeadlineTime, 0, 0);;
  defaultOpenValue = new Date(0, 0, 0, 0, 0, 0);
  selectedWeekConfig: any;
  timezone = this.day.getTimezoneOffset();
  workingDays: string[] = [];

  constructor(
    private timesheetConfigStateService: TimesheetConfigurationStateService,
  ) { }

  ngOnInit(): void {
    this.timesheetConfig$ = this.timesheetConfigStateService.timesheetConfiguration$;

    this.timesheetConfig$.subscribe(config => {
      this.timesheetConfig = config ?? this.timesheetConfigStateService.defaultTimesheetConfig;
      this.workingDays = this.timesheetConfig.WorkingDays;
      this.selectedWeekConfig = Object.keys(this.weekConfig)[Object.values(this.weekConfig).indexOf(this.timesheetConfig.TimesheetDeadline.Week)];
      this.notificationConfigForm.setValue({
        deadlineDate: this.timesheetConfig.TimesheetDeadline.DeadlineDate,
        deadlineTime: new Date().setHours(this.timesheetConfig.TimesheetDeadline.DeadlineTime),
        deadlineWeek: this.selectedWeekConfig,
        timesheetEscalation: {
          firstEscalation: this.timesheetConfig.TimesheetEscalation.FirstEscalation,
          secondEscalation: this.timesheetConfig.TimesheetEscalation.SecondEscalation
        }
      });
      this.onDeadLineWeekChage();
    });
  }

  onDeadLineWeekChage() {
    const configValue = this.notificationConfigForm.value;
    if (configValue.deadlineWeek === this.notificationweek[0]) {
      this.notificationConfigForm.controls.deadlineDate.setValue(this.getLastDayFromTimesheetConfig())
      this.notificationConfigForm.controls.deadlineDate.disable();
    }
    else {
      this.notificationConfigForm.controls.deadlineDate.setValue(this.timesheetConfig.TimesheetDeadline.DeadlineDate);
      this.notificationConfigForm.controls.deadlineDate.enable();
    }
  }

  getLastDayFromTimesheetConfig() {
    const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const startDay = this.timesheetConfig.StartOfWeeks[0].DayOfWeek;
    const orderedWeekDays = [startDay];
    const workingDays = this.timesheetConfig.WorkingDays;
    const orderedWorkingDays = [startDay];

    let startDayIndex = weekDays.findIndex(d => d.toUpperCase() === startDay.toUpperCase());

    while (orderedWeekDays.length < weekDays.length) {
      startDayIndex++;
      if (startDayIndex == weekDays.length) {
        startDayIndex = 0;
      }
      orderedWeekDays.push(weekDays[startDayIndex]);
    }

    for (const day of orderedWeekDays) {
      if (day.toUpperCase() === startDay.toUpperCase()) {
        continue;
      }
      const index = workingDays.findIndex(d => d.toUpperCase() === day.toUpperCase());
      if (index >= 0) {
        orderedWorkingDays.push(workingDays[index]);
      }
    }

    return orderedWorkingDays[orderedWorkingDays.length - 1];
  }

  weekChangeEvent(event: any) {
    this.selectedWeekConfig = event.target.value;
  }

  onEscalationChange() {
    if (this.notificationConfigForm.value.timesheetEscalation.secondEscalation > this.notificationConfigForm.value.timesheetEscalation.firstEscalation) return;

    this.notificationConfigForm.patchValue({
      timesheetEscalation: {
        secondEscalation: this.notificationConfigForm.value.timesheetEscalation.firstEscalation + 1
      }
    });
  }

  saveNotificationConfiguration() {
    const configFormValues = this.notificationConfigForm.value;

    const deadlineConfig: TimesheetDeadline = {
      DeadlineDate: configFormValues.deadlineDate,
      DeadlineTime: new Date(configFormValues.deadlineTime).getHours(),
      Week: configFormValues.deadlineWeek,
      TimeZone: this.timezone
    }
    this.timesheetConfig.TimesheetDeadline = deadlineConfig;
    this.timesheetConfig.TimesheetEscalation.FirstEscalation = configFormValues.timesheetEscalation.firstEscalation;
    this.timesheetConfig.TimesheetEscalation.SecondEscalation = configFormValues.timesheetEscalation.secondEscalation;
    this.timesheetConfigStateService.addTimesheetConfiguration({ ...this.timesheetConfig });
  }
}
