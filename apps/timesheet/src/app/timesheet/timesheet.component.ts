import { Component, OnInit } from '@angular/core';
import { TimeEntry, Timesheet, TimesheetApproval, TimesheetConfiguration } from '../models/timesheetModels';
import { Observable } from 'rxjs';
import { TimesheetConfigurationStateService } from './state/timesheet-configuration-state.service';
import { TimesheetStateService } from './state/timesheet-state.service';
import { UserPermissionStateService } from './state/user-permission-state.service';
import { CommonDataService } from '../../../../../libs/common-services/commonData.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'exec-epp-app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss'],
})
export class TimesheetComponent implements OnInit {
  userId: string = "";
  userPermissionList$: Observable<any[]> = new Observable();

  timesheetConfig$: Observable<TimesheetConfiguration> = new Observable();
  timesheet$: Observable<Timesheet | null> = new Observable();
  timeEntries$: Observable<TimeEntry[] | null> = new Observable();
  timesheetApprovals$: Observable<TimesheetApproval[] | null> = new Observable();

  approval$: Observable<boolean> = new Observable();

  constructor(
    private timesheetConfigurationStateService: TimesheetConfigurationStateService,
    private timesheetStateService: TimesheetStateService,
    private userPermissionStateService: UserPermissionStateService,
    private commonDataService: CommonDataService,
    private notification: NzNotificationService
  ) {
    let loggedInUserInfo = JSON.parse(localStorage.getItem("loggedInUserInfo") ?? "{}");
    this.userId = "";
    if (loggedInUserInfo) {
      this.userId = loggedInUserInfo["EmployeeGuid"];
    }

    localStorage.setItem("userId", this.userId);
    
    this.userPermissionList$ = this.userPermissionStateService.permissionList$;

    this.timesheetConfig$ = this.timesheetConfigurationStateService.timesheetConfiguration$;
    this.timesheet$ = this.timesheetStateService.timesheet$;
    this.timeEntries$ = this.timesheetStateService.timeEntries$;
    this.timesheetApprovals$ = this.timesheetStateService.timesheetApprovals$;

    this.approval$  = this.timesheetStateService.approval$;

    this.userPermissionStateService.getUserPermission();
    this.timesheetConfigurationStateService.getTimesheetConfiguration();
  }

  ngOnInit(): void {
    this.commonDataService.getPermission();
    
    this.notification.info('', '', {nzDuration: 1, nzPauseOnHover: false });
  }
}
