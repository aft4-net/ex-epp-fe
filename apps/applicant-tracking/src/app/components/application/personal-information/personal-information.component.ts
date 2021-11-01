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
import { NotificationBar } from '../../../utils/feedbacks/notification';
import { MessageBar } from '../../../utils/feedbacks/message';

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
  uploadingResume = false;
  uploadingProfile = false;
  photoFileList: any = [];
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
    resumeUrl: new FormControl('', [Validators.required]),
    profileUrl: new FormControl('', []),
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
    private validator: FormValidator,
    private notification: NotificationBar,
    private message: MessageBar
  ) {
    this.photoUrl = `${environment.apiUrl}/ApplicantProfile/FileUploadHandler`;
    this.resumeUrl = `${environment.apiUrl}/ApplicantProfile/FileUploadHandler`;
  }

  beforeUploadPhoto = (file: any): boolean => {
    const type = file.type;
    const str = ['image/jpg', 'image/jpeg', 'image/png'];
    if (str.indexOf(type) < 0) {
      return false;
    }
    const isLt20M = file.size / 1024 / 1024 < 10;
    if (!isLt20M) {
      return false;
    }
    this.photoFileList = [file];
    return true;
  };
  beforeUploadResume = (file: any): boolean => {
    const type = file.type;
    const str = ['application/pdf'];
    if (str.indexOf(type) < 0) {
      return false;
    }
    const isLt20M = file.size / 1024 / 1024 < 5;
    if (!isLt20M) {
      return false;
    }
    this.resumeFileList = [file];
    return true;
  };

  onPhotoUploadChange() {
    this.photoFileList?.map((file: any) => {
      if (file.response) {
        this.photoResponseUrl = file.response['dbPath'];
      }
      return file;
    });
  }

  getProfileUrl({ file, fileList, event }: any): void {
    const status = file.status;
    
    if (status === 'uploading') {
      this.uploadingProfile = true;
      this.message.showMessage({type:'loading',content:'Loading', duration:0});
    }
    else if (status === 'done') {
      this.message.stopMessage();
      this.personalInformation.controls.profileUrl.setValue(`${environment.fileUrl}/${file.response.urlLink}`);
      this.notification.showNotification({
        type: 'success',
        content: 'Profile picture has been uploaded successfully!',
        duration: 5000,
      });
      this.uploadingProfile = false;
    } else if (status === 'error') {
      
      this.message.stopMessage();
      this.notification.showNotification({
        type: 'error',
        content: 'There is an error while uploading profile picture, please try again!',
        duration: 5000,
      });
      this.uploadingProfile = false;
    }
  }

  getResumeUrl({ file, fileList, event }: any): void {
    const status = file.status;
    if (status === 'uploading') {
      this.uploadingResume = true;
      this.message.showMessage({type:'loading', content:'Loading', duration:0});
    }
    else if (status === 'done') {
      this.message.stopMessage();
      this.personalInformation.controls.resumeUrl.setValue(`${environment.fileUrl}/${file.response.urlLink}`);
      this.notification.showNotification({
        type: 'success',
        content: 'Resume has been uploaded successfully!',
        duration: 5000,
      });
      this.uploadingResume = false;
    } else if (status === 'error') {
      this.message.stopMessage();
      this.notification.showNotification({
        type: 'error',
        content: 'There is an error while uploading resume, please try again!',
        duration: 5000,
      });
      this.uploadingResume = false;
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
  onClick(e: any) {}
  deleteProfile() {
    this.personalInformation.controls.profileUrl.setValue('');
    this.photoFileList = [];
  }
  onUploadChange(e: any) {}
}
