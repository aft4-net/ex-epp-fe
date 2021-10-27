import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../../services/user/account.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  showPassword: boolean = false;
  loginForm = new FormGroup({
    email: new FormControl('', 
    [Validators.required, 
      Validators.email]),

    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]),
  });
  get loginEmail(): AbstractControl | null {
    return this.loginForm.get('email');
  }
  get loginPassword(): AbstractControl | null {
    return this.loginForm.get('password');
  }

  login() {
    alert('what');
    console.log(this.loginForm);
    this.accountService.signIn(this.loginForm.value).subscribe(response => {
      const returnUrl = this.rout.snapshot.queryParams['returnUrl'] || '';
      this.router.navigateByUrl(returnUrl);
      console.log(response.data.email);
      console.log(response.exception);
      },error => {
          console.log(error);
      }
);
  }

  togglePasswordView() {
    this.showPassword = !this.showPassword;
  }
  
  constructor(private accountService: AccountService, private router: Router, private rout : ActivatedRoute) {}
}
