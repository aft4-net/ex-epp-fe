import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../../services/user/account.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  showPassword: boolean = false;
  loginForm = new FormGroup({
    email: new FormControl('', []),
    password: new FormControl('', []),
  });

  login() {
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

  ngOnInit(): void {}
}
