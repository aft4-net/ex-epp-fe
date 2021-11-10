/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';

@Component({
  selector: 'exec-epp-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  validateForm!: FormGroup;
  userSubmitted!: boolean;
  currentDate = Date.now.toString();

  @ViewChild('endDatePicker') endDatePicker!: NzDatePickerComponent;
  @ViewChild('startDatePicker') startDatepicker!: NzDatePickerComponent;

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
  }


  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    console.log(this.currentDate)
    this.createRegistrationForm();
  }

  createRegistrationForm(){
    this.validateForm = this.fb.group({
      projectName: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      clientName: ['Excellerent Solutions', [Validators.required]],
      projectType: [null, [Validators.required]],
      status: [null, [Validators.required]],
      supervisor: [null, [Validators.required]],
      startValue: [null, [Validators.required]],
      endValue: [null, [Validators.required]],

    });
  }

  onSubmit(){
    console.log(this.validateForm.value);
    this.userSubmitted = true;
  }

  onReset(){
    this.userSubmitted = false;
    this.validateForm.reset();
  }

  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue || !this.validateForm.controls.endValue.value) {
      return false;
    }
    return startValue.getTime() > this.validateForm.controls.endValue.value.getTime();
  };

  disabledEndDate = (endValue: Date): boolean => {
    if (!endValue || !this.validateForm.controls.startValue.value) {
      return false;
    }
    return endValue.getTime() <= this.validateForm.controls.startValue.value.getTime();
  };

  handleStartOpenChange(open: boolean): void {
    if (!open) {
      this.endDatePicker.open();
    }

  }

  handleEndOpenChange(open: boolean): void {

    console.log('handleEndOpenChange', open);
  }

  get projectName() {
    return this.validateForm.controls.projectName as FormControl;
  }

  get clientName() {
    return this.validateForm.controls.clientName as FormControl;
  }

  get projectType() {
    return this.validateForm.controls.projectType as FormControl;
  }

  get status() {
    return this.validateForm.controls.status as FormControl;
  }

  get supervisor() {
    return this.validateForm.controls.supervisor as FormControl;
  }

  get startValue() {
    return this.validateForm.controls.startValue as FormControl;
  }

  get endValue() {
    return this.validateForm.controls.endValue as FormControl;
  }

}
