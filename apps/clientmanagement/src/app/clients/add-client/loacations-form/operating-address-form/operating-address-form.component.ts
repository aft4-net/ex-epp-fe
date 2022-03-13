import { AddClientStateService, OperationalAddressService, UpdateClientStateService, UpdateOperatingAddress } from '../../../../core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

import { CityInStateService } from '../../../../core/services/CityInState.service';
import { CityService } from '../../../../core/services/city.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { StateService } from '../../../../core/services/State.service';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries



@Component({
  selector: 'exec-epp-operating-address-form',
  templateUrl: './operating-address-form.component.html',
  styleUrls: ['./operating-address-form.component.scss']
})
export class OperatingAddressFormComponent implements OnInit {
  dynamicBtnValue={} as string;
  operatingAddress: any[] = [];
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
  statePlaceHolder='Select a State/Province';
  postalCode='Enter Postal/ZIP Code';
  selectedState = '';
  stateData = {
    country: '',
    state: '',
  };
  data='';
  emptyData=[];
  IsEdit=false;
  editAt=-1;
  found=false;
  actionTitle="Add"
  confirmModal?: NzModalRef;
  isClearButtonActive= true;
  constructor(
    private _fb: FormBuilder,
    private _state: StateService,
    private _city: CityService,
    private _cityInState: CityInStateService,
    private  updateClientStateService:UpdateClientStateService,
    private  addClientStateService:AddClientStateService,
    private  notification:NzNotificationService,
    private  operatingAddressService:OperationalAddressService,
    private modal: NzModalService
  ) {
    this.forms = _fb.group({
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
     if(this.updateClientStateService.isEdit && this.updateClientStateService.UpdateClientData.OperatingAddress!==null)
     {
      this. operatingAddress = this.updateClientStateService.UpdateClientData.OperatingAddress;

     }
     else{
      this. operatingAddress = this.addClientStateService.addClientData.OperatingAddress;
     }
    this.forms.valueChanges.subscribe(x => {
      if(this.forms.value['Country']!='' ||
      this.forms.value['City']!='' ||
      this.forms.value['State']!='' ||
      this.forms.value['ZipCode']!='' ||
      this.forms.value['Address']!='' ){
        this.updateClientStateService.updateButtonListener=false;
       this.isClearButtonActive=false;
      }
      else{
       this.isClearButtonActive=true;
      }

    });
  }

  showModal(): void {
    this.dynamicBtnValue=this.updateClientStateService.actionButton="Add";
    this.isVisible = true;
    this.actionTitle="Add";
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
      this.operatingAddress[this.editAt]=this.forms.value;
      if(this.updateClientStateService.isEdit)
      {
        const opAddress={
          Guid:this.updateClientStateService.UpdateClientData.OperatingAddress[this.editAt].Guid,
          Country:this.operatingAddress[this.editAt].Country,
          City:this.operatingAddress[this.editAt].City,
          State:this.operatingAddress[this.editAt].State,
          ZipCode:this.operatingAddress[this.editAt].ZipCode,
          Address: this.operatingAddress[this.editAt].Address,
        } as UpdateOperatingAddress;
        this.updateClientStateService.UpdateClientData.OperatingAddress[this.editAt]=opAddress;

      }
      else
      {
        this.addClientStateService.updateOperatingAddress(this.operatingAddress);
      }
      this.IsEdit=false;
      this.editAt=-1;
      }
     else{
      if(this.updateClientStateService.isEdit)
      {
        const opAddress={
          Country:this.forms.controls.Country.value,
          City:this.forms.controls.City.value,
          State:this.forms.controls.State.value,
          ZipCode:this.forms.controls.ZipCode.value,
          Address: this.forms.controls.Address.value,
        } as UpdateOperatingAddress;
        this.operatingAddress =[
          ...this.operatingAddress,
          opAddress
        ]
        this.updateClientStateService.UpdateClientData.OperatingAddress.push(opAddress);
    }

    else{
      this.operatingAddress =[
        ...this.operatingAddress,
        this.forms.value
      ]
      this.addClientStateService.updateOperatingAddress(this.operatingAddress);

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
    if(this.IsEdit)
    {
      this.editAt=-1;
    }
    this.isClearButtonActive= true;
  }
  removeOperatingAddress(index: number) {
    if (index > -1) {
      this.operatingAddress=this.operatingAddress.filter(x=>x!==this.operatingAddress[index]);

      if(this.updateClientStateService.isEdit)
      {
        this.updateClientStateService.updateOperatingAddress(this.operatingAddress);
      }
      else{
        this.addClientStateService.updateOperatingAddress(this.operatingAddress);

      }
    }
  }
  edit(index:number){
    this.dynamicBtnValue=this.updateClientStateService.actionButton="Update";
    for(let count=0;count<this.operatingAddress.length;count++){
      this.isVisible = true;
      if(count==index){
        this.actionTitle="Edit"
       this.IsEdit=true;
       this.editAt=index;
       this.found=true;
        this.patchValues(this.operatingAddress[count]);
      }
    }

  }
  patchValues(data: any) {
    this.forms.patchValue({
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
  showConfirm(index:number): void {
    this.confirmModal = this.modal.confirm({
      nzIconType:'',
      nzTitle: 'Delete Operating Address?',
      nzContent: 'Are you sure, you want to delete this operating adress? <br/>This action cannot be undone!',
      nzOkText: 'Yes, Delete',
      nzOkType: 'primary',
      nzOkDanger: true,

      nzCancelText: 'Cancel',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          if(typeof this.updateClientStateService.UpdateClientData.OperatingAddress[index].Guid!=='undefined'){
          this.operatingAddressService.DeleteOperatingAddress(this.updateClientStateService.UpdateClientData.OperatingAddress[index].Guid).subscribe(
            (res:any)=>{
              if(res.ResponseStatus==='Success')
              {
               this.notification.success("Operating Address  Deleted Successfully","",{nzPlacement:'bottomRight'}
               );
               this.removeOperatingAddress(index);
               setTimeout(Math.random() > 0.5 ? resolve : reject, 100);
              }

             },
            ()=>{
              this.notification.error("Operating Address was not Deleted",'',{nzPlacement:'bottomRight'})
            }
          );
          }
          else{
            this.removeOperatingAddress(index);

            setTimeout(Math.random() > 0.5 ? resolve : reject, 100);
            this.notification.success("Operating Address  Deleted Successfully","",{nzPlacement:'bottomRight'}
            );
          }

        }).catch(() => console.log('Error.'))
    });
  }
}
