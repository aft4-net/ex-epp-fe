/* eslint-disable @typescript-eslint/member-ordering */
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

import { NzMessageService } from 'ng-zorro-antd/message';
import { FormErrorMessage, ParameterSegment } from '../accessories/models-types';
import { countriesPhoneData, employeeIdPreficesData, gendersData } from '../accessories/data';
import { extractEmployeeIdNumberPrefix, extractPhonePrefix, setControlError } from '../accessories/functions';
import { PersonalDetailsModel } from '../accessories/models';


@Component({
  selector: 'exec-epp-personal-detail-form',
  templateUrl: './personal-detail-form.component.html',
  styleUrls: ['./personal-detail-form.component.scss']
})
export class PersonalDetailFormComponent implements OnInit {

  fileTypes = 'image/png'
  
  employeeIdNumberPrefices = employeeIdPreficesData
  defaultEmployeeIdPrefix = employeeIdPreficesData[1]
  genders = gendersData

  countriesData = countriesPhoneData
  defaultPhonePrefix = countriesPhoneData[0].prefix

  numberofPhonesMax = 3
  noofEmailsMax = 3
  genderOther = false
  errorMessages = {
    ...{} as FormErrorMessage,
    ...{
      controls: {
        employeeIdNumber: setControlError(true),
        firstName: setControlError(true),
        middleName: setControlError(true),
        lastName: setControlError(true),
        gender: setControlError(true),
        dateofBirth: setControlError(true),
        nationalities: setControlError(true)
      },
      arrays: {
        phones: [
          setControlError(true)
        ],
        emails: [
          setControlError(true)
        ],
      }
    } as Partial<FormErrorMessage>
  } as FormErrorMessage

  phoneNumbersFormArray: FormControl[][]
  emailsFormArray: FormControl[]
  basicPersonalDetailsForm: FormGroup;

  @Input() isNew = true

  @Input() personalDetailsModel: PersonalDetailsModel = {
    employeeIdNumber: null,
    firstName: null,
    middleName: null,
    lastName: null,
    gender: null,
    genderDetail: null,
    dateofBirth: null,
    phoneNumbers: [],
    emails: [],
    nationalities: []
  } as PersonalDetailsModel

  constructor(
    private fb: FormBuilder,
    // private _locationPhoneService: LocationPhoneService,
    private msg: NzMessageService
  ) {
    this.basicPersonalDetailsForm = this.createBasicForm()
    this.emailsFormArray = this.createEmailsForm()
    this.phoneNumbersFormArray = this.createPhoneNumberFormArray()
    this.setFormValues()
  }
  ngOnInit(): void {

  }

  createBasicForm() {
    const form = this.fb.group({
      employeeIdNumberPrefix: [this.defaultEmployeeIdPrefix],
      employeeIdNumber: [null],
      firstName: [null],
      middleName: [null],
      lastName: [null],
      gender: [null],
      dateofBirth: [null],
      nationalities: [null]
    });
    return form
  }

  createPhoneNumberFormArray() {
    let formArray: FormControl[][] = [
      this.createPhoneNumberForm()
    ]
    for (let i = 0; i < this.personalDetailsModel.phoneNumbers.length - 1; i++) {
      formArray = [
        ...formArray,
        this.createPhoneNumberForm()
      ];
    }
    return formArray
  }

  createPhoneNumberForm() {
    return [
      new FormControl(this.defaultPhonePrefix),
      new FormControl(this.defaultPhonePrefix)
    ]
  }

  createEmailsForm() {
    let formArray: FormControl[] = [
      new FormControl(null)
    ];
    for (let i = 0; i < this.personalDetailsModel.emails.length - 1; i++) {
      formArray = [
        ...formArray,
        new FormControl(null)
      ]
    }
    return formArray
  }

  setFormValues() {
    if (this.isNew) {
      return
    }
    this.setEmployeeIdNumber();
    this.setFullName()
    this.setGenderandDateBirth()
    this.setPhoneNumberValues()
    this.setEmailValues()
    this.setNationalities()
  }

