import { AddClientStateService, BillingAddressCreate, UpdateBillingAddress, UpdateClientStateService } from '../../../../core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

import { CityInStateService } from '../../../../core/services/CityInState.service';
import { CityService } from '../../../../core/services/city.service';
import { StateService } from '../../../../core/services/State.service';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries



@Component({
  selector: 'exec-epp-billing-address-form',
  templateUrl: './billing-address-form.component.html',
  styleUrls: ['./billing-address-form.component.scss'],
})
export class BillingAddressFormComponent implements OnInit {
  confirmModal?: NzModalRef;
  billingAddressess: BillingAddressCreate[] = [];
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
  actionTitle="Add";
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
  isClearButtonActive=true;
  constructor(
    private _fb: FormBuilder,
    private _state: StateService,
    private _city: CityService,
    private _cityInState: CityInStateService,
    private  addStateClientService:AddClientStateService,
    private modal: NzModalService,
    private  updateStateClientService:UpdateClientStateService,
  ) {
    this.forms = _fb.group({
      Name: ['',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(70)
      ]],
      Affliation: ['',
        [Validators.required,Validators.minLength(2),Validators.maxLength(70)]
      ],
      Country: ['',Validators.required],
      City: ['',Validators.required],
      State: [''],
      ZipCode: ['',Validators.maxLength(70)],
      Address: ['',Validators.maxLength(250)],
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
    if(this.updateStateClientService.isEdit && this.updateStateClientService.UpdateClientData.BillingAddress!==null)
    {
     this.billingAddressess = this.updateStateClientService.UpdateClientData.BillingAddress;

    }else{
    this.billingAddressess = this.addStateClientService.addClientData.BillingAddress;
    }
    this.forms.valueChanges.subscribe(x => {
      if(this.forms.value['Name']!='' ||
      this.forms.value['Country']!='' ||
      this.forms.value['City']!='' ||
      this.forms.value['State']!='' ||
      this.forms.value['ZipCode']!='' ||
      this.forms.value['Address']!='' ||
      this.forms.value['Affliation']!='' ){
       this.isClearButtonActive=false;
      }
      else{
       this.isClearButtonActive=true;
      }

    });
  }

  showModal(): void {
    this.isVisible = true;
    this.actionTitle="Add";
  }
  get Name() {
    return this.forms.controls.Name as FormControl;
  }

  get Affliation() {
    return this.forms.controls.Affliation as FormControl;
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
        if(this.updateStateClientService.isEdit)
        {
          const opAddress={
            Name:this.forms.controls.Name.value,
            Affliation:this.forms.controls.Affliation.value,
            Country:this.forms.controls.Country.value,
            City:this.forms.controls.City.value,
            State:this.forms.controls.State.value,
            ZipCode:this.forms.controls.ZipCode.value,
            Address: this.forms.controls.Address.value,
          } as UpdateBillingAddress;
          this.updateStateClientService.UpdateClientData.BillingAddress[this.editAt]=opAddress;
      }else{
        this.billingAddressess[this.editAt]=this.forms.value;
        this.addStateClientService.updateBillingAddress(this.billingAddressess);
      }

      this.tabledata=['']
      this.IsEdit=false;
      this.editAt=-1;
      }
      else{

        if(this.updateStateClientService.isEdit)
        {
          const opAddress={
            Name:this.forms.controls.Name.value,
            Affliation:this.forms.controls.Affliation.value,
            Country:this.forms.controls.Country.value,
            City:this.forms.controls.City.value,
            State:this.forms.controls.State.value,
            ZipCode:this.forms.controls.ZipCode.value,
            Address: this.forms.controls.Address.value,
          } as UpdateBillingAddress;
          this.updateStateClientService.UpdateClientData.BillingAddress.push(opAddress);
      }
     else{

      this.billingAddressess =[
        ...this.billingAddressess,
        this.forms.value
      ]
      this.addStateClientService.updateBillingAddress(this.billingAddressess);

      console.log(this.billingAddressess)

     }
    }
    this.isVisible = false;
    this.forms.reset();
    this.isClearButtonActive=true;
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
    this.isClearButtonActive=true
  }
  removeBillingAddress(index: number) {
    if (index > -1) {
      this.billingAddressess.splice(index, 1);
      if(!this.billingAddressess.length){
        this.billingAddressess=this.emptyData;
      }
      this.addStateClientService.updateBillingAddress(this.billingAddressess);
    }
  }
  edit(index:number){
    for(let count=0;count<this.billingAddressess.length;count++){
      this.isVisible = true;
      if(count==index){
        this.actionTitle="Edit";
       this.IsEdit=true;
       this.editAt=index;
       this.found=true;
        this.patchValues(this.billingAddressess[count]);
        this.addStateClientService.updateBillingAddress(this.billingAddressess);
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
showConfirm(index:number): void {
  this.confirmModal = this.modal.confirm({
    nzTitle: 'Do you want to delete this item?',
    nzContent: 'The action is not recoverable. ',
    nzOkType: 'primary',
    nzOkText: 'Yes',
    nzCancelText: 'No',
    nzOkDanger: true,
    nzOnOk: () =>
      new Promise((resolve, reject) => {
        if (index > -1) {
          this.billingAddressess.splice(index, 1);
          if(!this.billingAddressess.length){
            this.billingAddressess=this.emptyData;
          }
          this.addStateClientService.updateBillingAddress(this.billingAddressess);
        }
        setTimeout(Math.random() > 0.5 ? resolve : reject, 100);
      }).catch(() => console.log('Error.'))
  });
}
}
