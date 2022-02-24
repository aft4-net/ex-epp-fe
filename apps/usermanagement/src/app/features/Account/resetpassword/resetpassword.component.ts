import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from './../../../../../../../libs/common-services/Authentication.service';
import { NotificationBar } from '../../../utils/feedbacks/notification';
import { FormValidator } from '../../../utils/validator';
import { AccountService } from '../../Services/logIn/account.service';
import { ResponseDTO } from '../../../models/ResponseDTO';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'exec-epp-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss'],
})
export class ResetpasswordComponent implements OnInit {
  showPassword = false;
  loading = false;
  isValidUser = false;
  taskCompleted = false;
  message ='';
  loggedInUser = JSON.parse(localStorage.getItem('loggedInUserInfo') ?? '{}');
  email = '';
  redirectUrl = environment.redirectUri + '/usermanagement/logIn';
  constructor(
    private _authenticationService: AccountService,
    private _changePass: AuthenticationService,
    private validator: FormValidator,
    private router: Router,
    private notification: NotificationBar,
    private route: ActivatedRoute
  ) {}

  changePasswordForm = new FormGroup({
    Password: new FormControl(null, [
      this.validator.validatePassword(),
      Validators.required,
      Validators.minLength(8),
    ]),
    ConfirmPassword: new FormControl(null, [
      this.validator.validatePassword(),
      Validators.required,
      Validators.minLength(8),
    ]),
    Email: new FormControl(),
  });

  changePassword() {
    this.loading = true;
    const dataToPost = this.changePasswordForm.value;
    dataToPost.Email = this.email;
    
    this._authenticationService.resetPassword(dataToPost).subscribe(
      () => {
        this.loading = false;
        this._changePass.hasData(true);
        this.message = "You have successfully changed your password. Login with your updated password."
        this.taskCompleted=true;
      },
      (error: any) => {
        this.loading = false;
        console.log(error);
        this.notification.showNotification({
          type: 'error',
          content: 'Error occured, Please try again',
          duration: 5000,
        });
      }
    );
  }

  togglePasswordView() {
    this.showPassword = !this.showPassword;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const token = params?.token;
      const email = params?.uid;

    
      if (!token || !email) {
        this.isValidUser = false;
        this.router.navigate(['usermanagement/login']);
        return;
      } else {
        this._authenticationService
          .ValidatePasswordResetToken(email, token)
          .subscribe(
            (res: ResponseDTO<any>) => {
              if(res.ResponseStatus.toString()==='Success')
              {
                this.isValidUser=true;
                this.email = email;
                localStorage.removeItem('loggedInUserInfo');

              }
              else
              {
              this.taskCompleted = true;
                if(res?.Message?.toLowerCase() == 'token expired')
                {
                  this.message = "Your token  has expired! You need to apply the request again."
                }
                else
                {
                  this.router.navigateByUrl('/usermanagement/logIn');
                }
              }
            },
            (err:ResponseDTO<any>) => {
              this.notification.showNotification({
                type: 'error',
                content: 'Some error occured. Please try again or contact the admin.',
                duration: 5000,
              });
              
            }
          );
      }
    });

    this.changePasswordForm.controls.Password.valueChanges.subscribe((val) => {
      this.changePasswordForm.controls.ConfirmPassword.setValidators([
        this.validator.validateConfirmPassword(val),
      ]);
      this.changePasswordForm.controls.ConfirmPassword.updateValueAndValidity();
    });
  }
  navigateToLogin()
  {
    this.router.navigate(['/usermanagement/logIn']);
  }
}
