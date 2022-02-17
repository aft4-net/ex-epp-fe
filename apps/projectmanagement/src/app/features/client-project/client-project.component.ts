import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NzNotificationService } from 'ng-zorro-antd/notification';
import { PermissionListService } from '../../../../../../libs/common-services/permission.service';
import { CommonDataService } from '../.././../../../../libs/common-services/commonData.service';

@Component({
  selector: 'exec-epp-client-project',
  templateUrl: './client-project.component.html',
  styleUrls: ['./client-project.component.scss']
})
export class ClientProjectComponent implements OnInit {

  constructor(private router: Router, private permissionList: PermissionListService,
    private commonDataService: CommonDataService, private notification: NzNotificationService) {
  }

  ngOnInit(): void {
    this.commonDataService.getPermission();

    this.notification.info('', '', {nzDuration: 1, nzPauseOnHover: false });
  }

  authorize(key: string) {
    return this.permissionList.authorizedPerson(key)
  }

  addProjectPage() {
    this.router.navigateByUrl('projectmanagement/add-project');
  }

}
