import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PermissionListService } from 'libs/common-services/permission.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { CommonDataService } from '../../../../libs/common-services/commonData.service';
import {AuthenticationService} from './../../../../libs/common-services/Authentication.service'

@Component({
  selector: 'exec-epp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'configurationmodule';
  isLogin=false;
  route='';
  constructor( private router: Router, private notification: NzNotificationService,
    public _commonData:CommonDataService,
    private _authenticationService:AuthenticationService,
    private _permissionService:PermissionListService) {

  }
  ngOnInit() {
    this.notification.info('', '', {nzDuration: 1, nzPauseOnHover: false });
    this._commonData.getPermission();
    this.isLogin=this._authenticationService.loginStatus();
    if(!this.isLogin){
    // window.location.reload();
      this.router.navigateByUrl('usermanagement/sign_in');
    }
  }
  activePath(routePath: string) {
    if (this.route === '') this.route = this.router.url;
    return this.route == routePath;
  }
  authorize(key:string){
    return this._permissionService.authorizedPerson(key);
  }

}
