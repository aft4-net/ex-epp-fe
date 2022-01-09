import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms'
import { Observable } from 'rxjs';
import { TimesheetConfiguration } from '../../../models/timesheetModels';
import { TimesheetConfigurationStateService } from '../../state/timesheet-configuration-state.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { TimesheetStateService } from '../../state/timesheet-state.service';

@Component({
  selector: 'exec-epp-timesheet-configuration',
  templateUrl: './timesheet-configuration.component.html',
  styleUrls: ['./timesheet-configuration.component.scss']
})
export class TimesheetConfigurationComponent implements OnInit {
  timesheetConfig$: Observable<TimesheetConfiguration> = new Observable();;
  timesheetConfig: TimesheetConfiguration = this.timesheetConfigStateService.defaultTimesheetConfig;;
  timesheetConfigForm = new FormGroup({
    startOfWeek: new FormControl('Monday'),
    workingDays: new FormGroup({
      monday: new FormControl(true),
      tuesday: new FormControl(true),
      wednesday: new FormControl(true),
      thursday: new FormControl(true),
      friday: new FormControl(true),
      starday: new FormControl(false),
      sunday: new FormControl(false),
    }),
    workingHours: new FormGroup({
      min: new FormControl(0),
      max: new FormControl(24)
    })
  });

  constructor(
    private router: Router,
    private timesheetConfigStateService: TimesheetConfigurationStateService,
    private timesheetStateService: TimesheetStateService
  ) { 
    this.timesheetStateService.setTimesheetPageTitle("Configuration");
  }

  ngOnInit(): void {
    this.timesheetStateService.setApproval(true);
    this.timesheetConfig$ = this.timesheetConfigStateService.timesheetConfiguration$;

    this.timesheetConfig$.subscribe(tsc => {
      this.timesheetConfig = tsc ?? this.timesheetConfigStateService.defaultTimesheetConfig;

      this.timesheetConfigForm.setValue({
        startOfWeek: this.timesheetConfig.StartOfWeeks[0].DayOfWeek,
        workingDays: {
          monday: this.timesheetConfig.WorkingDays.indexOf("Monday") >= 0,
          tuesday: this.timesheetConfig.WorkingDays.indexOf("Tuesday") >= 0,
          wednesday: this.timesheetConfig.WorkingDays.indexOf("Wednesday") >= 0,
          thursday: this.timesheetConfig.WorkingDays.indexOf("Thursday") >= 0,
          friday: this.timesheetConfig.WorkingDays.indexOf("Friday") >= 0,
          starday: this.timesheetConfig.WorkingDays.indexOf("Starday") >= 0,
          sunday: this.timesheetConfig.WorkingDays.indexOf("Sunday") >= 0,
        },
        workingHours: {
          min: this.timesheetConfig.WorkingHours.Min,
          max: this.timesheetConfig.WorkingHours.Max
        }
      });
    });
  }

  saveTimesheetConfiguration() {
    const configValues = this.timesheetConfigForm.value;

    let timesheetConfig: TimesheetConfiguration = {
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
      }
    }

    this.timesheetConfigStateService.addTimesheetConfiguration(timesheetConfig);
  }

  getListOfWorkingDays(): string[]{
    let workingDays: string[] = [];
    
    const configValues = this.timesheetConfigForm.value

    // Monday
    if(configValues.workingDays.monday) {
      workingDays.push("Monday");
    }

    // Tuesday
    if(configValues.workingDays.tuesday) {
      workingDays.push("Tuesday");
    }

    // Wednesday
    if(configValues.workingDays.wednesday) {
      workingDays.push("Wednesday");
    }

    // Thursday
    if(configValues.workingDays.thursday) {
      workingDays.push("Thursday");
    }

    // Friday
    if(configValues.workingDays.friday) {
      workingDays.push("Friday");
    }

    // Starday
    if(configValues.workingDays.starday) {
      workingDays.push("Starday");
    }

    // Sunday
    if(configValues.workingDays.sunday) {
      workingDays.push("sunday");
    }

    return workingDays;
  }
}
