import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SignInResponse } from '../../../models/user/signInResponse';
import { AccountService } from '../../../services/user/account.service';
import { NotificationBar } from '../../../utils/feedbacks/notification';
import { FormValidator } from '../../../utils/validator';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  showPassword: boolean = false;
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

  login() {
    this.accountService.signIn(this.loginForm.value).subscribe(
      (res) => {
        if (res.ResponseStatus.toString()==='Error'){
          this.router.navigateByUrl('user/signin');
          this.notification.showNotification({
            type: 'error',
            content: 'Please provide correct email and password combination!',
            duration: 5000,
          });
        }
        else{
          this.router.navigateByUrl('application/personal-information');
          window.location.reload();
        }
      },
      (error) => {
        console.log(error);
        this.notification.showNotification({
          type: 'error',
          content: error,
          duration: 5000,
        });
      }
    );
  }

  togglePasswordView() {
    this.showPassword = !this.showPassword;
  }

  constructor(
    private accountService: AccountService,
    private router: Router,
    private notification: NotificationBar,
    private validator: FormValidator
  ) {}

  ngOnInit(): void {}
}
