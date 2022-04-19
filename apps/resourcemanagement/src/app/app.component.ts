import { CommonDataService } from '../../../../libs/common-services/commonData.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { environment } from '../environments/environment';

@Component({
  selector: 'exec-epp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'resourcemanagement';
  route =''

  constructor(private router: Router,public _commonData:CommonDataService, private notification: NzNotificationService){
    this.route= router.url;
    _commonData.getPermission(environment.apiUrl);

  }
  ngOnInit(): void {
    this.notification.info('', '', { nzDuration: 1, nzPauseOnHover: false });
  }


}
