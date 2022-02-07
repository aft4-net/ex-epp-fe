import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country } from '../models/country';
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
}
