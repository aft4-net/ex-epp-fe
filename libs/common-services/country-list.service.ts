import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { CountryAndCodeListResponse, CountryAndStateListResponse, CountryListResponse } from '@exec-epp/core-models'

@Injectable({
  providedIn: 'root'
})
export class CountryListService {

  constructor(private http: HttpClient) { }

  updatedBaseUrl(baseUrl: string) {
    if(baseUrl.endsWith("/")) {
      return baseUrl;
    }

    return baseUrl + '/';
  }

  getCountry(baseUrl: string, country?: string) {
    let params = new HttpParams();

    if (country) {
      params = params.append("country", country);
    }

    baseUrl = this.updatedBaseUrl(baseUrl);

    return this.http.get<CountryListResponse>(baseUrl + 'CountryList/iso', { params: params });
  }

  getCountryAndStat(baseUrl: string, country?: string) {
    let params = new HttpParams();

    if (country) {
      params = params.append("country", country);
    }

    baseUrl = this.updatedBaseUrl(baseUrl);

    return this.http.get<CountryAndStateListResponse>(baseUrl + 'CountryList/states', { params: params });
  }

  getCountryAndCode(baseUrl: string, country?: string) {
    let params = new HttpParams();

    if (country) {
      params = params.append("country", country);
    }

    baseUrl = this.updatedBaseUrl(baseUrl);

    return this.http.get<CountryAndCodeListResponse>(baseUrl + 'CountryList/codes', { params: params });
  }
}
