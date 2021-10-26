import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
} from '@angular/forms';

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

  login() {}
  togglePasswordView() {
    this.showPassword = !this.showPassword;
  }

  ngOnInit(): void {}
}
