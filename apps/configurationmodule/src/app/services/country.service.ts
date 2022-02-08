import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Country, CountryResponse } from '../models/country';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  baseUrl = environment.countryApiUrl;

  constructor(private http: HttpClient) { }

  get(id?: string){
    if(id){
      return this.http.get<Country[]>(this.baseUrl + `GetCountryById/${id}`);
    }
    else{
      return this.http.get<Country[]>(this.baseUrl + 'GetAllCountries');
    }
  }

  add(country: Country) {
    const headers = { 'content-type': 'application/json' };

    return this.http.post<CountryResponse>(this.baseUrl + 'register', country, {headers: headers});
  }

  update(country: Country) {
    const headers = { 'content-type': 'application/json' };

    return this.http.post<CountryResponse>(this.baseUrl + "UpdateCountry", country, {headers: headers});
  }

  delete(country: Country) {
    return this.http.delete<CountryResponse>(this.baseUrl + "Delete", { body: country});
  }
}
