import { Component } from '@angular/core';
import {AbstractControl,FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../../../Services/logIn/account.service';
import { NotificationBar } from '../../../../utils/feedbacks/notification';
import { FormValidator } from '../../../../utils/validator';
import { AuthenticationService } from 'libs/common-services/Authentication.service';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';


@Component({
  selector: 'exec-epp-app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  showPassword = false;
  loading = false;
  loginForm = new FormGroup({
    email: new FormControl('', [
      this.validator.validateEmail(),
      Validators.required,
    ]),
    password: new FormControl('', [
      this.validator.validatePassword(),
      Validators.required,
      Validators.minLength(8),
    ]),
  });
  get loginEmail(): AbstractControl | null {
    return this.loginForm.get('email');
  }
  get loginPassword(): AbstractControl | null {
    return this.loginForm.get('password');
  }

  loginWithMSAccount() {
   
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
            console.log(response.account);
            this._authenticationService.hasData(true);
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

  signin() {
    this.loading = true;
    this._authenticationService.signIn(this.loginForm.value).subscribe(
      (res) => {
        if(res.Data && res.Data.Token){
          localStorage.setItem('loggedInUserInfo', JSON.stringify(res.Data ||'{}'));
        } 
        this._authenticationService.storeLoginUsers(res.Data);
        
        if(res.ResponseStatus.toString().toLowerCase() === 'info'){
          this.router.navigateByUrl('/usermanagement/changepassword');
        } 
        
        else{
          this.router.navigateByUrl('');
          this.loading = false;
        }
        
      },
      (error) => {
        this.loading = false;
        console.log(error);
        if(error === 'Not Found')
        {
          this.notification.showNotification({
            type: 'error',
            content: 'The account doesn not exist!',
            duration: 5000,
          });
          return;
        }
        this.notification.showNotification({
          type: 'error',
          content: 'User email or password is incorrect, please try again!',
          duration: 5000,
        });
      }
    );
  }

  togglePasswordView() {
    this.showPassword = !this.showPassword;
  }

  constructor(
   
    private router: Router,
    private notification: NotificationBar,
    private validator: FormValidator,
    private authService: MsalService, 
    private _authenticationService:AuthenticationService
  ) {}

}
