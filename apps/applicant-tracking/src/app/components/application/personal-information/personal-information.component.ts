import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { FormValidator } from '../../../utils/validator'; 
import { Router } from '@angular/router';

import { AccountService } from '../../../services/user/account.service';

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
    country: new FormControl(this.selectedValue?.name, [Validators.required]),
    phoneNumber: new FormControl('', [
      this.validator.validatePhoneNumber(this.selectedValue?.dial_code),
      Validators.required,
    ]),
  });

  onCountryChange(value: any) {
    this.selectedValue = { ...value };
    this.personalInformation.controls.country.setValue(value?.name);
    this.personalInformation.controls.phoneNumber.updateValueAndValidity();
  }

  get signUpEmail(): AbstractControl | null {
    return this.personalInformation?.get('email');
  }

  constructor(private router: Router, private accountService: AccountService, private validator: FormValidator) {}
  fileList: any[] = [];
  url = '';
  beforeUpload = (file: any): boolean => {
    const type = file.type;

    const str = ['application/pdf', 'image/jpg', 'image/jpeg', 'image/png'];
    if (str.indexOf(type) < 0) {
      return false;
    }
    const isLt20M = file.size / 1024 / 1024 < 30;
    if (!isLt20M) {
      return false;
    }
    this.fileList = [file];
    return true;
  };
  getFileUrl({ file, fileList }: any): void {
    console.log('ejrhhjer');
    const status = file.status;
    if (status === 'done') {
      this.url = file.response.data;
      console.log(file);
    } else if (status === 'error') {
      console.log('dfj');
    }
  }

  ngOnInit(): void {
    this.personalInformation.controls.country.valueChanges.subscribe(() => {
      this.personalInformation.controls.phoneNumber.setValidators([
        this.validator.validatePhoneNumber(this.selectedValue.dial_code),
        Validators.required,
      ]);
    });
  }
  onInputClick(e: any) {}
  onClick(e: any) {
    console.log(this.fileList);
  }
  onUploadChange(e: any) {}
}
