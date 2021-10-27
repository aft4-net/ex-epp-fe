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

import { NzAvatarModule } from 'ng-zorro-antd/avatar';

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
    imgPhoto: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    country: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [
      Validators.required,
      this.validatePhoneNumber(),
    ]),
  });
  zizhi_prove: any;

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
  fileList: any[] = [];
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
    this.fileList = this.fileList.concat(file);
    return true;
  };
  getFileUrl({ file, fileList }: any): void {
    const status = file.status;
    if (status === 'done') {
      this.zizhi_prove = file.response.data;
    } else if (status === 'error') {
      console.log('dfj');
    }
  }

  ngOnInit(): void {}

  onClick(e: any) {
    console.log(e);
  }
}
