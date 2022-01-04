import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';
import {AuthenticationService} from './../../../../../../../libs/common-services/Authentication.service'


@Component({
  selector: 'exec-epp-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],

})
export class SigninComponent implements OnInit {

      constructor(private _authenticationService:AuthenticationService,private authService: MsalService, private router: Router) {}
  
  ngOnInit(): void {
    
    this.authService.instance.handleRedirectPromise().then( res => {
      if (res != null && res.account != null) {
        this.authService.instance.setActiveAccount(res.account)
      }
    })
   }

   isLoggedIn(): boolean {
     //return true;
    return this.authService.instance.getActiveAccount() != null
   }

  login() {
   
   
    this.authService.loginPopup()
      .subscribe((response: AuthenticationResult) => {
       const data=   this.authService.instance.setActiveAccount(response.account);
      
       if(response.account?.username){
        this._authenticationService.storeLoginUser(response.account)
        
        
       // window.location.reload();
        this.router.navigateByUrl('user-dashboard');
       }
       else{
        this.router.navigateByUrl('usermanagement');
       }
        
      });
  }

  logout() {
    this.authService.logout();
      window.sessionStorage.clear();
    window.location.reload();

  }
}

