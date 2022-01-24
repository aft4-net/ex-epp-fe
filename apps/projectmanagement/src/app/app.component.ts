import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CommonDataService } from './../../../../libs/common-services/commonData.service';

@Component({
  selector: 'exec-epp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'projectmanagement';

  constructor(private commonDataService: CommonDataService, private notification: NzNotificationService) {
  }

  ngOnInit(): void {
    this.commonDataService.getPermission();

    this.notification.info('', '', {nzDuration: 1, nzPauseOnHover: false });
  }
}