  setEmployeeIdNumber() {
    if (this.personalDetailsModel.employeeIdNumber !== null) {
      const segments: ParameterSegment =
        extractEmployeeIdNumberPrefix(
          this.personalDetailsModel.employeeIdNumber,
          this.employeeIdNumberPrefices
        )
      this.basicPersonalDetailsForm.controls['employeeIdNumberPrefix']
        .setValue(segments.prefix);
      this.basicPersonalDetailsForm.controls['employeeIdNumber']
        .setValue(segments.value);
    }
    this.validateEmployeeIdNumber()
  }

  setFullName() {
    this.basicPersonalDetailsForm.controls['firstName']
      .setValue(this.personalDetailsModel.firstName);
    this.validateName('first');

    this.basicPersonalDetailsForm.controls['middleName']
      .setValue(this.personalDetailsModel.middleName);
    this.validateName('middle');

    this.basicPersonalDetailsForm.controls['firstName']
      .setValue(this.personalDetailsModel.lastName);
    this.validateName('last');
  }

  setGenderandDateBirth() {
    this.basicPersonalDetailsForm.controls['gender']
      .setValue(this.personalDetailsModel.gender);
    this.validateGender();

    this.basicPersonalDetailsForm.controls['dateofBirth']
      .setValue(this.personalDetailsModel.dateofBirth);
    this.validateDateofBirth();
  }

  setPhoneNumberValues() {
    if (this.personalDetailsModel.phoneNumbers.length === 0) {
      this.validatePhone();
    } else {
      for (let i = 0; i < this.personalDetailsModel.phoneNumbers.length; i++) {
        if (i > 0) {
          this.errorMessages.arrays.phones = [
            ...this.errorMessages.arrays.phones,
            setControlError(true)
          ];
        }
        const segment = extractPhonePrefix(
          this.personalDetailsModel.phoneNumbers[i],
          this.countriesData
        );
        this.phoneNumbersFormArray[i][0].setValue(segment.prefix);
        this.phoneNumbersFormArray[i][1].setValue(segment.value);
        this.validatePhone(i);
      }
    }
  }

  setEmailValues() {
    if (this.personalDetailsModel.emails.length === 0) {
      this.validateEmail();
    } else {
      for (let i = 0; i < this.personalDetailsModel.emails.length; i++) {
        if (i > 0) {
          this.errorMessages.arrays.emails = [
            ...this.errorMessages.arrays.emails,
            setControlError(true)
          ];
        }
        this.emailsFormArray[i].setValue(this.personalDetailsModel.emails[i]);
        this.validateEmail(i);
      }
    }
  }

  setNationalities() {
    this.basicPersonalDetailsForm.controls['nationalities']
      .setValue(this.personalDetailsModel.nationalities);
    this.validateNationality();
  }

  disabledDate = (startValue: Date): boolean => {
    return startValue.getTime() > Date.now();
  }

  validateEmployeeIdNumber() {
    console.log('EmployeeId Prefix: ', this.basicPersonalDetailsForm.value.employeeIdNumberPrefix)
    console.log('EmployeeId Number: ', this.basicPersonalDetailsForm.value.employeeIdNumber)
  }

  validateName(type: string) {
    if (type === 'first') {
      console.log('First Name: ', this.basicPersonalDetailsForm.value.firstName)
    } else if (type === 'middle') {
      console.log('Middle Name: ', this.basicPersonalDetailsForm.value.middleName)
    } else if (type === 'last') {
      console.log('Lase Name: ', this.basicPersonalDetailsForm.value.lastName)
    } else {
      console.log('Unknown Name')
    }
  }

  validateGender() {
    console.log('Gender: ', this.basicPersonalDetailsForm.value.gender)
  }

  validateDateofBirth() {
    console.log('Date of Birth: ', this.basicPersonalDetailsForm.value.dateofBirth)
  }

  validatePhone(index?: number) {
    if (index !== undefined) {
      console.log('Phone # : ' +
        this.phoneNumbersFormArray[index][0].value.toString()
        + this.phoneNumbersFormArray[index][1].value.toString())
    }
  }

  validateEmail(index?: number) { }

  validateNationality() {
    console.log('Nationalities: ', this.basicPersonalDetailsForm.value.nationalities)
  }

