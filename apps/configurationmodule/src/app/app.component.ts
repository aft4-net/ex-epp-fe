import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'exec-epp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'configurationmodule';
  isLogin=true;
  route='';
  constructor( private router: Router, private notification: NzNotificationService){
    // this.notification.info('', '', {nzDuration: 1, nzPauseOnHover: false });
  }
  ngOnInit() {
    this.notification.info('', '', {nzDuration: 1, nzPauseOnHover: false });
    alert("hello");
  }
  activePath(routePath: string) {
    if (this.route === '') this.route = this.router.url;
    return this.route == routePath;
  }

}
