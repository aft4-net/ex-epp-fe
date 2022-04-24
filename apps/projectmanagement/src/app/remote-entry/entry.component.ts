import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { PermissionListService } from '../../../../../libs/common-services/permission.service';
import { environment } from '../../environments/environment';
import { CommonDataService } from '.././../../../../libs/common-services/commonData.service';
@Component({
  selector: 'exec-epp-projectmanagement-entry',
  template: ` <router-outlet></router-outlet>`
})
export class RemoteEntryComponent implements OnInit  {
  constructor(private permissionList: PermissionListService,
    private commonDataService: CommonDataService, private notification: NzNotificationService)
    {}
  ngOnInit(): void {
    this.commonDataService.getPermission(environment.apiUrl);
    this.notification.info('', '', {nzDuration: 1, nzPauseOnHover: false });
  }
}
