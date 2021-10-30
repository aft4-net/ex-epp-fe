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
import { FormValidator } from '../../../utils/validator';

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
    firstName: new FormControl('', []),
    lastName: new FormControl('', []),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ),
    ]),
    country: new FormControl(this.selectedValue?.name, [Validators.required]),
    phoneNumber: new FormControl('', []),
  });

  onCountryChange(value: any) {
    this.selectedValue = { ...value };
    this.personalInformation.controls.country.setValue(value?.name);
    this.personalInformation.controls.phoneNumber.updateValueAndValidity();
  }

  get signUpEmail(): AbstractControl | null {
    return this.personalInformation?.get('email');
  }

  validateName(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      var name = control.value;
      var isValid = name.match('^[a-zA-Z]*$');
      return !isValid ? { value: control.value } : null;
    };
  }

  validateEmail(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      var email = control.value;
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      var isValid = re.test(String(email).toLowerCase());
      return !isValid ? { value: control.value } : null;
    };
  }

  constructor(private validator: FormValidator) {}
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
    this.personalInformation.controls.firstName.setValidators([
      this.validator.validateName(),
      Validators.required,
    ]);
    this.personalInformation.controls.lastName.setValidators([
      this.validator.validateName(),
      Validators.required,
    ]);
    this.personalInformation.controls.email.setValidators([
      this.validator.validateEmail(),
      Validators.required,
    ]);
    
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
