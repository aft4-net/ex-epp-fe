import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'exec-epp-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
})
export class EducationComponent implements OnInit {
  info = '';
  loggedInUser: any;
  isModalVisible = false;
  isUpdateMode = false;
  isRecordUpdated = false;
  educations: any = [];
  loading = false;
  is_studying = false;

  public education = new FormGroup({
    institution: new FormControl('', [Validators.required]),
    yearFrom: new FormControl(null, [Validators.required]),
    yearTo: new FormControl(null, [Validators.required]),
    country: new FormControl('', [Validators.required]),
    program: new FormControl('', [Validators.required]),
    fieldOfStudy: new FormControl('', [Validators.required]),
    isStudying: new FormControl(false, [Validators.required]),
  });

  public validation = new FormGroup({
    isMultitpleEntry: new FormControl(false, [Validators.required]),
  });

  educationValue = [
    {
      Id: 1,
      institution: 'Programmer',
      yearFrom: 'Senior II',
      yearTo: '4 Years and 5 Months',
      country: ['Agile Methodology', 'CSS'],
      program: ['User Stories', 'Forecasting'],
      fieldOfStudy: ['UXDesign', 'Forecasting', 'Communication'],
    },
  ];

  closeModal() {
    this.isModalVisible = false;
  }
  openModal() {
    this.isModalVisible = true;
  }

  onSaveRecord(): void {
    this.loading = true;
  }

  onEditRecord(index: number) {
    this.isUpdateMode = true;
    this.isModalVisible = true;
    this.education.setValue({ ...this.educations[index] });
  }
  onDeleteRecord(index: number) {
    this.isUpdateMode = false;
  }

  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue || !this.education.controls.yearTo.value) {
      return false;
    }
    return (
      startValue.getTime() > this.education.controls.yearTo.value.getTime()
    );
  };

  disabledEndDate = (endValue: Date): boolean => {
    if (!endValue || !this.education.controls.yearFrom.value) {
      return false;
    }
    return (
      endValue.getTime() <= this.education.controls.yearFrom.value.getTime()
    );
  };

  onCountryChange(value: any) {
    this.education.controls.country.setValue(value);
  }
  addItem() {
    this.educations = [...this.educations, this.education.value];
    if (!this.validation.controls.isMultitpleEntry.value) {
      this.isModalVisible = false;
      this.info = 'Item added successfully!';
    }
    this.education.reset();
    this.validation.controls.isMultitpleEntry.setValue(false);
  }

  onFormSubmit() {
    this.onSaveRecord();
    this.isModalVisible = false;
  }

  ngOnInit(): void {
    this.education.controls.isStudying.valueChanges.subscribe((value) => {
      if (value) {
        this.education.controls.yearTo.setValidators([]);
        this.education.controls.yearTo.reset();
      } else
        this.education.controls.yearTo.setValidators([Validators.required]);
      this.education.controls.yearTo.updateValueAndValidity();
    });
  }
}
