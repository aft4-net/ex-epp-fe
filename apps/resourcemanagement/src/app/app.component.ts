import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonDataService } from '../../../../libs/common-services/commonData.service';

@Component({
  selector: 'exec-epp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'resourcemanagement';
  route =''

  constructor(private router: Router,public _commonData:CommonDataService){
    this.route= router.url;
    _commonData.getPermission();
  }


}
