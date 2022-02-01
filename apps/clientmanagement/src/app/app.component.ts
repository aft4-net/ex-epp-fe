import { Component, OnInit } from '@angular/core';

import { CommonDataService } from '../../../../libs/common-services/commonData.service';

@Component({
  selector: 'exec-epp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'clientmanagement';
  constructor(private _commonData:CommonDataService){

  }
  ngOnInit(): void {
    this._commonData.getPermission();
  }
}
