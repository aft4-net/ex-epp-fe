import { Component, OnInit } from '@angular/core';
import { PermissionService } from './core/services/permission.service';


import {CommonDataService} from '../../../../libs/common-services/commonData.service'

@Component({
  selector: 'exec-epp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'projectmanagement';



  constructor(private permissionService:PermissionService,private _commonData:CommonDataService)
  {
   _commonData.getPermission();
  }

  ngOnInit(): void {
  this.permissionService.setUserPermissions();

  }
  

}
