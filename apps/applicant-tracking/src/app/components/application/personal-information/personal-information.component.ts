import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { FormValidator } from '../../../utils/validator';
import { environment } from 'apps/applicant-tracking/src/environments/environment';
import { ApplicantGeneralInfoService } from '../../../services/applicant/applicant-general-info.service';
import { Router } from '@angular/router';
import { AccountService } from '../../../services/user/account.service';

@Component({
  selector: 'personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss'],
})
export class PersonalInformationComponent implements OnInit {
  loggedInUser: any;
  photoUrl = '';
  resumeUrl = '';
  photoResponseUrl = '';
  resumeResponseUrl = '';
  update_url = '';
  photFileList: any = [];
  resumeFileList: any = [];
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
    email: new FormControl({ value: '', disabled: true }, [
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
  validateLetterName(str: string) {
    return str.length === 1 && str.match(/[a-z]/i);
  }

  constructor(
    private applicantService: ApplicantGeneralInfoService,
    private router: Router,
    private acctServce: AccountService,
    private validator: FormValidator
  ) {
    this.photoUrl = environment.photoUploadUrl;
    this.resumeUrl = environment.resumeUploadUrl;
  }

  beforeUploadPhoto = (file: any): boolean => {
    const type = file.type;
    const str = ['application/pdf', 'image/jpg', 'image/jpeg', 'image/png'];
    if (str.indexOf(type) < 0) {
      return false;
    }
    const isLt20M = file.size / 1024 / 1024 < 30;
    if (!isLt20M) {
      return false;
    }
    this.photFileList = [file];
    return true;
  };
  beforeUploadResume = (file: any): boolean => {
    this.resumeFileList = [file];
    return true;
  };

  onPhotoUploadChange() {
    this.photFileList?.map((file: any) => {
      if (file.response) {
        this.photoResponseUrl = file.response['dbPath'];
      }
      return file;
    });
  }

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
      this.url = file.response.Data;
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
