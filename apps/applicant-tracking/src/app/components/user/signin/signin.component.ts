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
  loading: boolean = false;
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
    this.loading = true;
    this.accountService.signIn(this.loginForm.value).subscribe(
      (res) => {
        this.router.navigateByUrl('application/personal-information');
        window.location.reload();
        this.loading = false;
      },
      (error) => {
        console.log(error);
        this.loading = false;
        this.notification.showNotification({
          type: 'error',
          content: 'User email and password is invalid, please try again!',
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
