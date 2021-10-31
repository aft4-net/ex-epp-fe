import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FormValidator } from '../../../utils/validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  showPassword = false;

  constructor(private validator: FormValidator) {}

  signUpForm = new FormGroup({
    firstName: new FormControl('', [
      this.validator.validateName(),
      Validators.required,
    ]),
    lastName: new FormControl('', [
      this.validator.validateName(),
      Validators.required,
    ]),
    email: new FormControl('', [
      this.validator.validateEmail(),
      Validators.required,
    ]),
    password: new FormControl('', [
      this.validator.validatePassword(),
      Validators.required,
      Validators.minLength(8),
    ]),
    confirmPassword: new FormControl('', [
      this.validator.validatePassword(),
      Validators.required,
      Validators.minLength(8),
    ]),
  });
  get signUpEmail(): AbstractControl | null {
    return this.signUpForm?.get('email');
  }
  get signUpPassword(): AbstractControl | null {
    return this.signUpForm?.get('password');
  }
  get signUpConfirmPassword(): AbstractControl | null {
    return this.signUpForm?.get('confirmPassword');
  }

  signup() {}

  togglePasswordView() {
    this.showPassword = !this.showPassword;
  }

  ngOnInit(): void {
    this.signUpForm.controls.password.valueChanges.subscribe((val) => {
      this.signUpForm.controls.confirmPassword.setValidators([
        this.validator.validateConfirmPassword(val),
        this.validator.validatePassword(),
        Validators.required,
        Validators.minLength(8),
      ]);
      this.signUpForm.controls.confirmPassword.updateValueAndValidity();
    });
  }
}
