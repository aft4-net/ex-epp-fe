import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    private router: Router,
    private timesheetConfigStateService: TimesheetConfigurationStateService
  ) { }

  ngOnInit(): void {
    this.timesheetConfig$ = this.timesheetConfigStateService.timesheetConfiguration$;
  }

}
