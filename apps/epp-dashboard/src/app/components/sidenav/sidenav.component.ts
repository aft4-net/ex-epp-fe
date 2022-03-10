import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../../../../libs/common-services/Authentication.service';
import { PermissionListService } from '../../../../../../libs/common-services/permission.service';

import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'exec-epp-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @Output() newSidenavEvent = new EventEmitter<boolean>();

  constructor(
    private _authenticationService:AuthenticationService,
    private _router:Router,
    private _permissionService:PermissionListService,
  ) { }
  

  loading = false;

  ngOnInit(): void {
  }

  closeSidenav() {
    this.newSidenavEvent.emit(false);
  }

  routetoResourceManagement(){
    this.loading = true;
    console.log('jjjjj');
    console.log(this.loading);
    // setTimeout(() => { 
    //   this.loading= false;
    //  }, 1000);
    this._authenticationService.setFromViewProfile2();
    this._router.navigate(['resourcemanagement']);
  }

  authorize(key:string){
    return this._permissionService.authorizedPerson(key);
  }

}
