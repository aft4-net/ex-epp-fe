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
      return startValue.getTime() >= Date.now() - 3600 * 1000 * 24;
    }
    return (
      startValue.getTime() > this.education.controls.yearTo.value.getTime() ||
      startValue.getTime() >= Date.now() - 3600 * 1000 * 24
    );
  };

  disabledEndDate = (endValue: Date): boolean => {
    if (!endValue || !this.education.controls.yearFrom.value) {
      return endValue.getTime() >= Date.now();
    }
    return (
      endValue.getTime() <= this.education.controls.yearFrom.value.getTime() ||
      endValue.getTime() >= Date.now()
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
      this.isRecordUpdated = true;
    }
    this.education.reset();
    this.validation.controls.isMultitpleEntry.setValue(false);
  }

  onFormSubmit() {
    this.onSaveRecord();
    this.isModalVisible = false;
    // this.applicantService.setRoutInfo('/application/education');
    // this.router.navigate(['/application/education']);
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
