import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PermissionListService } from './../../../../libs/common-services/permission.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { CommonDataService } from './../../../../libs/common-services/commonData.service';
import { AuthenticationService } from './../../../../libs/common-services/Authentication.service'
import { TimesheetConfigurationStateService } from './state/timesheet-configuration-state.service';

@Component({
  selector: 'exec-epp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'configurationmodule';
  isLogin = false;
  route = '';
  departmentIsActive! : boolean;
  jobTitleIsActive! : boolean;
  timesheetIsActive! : boolean;
  countryIsActive! : boolean;
  dutyStationIsActive! : boolean;

  constructor(private router: Router, private notification: NzNotificationService,
    public _commonData: CommonDataService,
    private _authenticationService: AuthenticationService,
    private _permissionService: PermissionListService,
    private _timesheetConfigStateService: TimesheetConfigurationStateService
  ) {
    this._timesheetConfigStateService.getTimesheetConfiguration();
    console.log("constructor Job Title ", this.authorize(['Create_Job_Title', 'View_Job_Title', 'Update_Job_Title', 'Delete_Job_Title']));
  }
  ngOnInit() {
    this.notification.info('', '', { nzDuration: 1, nzPauseOnHover: false });
    this._commonData.getPermission();
    this.isLogin = this._authenticationService.loginStatus();
    if (!this.isLogin) {
     // this.router.navigateByUrl('usermanagement/sign_in');
      this.router.navigateByUrl('usermanagement/logIn');
    }
    this._commonData.permissionList$.subscribe((res) => {
      setTimeout(() => {
        this.defaultRoute();
      }, 100);
    })
    // this.router.navigateByUrl('configurationmodule/job-title');
    
  }
  activePath(routePath: string) {
    if (this.route === '') this.route = this.router.url;
    return this.route == routePath;
  }
  authorize(keys: string[]) {
    for(const key of keys) {
      if(this._permissionService.authorizedPerson(key)){
        return true;
      }
    }

    return false;
  }

  defaultRoute() {
    if (this.authorize(['Create_Department', 'View_Department', 'Update_Department', 'Delete_Department'])) {
      this.departmentIsActive = true;
      // default route
    } else if (this.authorize(['Create_Job_Title', 'View_Job_Title', 'Update_Job_Title', 'Delete_Job_Title'])) {
      if(this.router.url === '/configurationmodule') {
        this.jobTitleIsActive = true;
        this.router.navigateByUrl('configurationmodule/job-title');
      }
    } else if (this.authorize(['Create_Country', 'Delete_Country', 'Update_Country', 'View_Country'])) {
      if(this.router.url === '/configurationmodule') {
        this.countryIsActive = true;
        this.router.navigateByUrl('configurationmodule/country');
      }
    } else if (this.authorize(['Create_DutyStation', 'Update_DutyStation', 'Delete_DutyStation', 'View_DutyStation'])) {
      if(this.router.url === '/configurationmodule') {
        this.dutyStationIsActive = true;
        this.router.navigateByUrl('configurationmodule/duty-station');
      }
    } else if (this.authorize(['View_Timesheet_Configuration', 'Update_Timesheet_Configuration'])) {
      if(this.router.url === '/configurationmodule') {
        this.timesheetIsActive = true;
        this.router.navigateByUrl('configurationmodule/timesheet');
      }
    } else {
      this.router.navigateByUrl('/');
    }
  }

}
