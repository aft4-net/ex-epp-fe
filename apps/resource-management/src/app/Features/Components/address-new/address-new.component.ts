/* eslint-disable @angular-eslint/no-output-native */
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { LocationPhoneService } from '../../../services/location-phone.service';

@Component({
  selector: 'app-address-new',
  templateUrl: './address-new.component.html',
  styleUrls: ['./address-new.component.scss']
})
export class AddressNewComponent implements OnInit {

  countries: string[] = []

  listofCodes: string[] = []

  listOfStates: string[] = []

  isEthiopia = false;

  buttonClicked = 0


  validateForm!: FormGroup;

  @Output() result: EventEmitter<unknown> = new EventEmitter<unknown>()



  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone'
  };

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }

  constructor(
    private fb: FormBuilder,
    private _locationPhoneService: LocationPhoneService
  ) {
    this._locationPhoneService.getListofCountries()
      .subscribe((response: string[]) => {
        this.countries = response
      })
    this._locationPhoneService.getCountriesPhoneCode()
      .subscribe((response: string[]) => {
        this.listofCodes = response
      })
    this.listOfStates = []
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      country: [null, [Validators.required]],
      state: [null, [Validators.required]],
      city: [null, [Validators.required]],
      subCityZone: [null, [Validators.required]],
      woreda: [null],
      houseNumber: [null],
      postalCode: [null],
      phoneNumberPrefix: ['+251'],
      residencialPhoneNumber: [null, [Validators.required]]
    });
  }

  onSelectCountry() {
    if (this.validateForm.value.country !== '') {
      this._locationPhoneService.getListofStates(this.validateForm.value.country)
        .subscribe((response: string[]) => {
          this.listOfStates = response
        });
    }

    else{
      this.listOfStates = []
    }
    if (this.validateForm.value.country === 'Ethiopia') {
      this.isEthiopia = true
    }
    else{
      this.isEthiopia = false
    }
  }


  save(): void {
    if (this.buttonClicked === -1) {
      console.log('Going back...')
      // route back
    }
    else {
      if (this.validateForm.valid) {
        this.result.emit(this.validateForm.value)
        if (this.buttonClicked === 0) {
          console.log('New form')
        }
        else {
          console.log('Going forward...')
        }
      } else {
        Object.values(this.validateForm.controls).forEach(control => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
          }
        });
      }
    }

  }

  onSubmit(): void {
    this.buttonClicked = 0
    console.log("Save")
    this.save()
  }

  onNext() {
    this.buttonClicked = 1
    console.log("Next")
    this.save()
  }

  onBack() {
    this.buttonClicked = -1
    console.log("Back")
    this.save()
  }

}
