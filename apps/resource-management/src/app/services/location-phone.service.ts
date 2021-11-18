/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { getCountries, getCountryTeleCodes, getStates } from './data-source';

@Injectable({
  providedIn: 'root'
})
export class LocationPhoneService {

  constructor(

  ) { 

  }

  getListofCountries(){
    return of(getCountries())
  }

  getListofStates(country: string){

    return of(getStates(country))

  }

  getCountriesPhoneCode(){
    return of(getCountryTeleCodes())
  }
}