  onEmployeeIdNumberPrefixChange() {
    this.basicPersonalDetailsForm.controls['employeeIdNumber'].setValue(null)
    this.errorMessages.controls.employeeIdNumber = setControlError(true)
  }

  onPhonePrefixChange(index: number) {
    console.log(this.phoneNumbersFormArray[index][0])
    this.phoneNumbersFormArray[index][1].setValue(
      this.phoneNumbersFormArray[index][0].value
    )
  }

  getPhoneActionType(index: number) {
    return (
      (index + 1 === this.phoneNumbersFormArray.length
        && index + 1 < this.numberofPhonesMax) ?
        true : false
    )
  }

  onPhoneNumberAction(index: number) {
    if (index + 1 === this.phoneNumbersFormArray.length
      && index + 1 < this.numberofPhonesMax) {
      this.addPhoneNumber()
    } else {
      this.removePhoneNumber(index)
    }
  }

  addPhoneNumber() {
    if (this.phoneNumbersFormArray.length >= this.numberofPhonesMax) {
      window.alert('Unforgivable!')
    } else {
      this.phoneNumbersFormArray = [
        ...this.phoneNumbersFormArray,
        this.createPhoneNumberForm()
      ]
      this.errorMessages.arrays.phones = [
        ...this.errorMessages.arrays.phones,
        setControlError(true)
      ]
    }
  }

  removePhoneNumber(index: number) {
    if (this.phoneNumbersFormArray.length <= 1) {
      window.alert('Unforgivable!')
    } else {
      if (index === 0) {
        this.personalDetailsModel.phoneNumbers =
          this.personalDetailsModel.phoneNumbers.slice(1);
        this.errorMessages.arrays.phones =
          this.errorMessages.arrays.phones.slice(1);
        this.phoneNumbersFormArray =
          this.phoneNumbersFormArray.slice(1);
      } else if (index === this.personalDetailsModel.phoneNumbers.length - 1) {
        this.personalDetailsModel.phoneNumbers =
          this.personalDetailsModel.phoneNumbers.slice(0, index);
        this.errorMessages.arrays.phones =
          this.errorMessages.arrays.phones.slice(0, index);
        this.phoneNumbersFormArray =
          this.phoneNumbersFormArray.slice(0, index);
      } else {
        this.personalDetailsModel.phoneNumbers = [
          ...this.personalDetailsModel.phoneNumbers.slice(0, index),
          ...this.personalDetailsModel.phoneNumbers.slice(index + 1)
        ];
        this.errorMessages.arrays.phones = [
          ...this.errorMessages.arrays.phones.slice(0, index),
          ...this.errorMessages.arrays.phones.slice(index + 1)
        ];
        this.phoneNumbersFormArray = [
          ...this.phoneNumbersFormArray.slice(0, index),
          ...this.phoneNumbersFormArray.slice(index + 1)
        ];
      }
    }
  }

  getEmailActionType(index: number) {
    return (
      (index + 1 === this.emailsFormArray.length
        && index + 1 < this.noofEmailsMax) ?
        true : false
    )
  }

  onEmailAction(index: number) {
    this.getEmailActionType(index) ?
      this.onAddEmailAction()
      : this.onRemoveEmailAction(index)
  }

  onAddEmailAction() {
    this.emailsFormArray = [
      ...this.emailsFormArray,
      new FormControl(null)
    ]
    this.errorMessages.arrays.emails = [
      ...this.errorMessages.arrays.emails,
      setControlError(true)
    ]
  }

  onRemoveEmailAction(index: number) {
    this.emailsFormArray = [
      ...this.emailsFormArray.slice(0, index),
      ...this.emailsFormArray.slice(index + 1)
    ]
    this.errorMessages.arrays.emails = [
      ...this.errorMessages.arrays.emails.slice(0, index),
      ...this.errorMessages.arrays.emails.slice(index)
    ]
    this.personalDetailsModel.emails = [
      ...this.personalDetailsModel.emails.slice(0, index),
      ...this.personalDetailsModel.emails.slice(index)
    ]
  }

  uploadProfilePicture() {
    // const {dialog} = remote;
    // dialog.showOpenDialog({properties: ['openFile', 'openDirectory', 'multiSelections']});
  }

}
