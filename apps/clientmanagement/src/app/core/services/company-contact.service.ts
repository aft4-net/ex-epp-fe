import { ApiService } from 'apps/projectmanagement/src/app/core/models/apiService';
import { CompanyContact } from './../models/get/company-contact';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from 'libs/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyContactService extends ApiService<CompanyContact> {
  CompanyAPI=`${environment.apiUrl}/Employees`;

  constructor(protected httpClient: HttpClient ) {
    super(httpClient);
  }

  getResourceUrl(): string {

    return 'CompanyContact';
  }
  getNameRole()
  {
    this.httpClient.get<CompanyContact>(this.CompanyAPI);
  }
}
