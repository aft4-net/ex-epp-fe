import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, provideRoutes } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
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

//user = this.accountService.userInfo;

activePath(routePath: string) {
  if (this.route === '') this.route = this.router.url;
  return this.route == routePath;
}

constructor(public _commonData:CommonDataService,private _authenticationService:AuthenticationService,  private router: Router, private authService: MsalService){
  this._commonData.getPermission();
}

ngOnInit(): void {
  console.log()
}
ngAfterContentInit() {
 
  this.isLogin=this._authenticationService.loginStatus();
  if(!this.isLogin){
   // window.location.reload();
    this.router.navigateByUrl('usermanagement/sign_in');
  }
  else{
    if(this._authenticationService.loginCount==0){
      this._authenticationService.loginCount=1
      this.router.navigateByUrl('usermanagement');
    }
    else{
      this.router.navigateByUrl('usermanagement');
    }
  }
}
isLoggedIn(): boolean {
  return this.authService.instance.getActiveAccount() != null;
}
}

