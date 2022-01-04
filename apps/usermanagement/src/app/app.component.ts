import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, provideRoutes } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
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

constructor(private _authenticationService:AuthenticationService,  private router: Router, private authService: MsalService){}

ngOnInit(): void {
  this.isLogin=this._authenticationService.loginStatus();
  if(!this.isLogin){
   // window.location.reload();
    this.router.navigateByUrl('usermanagement/sign_in');
  }
  else{
    this.router.navigateByUrl('');
  }
}

isLoggedIn(): boolean {
  return this.authService.instance.getActiveAccount() != null;
}
}

