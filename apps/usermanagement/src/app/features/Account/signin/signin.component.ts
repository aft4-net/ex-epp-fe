import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { AccountInfo, AuthenticationResult } from '@azure/msal-browser';
import { NotificationBar } from '../../../utils/feedbacks/notification';
import {AuthenticationService} from './../../../../../../../libs/common-services/Authentication.service'


@Component({
  selector: 'exec-epp-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],

})
export class SigninComponent implements OnInit {

      constructor(private _authenticationService:AuthenticationService,
        private authService: MsalService, 
        private notification: NotificationBar,
        private router: Router) {}
  
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
        this._authenticationService.getLoggedInUserAuthToken(response.account?.username).subscribe(
          (res) => {            
            if(res.Data && res.Data.Token){
              localStorage.setItem('loggedInUserInfo', JSON.stringify(res.Data ||'{}'));
            }
            this._authenticationService.storeLoginUser(response.account);
            this.router.navigateByUrl('');
          },
          (error) => {
            this.logout();
            if ([401].includes(error.status)) {
              this.notification.showNotification({
                type: 'error',
                content: "Unauthorized, please contact admin",
                duration: 5000,
              });
            }
          }
        ); 
        
        
       // window.location.reload();
        //this.router.navigateByUrl('user-dashboard');
       }
       else{
        this.router.navigateByUrl('usermanagement');
       }
        
      });
  }

  logout() {
      this.authService.logout();
      window.sessionStorage.clear();
      localStorage.removeItem('loggedInUserInfo');
      window.location.reload();
  }
}

