import { Component, OnInit } from '@angular/core';
import { NzNotificationComponent, NzNotificationService } from 'ng-zorro-antd/notification';

import { JsonPipe } from '@angular/common';
import { JsonpClientBackend } from '@angular/common/http';

@Component({
  selector: 'exec-epp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'timesheet';

  constructor(private notification:NzNotificationService) {
  }
  ngOnInit(): void {
    this.notification.info('', '', { nzDuration: 1, nzPauseOnHover: false });
  }
}
