import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AddClientStateService } from 'apps/client-management/src/app/core';
import { BillingAddress } from 'apps/client-management/src/app/core/models/get/billing-address';

import { CityService } from 'apps/client-management/src/app/core/services/city.service';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { CityInStateService } from 'apps/client-management/src/app/core/services/CityInState.service';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { StateService } from 'apps/client-management/src/app/core/services/State.service';

@Component({
  selector: 'exec-epp-billing-address-form',
  templateUrl: './billing-address-form.component.html',
  styleUrls: ['./billing-address-form.component.scss'],
})
export class BillingAddressFormComponent implements OnInit {
  billingAddressess: BillingAddress[] = [];
  tabledata:any=[];
  isVisible = false;
  isOkLoading = false;
  footer = null;
  forms: FormGroup;
  cityForms: FormGroup;
  countries: any;
  states: any;
  countryCities: any;
  cities: any;
  selectedCountry = '';
  selectedState = '';
  emptyData=[];
  stateData = {
    country: '',
    state: '',
  };
  data='';
  IsEdit=false;
  editAt=-1;
  statePlaceHolder='Select a State/Province';
  postalCode='Enter Postal/ZIP Code';
  found=false;
  constructor(
    private _fb: FormBuilder,
    private _state: StateService,
    private _city: CityService,
    private _cityInState: CityInStateService,
    private  addClientService:AddClientStateService
  ) {
    this.forms = _fb.group({
      Name: [null,[Validators.required,this.noWhitespaceValidator]],
      Affliation: ['',Validators.required],
      Country: ['',Validators.required],
      City: ['',Validators.required],
      State: [''],
      ZipCode: [''],
      Address: [''],
    });
    this.cityForms = _fb.group({
      country: '',
      state: '',
    });
    this._state.getAll().subscribe((data: any) => {
      if (!data.error) {
        this.countries = data.data;
      }
    });
    this._city.getAll().subscribe((data: any) => {
      if (!data.error) {
        this.countryCities = data.data;
      }
    });
  }

  ngOnInit(): void {
    console.log("data="+ this.data)
  }

  showModal(): void {
    this.isVisible = true;
  }
  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  submitForm() {
    if (this.forms.valid) {
      if(this.IsEdit){
      this.billingAddressess[this.editAt]=this.forms.value;
      this.tabledata=['']
      this.IsEdit=false;
      this.editAt=-1;
      }
     else{
    
      this.billingAddressess =[
        ...this.billingAddressess,
        this.forms.value
      ]
     }
    this.isVisible = false;
    this.forms.reset();
    } else {
      Object.values(this.forms.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
   
  }
  getSelectedCountry() {
    this.selectedCountry = this.forms.value['Country'];
   if(!this.found){
    this.forms.controls['City'].setValue(null);
    this.forms.controls['State'].setValue(null);
    if(this.selectedCountry==="Ethiopia"){
      this.statePlaceHolder='Select a Region';
      this.postalCode='Enter Postal Code';
    }
    else{
      this.statePlaceHolder='Select a State/Province';
      this.postalCode='Enter Postal/ZIP Code';
    }
   }
    this.countries.forEach((country: any) => {
      if (country.name == this.selectedCountry) {
        this.states = country.states;
      }
    });
    this.countryCities.forEach((item: any) => {
      if (item.country == this.selectedCountry) {
        this.cities = item.cities;
      }
    });
  }
  getSelectedState() {
    this.selectedState = this.forms.value['State'];
    if(!this.found){
      this.forms.controls['City'].setValue(null);
     
     }
    this.getCityInState();
  }

  getCityInState() {
    this.stateData.country = this.selectedCountry;
    this.stateData.state = this.selectedState;
    this._cityInState
      .post(JSON.parse(JSON.stringify(this.stateData)))
      .subscribe((data: any) => {
        this.cities = data.data;
      });
  }

  resetForm() {
    this.forms.reset();
  }
  removeBillingAddress(index: number) {
    if (index > -1) {
      this.billingAddressess.splice(index, 1);
      if(!this.billingAddressess.length){
        this.billingAddressess=this.emptyData;
      }
      this.addClientService.updateBillingAddress(this.billingAddressess);
    }
  }
  edit(index:number){
    for(let count=0;count<this.billingAddressess.length;count++){
      this.isVisible = true;
      if(count==index){
       this.IsEdit=true;
       this.editAt=index;
       this.found=true;
        this.patchValues(this.billingAddressess[count]);
      }
    }
   
  }
  patchValues(data: any) {
    this.forms.patchValue({
      Name: data.Name,
      Affliation: data.Affliation,
      Country: data.Country,
      City: data.City,
      State: data.State,
      ZipCode: data.ZipCode,
      Address: data.Address,
    });
    this.getSelectedCountry();
    this.getSelectedState();
    this.found=false;
  }
  noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
}
}
