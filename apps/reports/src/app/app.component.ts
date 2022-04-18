import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'exec-epp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'reports';

  constructor(private notification: NzNotificationService) {}

  ngOnInit(): void {
    this.notification.info('', '', {nzDuration: 1, nzPauseOnHover: false });
  }
}
