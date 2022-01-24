import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import {AuthenticationService} from './../../../../libs/common-services/Authentication.service';
import { CommonDataService } from '../../../../libs/common-services/commonData.service';
@Component({
  selector: 'exec-epp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  route = '';
  isLogin=false;
  checker1= false;
  counter = 1;
  title = 'eppconfiguration';
  constructor(public _commonData:CommonDataService, private _authenticationService:AuthenticationService,  private router: Router, private authService: MsalService){}

  ngOnInit(): void {
    this._commonData.getPermission();
    this.isLogin=this._authenticationService.loginStatus();
    if(!this.isLogin){
     // window.location.reload();
      this.router.navigateByUrl('usermanagement/sign_in');
    }
    else{
      if(this._authenticationService.loginCount==0){
        this._authenticationService.loginCount=1
        this.router.navigateByUrl('eppconfiguration');
      }
      else{
        this.router.navigateByUrl('eppconfiguration');
      }
    }
  }

  
  activePath(routePath: string) {
    if (this.route === '') this.route = this.router.url;
    return this.route == routePath;
  }

  isLoggedIn(): boolean {
    return this.authService.instance.getActiveAccount() != null;
  }
}
