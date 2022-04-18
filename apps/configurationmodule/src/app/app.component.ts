import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PermissionListService } from './../../../../libs/common-services/permission.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { CommonDataService } from './../../../../libs/common-services/commonData.service';
import { AuthenticationService } from './../../../../libs/common-services/Authentication.service'
import { TimesheetConfigurationStateService } from './state/timesheet-configuration-state.service';
import { environment } from './../environments/environment';

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
  notificationIsActive!:boolean;
  constructor(private router: Router, private notification: NzNotificationService,
    public _commonData: CommonDataService,
    private _authenticationService: AuthenticationService,
    private _permissionService: PermissionListService,
    private _timesheetConfigStateService: TimesheetConfigurationStateService
  ) {
    this._timesheetConfigStateService.getTimesheetConfiguration();
    this._commonData.getPermission(environment.apiUrl);
  }
  ngOnInit() {
    this.notification.info('', '', { nzDuration: 1, nzPauseOnHover: false });
    this.isLogin = this._authenticationService.loginStatus();
    if (!this.isLogin) {
     // this.router.navigateByUrl('usermanagement/sign_in');
      this.router.navigateByUrl('usermanagement/logIn');
    }

    this._commonData.permissionList$.subscribe(res => {
      if (res.map(res => res.KeyValue).length > 0 && this.router.url == '/configurationmodule') {
        if(res.map(res => res.KeyValue).indexOf("View_Department") !== -1) {
          this.departmentIsActive = true;
          this.router.navigate(["configurationmodule", "department"], {replaceUrl: true});
        }
        else if(res.map(res => res.KeyValue).indexOf("View_Job_Title") !== -1) {
          this.jobTitleIsActive = true;
          this.router.navigate(["configurationmodule", "job-title"], {replaceUrl: true});
        }
        else if(res.map(res => res.KeyValue).indexOf("View_Country") !== -1) {
          this.countryIsActive = true;
          this.router.navigate(["configurationmodule", "country"], {replaceUrl: true});
        }
        else if(res.map(res => res.KeyValue).indexOf("View_DutyStation") !== -1) {
          this.dutyStationIsActive = true;
          this.router.navigate(["configurationmodule", "duty-station"], {replaceUrl: true});
        }
        else if(res.map(res => res.KeyValue).indexOf("View_Timesheet_Configuration") !== -1 ) {
          this.timesheetIsActive = true;
          this.router.navigate(["configurationmodule", "timesheet"], {replaceUrl: true});
          this.notificationIsActive = true;
          this.router.navigateByUrl('configurationmodule/notification');
        }            
        else {
          this.router.navigate(["/"], {replaceUrl: true});
        }
      }
    });
    
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

}
