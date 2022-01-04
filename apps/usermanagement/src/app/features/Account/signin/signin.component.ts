import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';
///import{MsalService} from '@azure/msal-angular';
//import{AuthenticationResult} from '@azure/msal-browser'


@Component({
  selector: 'exec-epp-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],

})
export class SigninComponent implements OnInit {

     constructor(private authService: MsalService, private router: Router) {}
  
  ngOnInit(): void {
    
   this.authService.instance.handleRedirectPromise().then( res => {
 if (res != null && res.account != null) {
    this.authService.instance.setActiveAccount(res.account)
    }
  })
   }

   isLoggedIn(): boolean {
     return true;
  //   return this.authService.instance.getActiveAccount() != null
   }

  login() {
    
     this.authService.loginRedirect();
     this.authService.loginPopup() .subscribe((response: AuthenticationResult) => {
     const data=   this.authService.instance.setActiveAccount(response.account);
     
    console.log('data');
    console.log(response.account);
    console.log(this.router.navigateByUrl('usermanagement'));
    this.router.navigateByUrl('usermanagement');
     window.location.reload();
   });
  }

  logout() {
   this.authService.logout();
    window.location.reload();
  }
}

