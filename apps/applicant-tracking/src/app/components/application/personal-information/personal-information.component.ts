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
import { environment } from 'apps/applicant-tracking/src/environments/environment';
import { ApplicantGeneralInfoService } from '../../../services/applicant/applicant-general-info.service';
import { PersonalInfoModel } from '../../../models/applicant/personal-info.model';
import { first } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AccountService } from '../../../services/user/account.service';
import { SignInResponse } from '../../../models/user/signInResponse';

@Component({
  selector: 'exec-epp-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss'],
})
export class PersonalInformationComponent implements OnInit {
  loggedInUser:any;
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
    firstName: new FormControl('', [Validators.required]), 
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    country: new FormControl(this.selectedValue?.name, [Validators.required]),
    phoneNumber: new FormControl('', [
      Validators.required,
      this.validatePhoneNumber(),
    ]),
  });

  onCountryChange(value: any) {
    this.selectedValue = { ...value };
    this.personalInformation.controls.country.setValue(value?.name);
    this.personalInformation.controls.phoneNumber.updateValueAndValidity();
  }

  validatePhoneNumber(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const phonenumber = this.selectedValue.dial_code + control.value;
      const { isValid } = phone(phonenumber);
      return !isValid ? { confirmPassword: { value: control.value } } : null;
    };
  }

  get signUpEmail(): AbstractControl | null {
    return this.personalInformation?.get('email');
  }
   validateLetterName(str:string) {
    return str.length === 1 && str.match(/[a-z]/i);
  }

  constructor(private applicantService: ApplicantGeneralInfoService, 
    private router:Router,
    private acctServce: AccountService) {
    this.photoUrl = environment.photoUploadUrl;
    this.resumeUrl = environment.resumeUploadUrl;
    this.update_url =  '/Applicant/Register';

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
  ngOnInit(): void {
 ;
  }
  onPhotoUploadChange() {
    this.photFileList?.map((file:any )=> {
      if (file.response) {
        this.photoResponseUrl = file.response['dbPath'];
      }
      return file;
    });

  }
  onResumeUploadChange() {
    this.resumeFileList?.map((file:any) => {
      if (file.response) {
        this.resumeResponseUrl = file.response['dbPath']
      }
      return file;
    });

  }
  onFormSubmit()
  {
    
    const personInfo: PersonalInfoModel =   {
      guid: 'ccfab781-305d-4ead-8da5-b080b69c3a0b',
      email: this.personalInformation.get('email')?.value,  
      firstName: this.personalInformation.get('firstName')?.value,  
      lastName: this.personalInformation.get('lastName')?.value,  
      country: this.personalInformation.get('country')?.value,  
      contactNumber: this.personalInformation.get('phoneNumber')?.value,  
      photoUrl: this.photoResponseUrl,  
      resumeUrl: this.resumeResponseUrl 
    };

    this.applicantService.put(this.update_url,personInfo).subscribe(
      () => {
        console.log(this.acctServce.loggedInUser);
        console.log(localStorage.getItem('loggedInUserInfo'));
        console.log('success');
        this.applicantService.setRoutInfo('/application/area-of-interest');
        this.router.navigate(['/application/area-of-interest']);
       

      }, err => {
        //this.errors = err;
        //this.isSubmitting = false;
        console.log('error:' + err);
      }
    );
  }
 
}
