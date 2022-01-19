import { Component, OnInit } from '@angular/core';
import { PermissionService } from './core/services/permission.service';

@Component({
  selector: 'exec-epp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'projectmanagement';



  constructor(private permissionService:PermissionService)
  {

  }

  ngOnInit(): void {

  this.permissionService.setUserPermissions();

  }

}
