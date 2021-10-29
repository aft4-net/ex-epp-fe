import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { phone } from 'phone';

@Component({
  selector: 'exec-epp-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss'],
})
export class PersonalInformationComponent implements OnInit {
  selectedValue = {
    name: 'Ethiopia',
    dial_code: '+251',
    code: 'ET',
  };

  personalInformation = new FormGroup({
    imgPhoto: new FormControl(''),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    country: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [
      Validators.required,
      this.validatePhoneNumber(),
    ]),
  });

  onCountryChange(value: any) {
    this.selectedValue = { ...value };
    this.personalInformation.controls.phoneNumber.updateValueAndValidity();
  }

  validatePhoneNumber(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      var phonenumber = this.selectedValue.dial_code + control.value;
      var { isValid } = phone(phonenumber);
      return !isValid ? { confirmPassword: { value: control.value } } : null;
    };
  }

  get signUpEmail(): AbstractControl | null {
    return this.personalInformation?.get('email');
  }

  constructor() {}

  ngOnInit(): void {}
}
