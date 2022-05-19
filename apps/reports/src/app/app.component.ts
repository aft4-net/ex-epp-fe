import { Component, OnInit } from '@angular/core';
import { CommonDataService } from './../../../../libs/common-services/commonData.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { environment } from './../environments/environment';

@Component({
  selector: 'exec-epp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'reports';

  constructor(private notification: NzNotificationService,
    private commonDataService: CommonDataService) {}

  ngOnInit(): void {
    this.commonDataService.getPermission(environment.apiUrl);
    this.notification.info('', '', {nzDuration: 1, nzPauseOnHover: false });
  }
}
