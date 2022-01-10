import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {AuthenticationService} from './../../../../libs/common-services/Authentication.service'
@Component({
  selector: 'exec-epp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'epp-dashboard';
  isLogin=false
  constructor(private _authenticationService:AuthenticationService, private router:Router ){
     this.isLogin=_authenticationService.loginStatus();
     if(!this.isLogin){
      // window.location.reload();
       this.router.navigateByUrl('usermanagement');
     }
  }
}
