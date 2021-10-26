import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Validator } from '../../../interfaces/validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit, Validator {
  showPassword = false;
  signUpForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      this.validateConfirmPassword(),
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

  signup() {

  }


  togglePasswordView() {
    this.showPassword = !this.showPassword;
  }

  validateConfirmPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isValid = this.signUpForm?.get('password')?.value !== control.value;
      return isValid ? { confirmPassword: { value: control.value } } : null;
    };
  }

  constructor() {}

  ngOnInit(): void {
    this.signUpForm.controls.password.valueChanges.subscribe(() => {
      this.signUpForm.controls.confirmPassword.updateValueAndValidity();
    });
  }
}
