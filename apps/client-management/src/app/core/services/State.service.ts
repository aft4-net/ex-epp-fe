
import { ApiService } from '../models/apiService';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CountryState } from '../models/get/CountryState';

@Injectable({
  providedIn: 'root'
})
export class StateService extends ApiService<CountryState> {

  constructor(protected httpClient: HttpClient ) {
    super(httpClient);
  }

  getResourceUrl(): string {

    return 'https://countriesnow.space/api/v0.1/countries/states';
  }
  

}
