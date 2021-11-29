import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CityService } from 'apps/client-management/src/app/core/services/city.service';
import { CityInStateService } from 'apps/client-management/src/app/core/services/CityInState.service';
import { StateService } from 'apps/client-management/src/app/core/services/State.service';


@Component({
  selector: 'exec-epp-billing-address',
  templateUrl: './billing-address.component.html',
  styleUrls: ['./billing-address.component.scss']
})
export class BillingAddressComponent implements OnInit {
  @ViewChild('ngSelectComponent') ngSelectComponent: any;
forms:FormGroup;
cityForms:FormGroup
countries:any;
states:any;
countryCities:any;
cities:any;
selectedCountry='';
selectedState='';
stateData={
  country: '',
  state: ''
}
  constructor(private _fb:FormBuilder,private _state:StateService,private _city:CityService,
              private _cityInState:CityInStateService) { 
    this.forms=_fb.group({
       Name : [''],
       Affliation : [''],
       Country : [''],
       City : [''],
       State : [''],
       ZipCode : [''],
       Address: ['']
    });
    this.cityForms=_fb.group({
      country:'',
      state:''
    })
    this._state.getAll().subscribe((data:any)=>{
      if(!data.error){
        this.countries=data.data;
      }
    });
    this._city.getAll().subscribe((data:any)=>{
      if(!data.error){
       this.countryCities=data.data;
      } 
    })
  }

  ngOnInit(): void {
  }
  submitForm(){}
  getSelectedCountry(event:any){
    this.selectedCountry=this.forms.value['Country'];
    this.forms.controls['City'].setValue(null)
    this.forms.controls['State'].setValue(null)
    this.countries.forEach((country:any) => {
      if(country.name==this.selectedCountry){
        this.states=country.states;
      }
    });
    this.countryCities.forEach((item:any) => {
      if(item.country==this.selectedCountry){
        this.cities=item.cities;
        
      }
    });
  }
  getSelectedState(){
    this.selectedState=this.forms.value['State'];
    this.forms.controls['City'].setValue(null)
    this.getCityInState();
  }

  getCityInState(){
this.stateData.country=this.selectedCountry;
this.stateData.state=this.selectedState;
console.log(JSON.parse(JSON.stringify(this.stateData)));
this._cityInState.post(JSON.parse(JSON.stringify(this.stateData)) ).subscribe((data:any)=>{

  this.cities=data.data;
})
  }

  resetForm(){
    this.forms.reset();
  }
}
