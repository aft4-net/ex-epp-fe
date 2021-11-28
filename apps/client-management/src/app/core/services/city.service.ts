
import { ApiService } from '../models/apiService';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CountryCity } from '../models/get/CoountryCity';

@Injectable({
  providedIn: 'root'
})
export class CityService extends ApiService<CountryCity> {

  constructor(protected httpClient: HttpClient ) {
    super(httpClient);
  }

  getResourceUrl(): string {

    return 'https://countriesnow.space/api/v0.1/countries';
  }
  

}