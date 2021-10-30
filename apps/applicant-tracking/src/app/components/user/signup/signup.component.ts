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
    firstName: new FormControl('', []),
    lastName: new FormControl('', []),
    email: new FormControl('', []),
    password: new FormControl('', []),
    confirmPassword: new FormControl('', []),
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
    this.signUpForm.controls.firstName.setValidators([
      this.validator.validateName(),
      Validators.required,
    ]);
    this.signUpForm.controls.lastName.setValidators([
      this.validator.validateName(),
      Validators.required,
    ]);
    this.signUpForm.controls.email.setValidators([
      this.validator.validateEmail(),
      Validators.required,
    ]);
    this.signUpForm.controls.password.setValidators([
      this.validator.validatePassword(),
      Validators.required,
      Validators.minLength(8),
    ]);

    this.signUpForm.controls.password.valueChanges.subscribe(() => {
      this.signUpForm.controls.confirmPassword.setValidators([
        Validators.required,
        Validators.minLength(8),
        this.validator.validatePassword(),
        this.validator.validateConfirmPassword(
          this.signUpForm?.get('password')?.value
        ),
      ]);
      this.signUpForm.controls.confirmPassword.updateValueAndValidity();
    });
  }
}
