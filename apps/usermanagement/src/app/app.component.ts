import { Component, OnInit } from '@angular/core';
import { Router, } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { PermissionListService } from 'libs/common-services/permission.service';
import { CommonDataService } from '../../../../libs/common-services/commonData.service';
import {AuthenticationService} from './../../../../libs/common-services/Authentication.service'
interface RouteLinks {
  name: string;
  link: string;
}

@Component({
  selector: 'exec-epp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  route = '';

isLogin=false;
checker1= false;
counter = 1;
usersIsActive!: boolean;
groupsIsActive!: boolean;

//user = this.accountService.userInfo;

activePath(routePath: string) {
  if (this.route === '') this.route = this.router.url;
  return this.route == routePath;
}

constructor(public _commonData:CommonDataService,
  private _authenticationService:AuthenticationService, 
  private _permissionService: PermissionListService,
   private router: Router, private authService: MsalService){
  this._commonData.getPermission();
}

ngOnInit(): void {
  this.isLogin=this._authenticationService.loginStatus();
  if(!this.isLogin){
   // window.location.reload();
    //this.router.navigateByUrl('usermanagement/sign_in');
    this.router.navigateByUrl('usermanagement/logIn');
  }
  else{
    let route ='usermanagement';
    this._commonData.permissionList$.subscribe(res => {
      // if(res.map(res => res.KeyValue).indexOf("View_User") === -1) {
      //   route =this.route= 'usermanagement/group';
      // }
      // else {
      //   route = 'usermanagement'
      // }
      // this.router.navigateByUrl(route);
      
      if(res.map(res => res.KeyValue).length > 0 && res.map(res => res.KeyValue).indexOf("View_User") === -1 && this.router.url == '/usermanagement') {
        this.groupsIsActive = true;
        this.router.navigateByUrl("usermanagement/group");
      } else {
        this.usersIsActive = true;
      }
    });
  }
  

}
authorize(key: string): boolean {
  return this._permissionService.authorizedPerson(key);
}
ngAfterContentInit() {
 ;
  
}
isLoggedIn(): boolean {
  return this.authService.instance.getActiveAccount() != null;
}
get hasSingleGroupPermission() :boolean
{
  return this._permissionService.hasSingleGroupPermission;
}
get hasSingleUserPermission() :boolean
{
  return this._permissionService.hasSingleUserPermission;
}
}

