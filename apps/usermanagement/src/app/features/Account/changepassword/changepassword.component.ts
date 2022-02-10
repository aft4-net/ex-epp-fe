import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthenticationService} from './../../../../../../../libs/common-services/Authentication.service'
import { NotificationBar } from '../../../utils/feedbacks/notification';
import { FormValidator } from '../../../utils/validator';
import { AccountService } from '../../../services/user/account.service';

@Component({
  selector: 'exec-epp-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {
  showPassword = false;
  showOldPassword = false;
  loading = false;
  loggedInUser = JSON.parse(
    localStorage.getItem('loggedInUserInfo') ?? '{}'
  );
  
  constructor(
    private _authenticationService:AccountService,
    private _changePass:AuthenticationService,
    private validator: FormValidator, 
    private router: Router, 
    private notification: NotificationBar) {}

  changePasswordForm = new FormGroup({
    OldPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      
    ]),
    Password: new FormControl('', [
      this.validator.validatePassword(),
      this.validator.validateNewPassword(),
      Validators.required,
      Validators.minLength(8),
    ]),
    ConfirmPassword: new FormControl('', [
      this.validator.validatePassword(),
      Validators.required,
      Validators.minLength(8),
    ]),
    Email: new FormControl()
  });

  changePassword() {
    this.loading = true;
    const dataToPost = this.changePasswordForm.value;
    dataToPost.Email = this.loggedInUser.Email;
    console.log(this.loggedInUser);
    this._authenticationService.changePassword(dataToPost).subscribe(() => {
      this.loading = false;
      this._changePass.hasData(true);
      this.router.navigateByUrl('');
      this.notification.showNotification({
        type: 'success',
        content: 'Successfully changed password!',
        duration: 5000,
      });
    }, (error:any) => {
      this.loading = false;
      console.log(error);
      this.notification.showNotification({
        type: 'error',
        content: 'Error occured, Please try again',
        duration: 5000,
      });
    })
  }

  togglePasswordView() {
    this.showPassword = !this.showPassword;
  }
  toggleOldPasswordView() {
    this.showOldPassword = !this.showOldPassword;
  }
  ngOnInit(): void {
    this.changePasswordForm.controls.OldPassword.valueChanges.subscribe((val) => {

      this.changePasswordForm.controls.Password.setValidators([
        this.validator.validatePassword(),
        this.validator.validateNewPassword(),
      ]);
      this.changePasswordForm.controls.Password.updateValueAndValidity();
    });
    this.changePasswordForm.controls.Password.valueChanges.subscribe((val) => {

      this.changePasswordForm.controls.ConfirmPassword.setValidators([
        
        this.validator.validateConfirmPassword(val),
        this.validator.validatePassword(),
        this.validator.validateNewPassword(),
        Validators.required,
        Validators.minLength(8),
      ]);
      this.changePasswordForm.controls.ConfirmPassword.updateValueAndValidity();
    });
  }

}
