import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms'
import { Observable } from 'rxjs';
import { TimesheetConfiguration } from '../../../models/timesheetModels';
import { TimesheetConfigurationStateService } from '../../state/timesheet-configuration-state.service';

@Component({
  selector: 'exec-epp-timesheet-configuration',
  templateUrl: './timesheet-configuration.component.html',
  styleUrls: ['./timesheet-configuration.component.scss']
})
export class TimesheetConfigurationComponent implements OnInit {
  timesheetConfig$: Observable<TimesheetConfiguration> = new Observable();
  timesheetConfigForm = new FormGroup({
    startOfWeek: new FormControl('Monday'),
    workingDays: new FormGroup({
      Monday: new FormControl(true),
      Tuesday: new FormControl(true),
      Wednesday: new FormControl(true),
      Thursday: new FormControl(true),
      Friday: new FormControl(true),
      Starday: new FormControl(false),
      Sunday: new FormControl(false),
    }),
    workingHours: new FormGroup({
      min: new FormControl(0),
      max: new FormControl(24)
    })
  });

  constructor(
    private router: Router,
    private timesheetConfigStateService: TimesheetConfigurationStateService
  ) { }

  ngOnInit(): void {
    this.timesheetConfig$ = this.timesheetConfigStateService.timesheetConfiguration$;
  }

}
