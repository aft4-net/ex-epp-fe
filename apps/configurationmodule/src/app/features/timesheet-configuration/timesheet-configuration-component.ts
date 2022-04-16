import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms'
import { Observable, Subscription } from 'rxjs';
import { TimesheetConfigurationStateService } from '../../state/timesheet-configuration-state.service';
import { PermissionListService } from './../../../../../../libs/common-services/permission.service';
import { TimesheetConfiguration } from '../../models/timesheetModels';
import { CommonDataService } from './../../../../../../libs/common-services/commonData.service';

@Component({
  selector: 'exec-epp-timesheet-configuration',
  templateUrl: './timesheet-configuration-component.html',
  styleUrls: ['./timesheet-configuration-component.scss']
})
export class TimesheetConfigurationComponent implements OnInit, OnDestroy {
  timesheetConfig$: Observable<TimesheetConfiguration> = new Observable();;
  timesheetConfig: TimesheetConfiguration = this.timesheetConfigStateService.defaultTimesheetConfig;;
  timesheetConfigForm = new FormGroup({
    startOfWeek: new FormControl(),
    workingDays: new FormGroup({
      monday: new FormControl(true),
      tuesday: new FormControl(true),
      wednesday: new FormControl(true),
      thursday: new FormControl(true),
      friday: new FormControl(true),
      saturday: new FormControl(false),
      sunday: new FormControl(false),
    }),
    workingHours: new FormGroup({
      min: new FormControl(0),
      max: new FormControl(24)
    }),
    timesheetEscalation: new FormGroup(
      {
        toSupervisor: new FormControl(1),
        toHR: new FormControl(2)
      }
    )
  });
  timesheetConfigSubscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private timesheetConfigStateService: TimesheetConfigurationStateService,
    private _permissionService: PermissionListService,
    private _commonDataService: CommonDataService,

  ) { }

  ngOnInit(): void {
    this._commonDataService.getPermission();

    this.timesheetConfig$ = this.timesheetConfigStateService.timesheetConfiguration$;

    this.timesheetConfigSubscription = this.timesheetConfig$.subscribe(tsc => {
      this.timesheetConfig = tsc ?? this.timesheetConfigStateService.defaultTimesheetConfig;

      this.timesheetConfigForm.setValue({
        startOfWeek: this.timesheetConfig.StartOfWeeks[0].DayOfWeek,
        workingDays: {
          monday: this.timesheetConfig.WorkingDays.indexOf("Monday") >= 0,
          tuesday: this.timesheetConfig.WorkingDays.indexOf("Tuesday") >= 0,
          wednesday: this.timesheetConfig.WorkingDays.indexOf("Wednesday") >= 0,
          thursday: this.timesheetConfig.WorkingDays.indexOf("Thursday") >= 0,
          friday: this.timesheetConfig.WorkingDays.indexOf("Friday") >= 0,
          saturday: this.timesheetConfig.WorkingDays.indexOf("Saturday") >= 0,
          sunday: this.timesheetConfig.WorkingDays.indexOf("Sunday") >= 0,
        },
        workingHours: {
          min: this.timesheetConfig.WorkingHours.Min,
          max: this.timesheetConfig.WorkingHours.Max
        },
        timesheetEscalation: {
          toSupervisor: this.timesheetConfig.TimesheetEscalation.ToSupervisor,
          toHR: this.timesheetConfig.TimesheetEscalation.ToHR
        }
      });
    });

    if (!this._permissionService.authorizedPerson("Update_Timesheet_Configuration")) {
      this.timesheetConfigForm.disable();
    }
  }

  ngOnDestroy(): void {
    this.timesheetConfigSubscription.unsubscribe();
  }


  saveTimesheetConfiguration() {
    const configValues = this.timesheetConfigForm.value;

    const timesheetConfig: TimesheetConfiguration = {
      StartOfWeeks: [
        {
          DayOfWeek: configValues.startOfWeek,
          EffectiveDate: new Date(0)
        }
      ],
      WorkingDays: this.getListOfWorkingDays(),
      WorkingHours: {
        Min: configValues.workingHours.min,
        Max: configValues.workingHours.max
      },
      TimesheetEscalation: {
        ToSupervisor: configValues.timesheetEscalation.toSupervisor,
        ToHR: configValues.timesheetEscalation.toHR
      }
    }

    this.timesheetConfigStateService.addTimesheetConfiguration(timesheetConfig);
  }

  getListOfWorkingDays(): string[] {
    const workingDays: string[] = [];

    const configValues = this.timesheetConfigForm.value

    // Monday
    if (configValues.workingDays.monday) {
      workingDays.push("Monday");
    }

    // Tuesday
    if (configValues.workingDays.tuesday) {
      workingDays.push("Tuesday");
    }

    // Wednesday
    if (configValues.workingDays.wednesday) {
      workingDays.push("Wednesday");
    }

    // Thursday
    if (configValues.workingDays.thursday) {
      workingDays.push("Thursday");
    }

    // Friday
    if (configValues.workingDays.friday) {
      workingDays.push("Friday");
    }

    // Saturday
    if (configValues.workingDays.saturday) {
      workingDays.push("Saturday");
    }

    // Sunday
    if (configValues.workingDays.sunday) {
      workingDays.push("Sunday");
    }

    return workingDays;
  }

  authorize(key: string) {
    return this._permissionService.authorizedPerson(key);
  }
}