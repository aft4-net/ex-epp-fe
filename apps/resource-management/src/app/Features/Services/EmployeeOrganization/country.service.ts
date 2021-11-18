import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CountryService {
  baseUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) { 

  }

  loadCountries() {
    //return this.http.post(this.baseUrl + 'auth/Login')
  }


}
