/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @angular-eslint/no-output-native */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Address } from '../../Models/address.model';
import { ResponseDto } from '../../Models/response-dto.model';
import { AttendanceService } from '../../Services/address/attendance.service';
import { LocationPhoneService } from '../../Services/address/location-phone.service';

@Component({
  selector: 'app-address-new',
  templateUrl: './address-new.component.html',
  styleUrls: ['./address-new.component.scss']
})
export class AddressNewComponent implements OnInit {

  @Input() isStandalone = true

  countries: string[] = []

  listofCodes: string[] = []

  listOfStates: string[] = []

  isEthiopia = false;

  buttonClicked = 0

  validateForm!: FormGroup;

  addresses: Address[] = []

  @Output() result: EventEmitter<unknown> = new EventEmitter<unknown>()

  checkPhone = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      console.log('Empty!')
      return { required: true };
    }
    
    const phone: string = control.value
    const digits_only = (value: string) => [...value].every(c => '0123456789'.includes(c));
    if (!digits_only(phone)) {
      console.log('Not a number!')
      return { confirm: true, error: true };
    }
    else if (phone.length < 6 || phone.length < 12) {
      console.log('Exceeds length!')
      return { confirm: true, error: true };
    }
    return {};
  };

  constructor(
    private fb: FormBuilder,
    private _locationPhoneService: LocationPhoneService,
    private _attendanceService: AttendanceService
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
      residencialPhoneNumber: [null, [Validators.required, this.checkPhone]]
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

  onAction(event: string){

    if (event === 'back') {
      console.log('Going back...')
      // route back
    }
    else {
      
      if (this.validateForm.valid) {
        const address = {
          Country: this.validateForm.value.country,
          StateRegionProvice: this.validateForm.value.state,
          City: this.validateForm.value.city,
          SubCityZone: this.validateForm.value.subCityZone,
          Woreda: this.validateForm.value.wereda,
          HouseNumber: this.validateForm.value.houseNumber,
          PostalCode: this.validateForm.value.postalCode,
          PhoneNumber: this.validateForm.value.phoneNumberPrefix + this.validateForm.value.residencialPhoneNumber
        }  as Address
        
        this.addresses = [
          ...this.addresses,
          address
        ]
        if(this.isStandalone){
          this._attendanceService.add(address)
          .subscribe((response: unknown) => {
            window.alert(response)
          })
        }
        if (event === 'submit') {
          this.validateForm = this.fb.group({
            country: [null, [Validators.required]],
            state: [null, [Validators.required]],
            city: [null, [Validators.required]],
            subCityZone: [null, [Validators.required]],
            woreda: [null],
            houseNumber: [null],
            postalCode: [null],
            phoneNumberPrefix: ['+251'],
            residencialPhoneNumber: [null, [Validators.required, this.checkPhone]]
          });
        }
        else {
          this.result.emit(this.addresses)
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

}
