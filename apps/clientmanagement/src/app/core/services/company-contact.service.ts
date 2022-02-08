import { CompanyContact } from './../models/get/company-contact';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'libs/environments/environment';
import { ApiService } from '..';

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
  DeleteCompany(id:string|number)
  {
    return this.delete(id);
  }
}
