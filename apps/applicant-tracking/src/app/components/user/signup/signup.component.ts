import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  showPassword: boolean = false;
  signUpForm = new FormGroup({
    firstName: new FormControl('', []),
    lastName: new FormControl('', []),
    email: new FormControl('', []),
    password: new FormControl('', []),
    confirmPassword: new FormControl('', []),
  });

  signup() {}
  togglePasswordView() {
    this.showPassword = !this.showPassword;
  }

  constructor() {}

  ngOnInit(): void {}
}
