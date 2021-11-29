import { CompanyContact } from './../models/get/company-contact';
import { Injectable } from '@angular/core';
import { ApiService } from 'apps/project-management/src/app/core/models/apiService';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompanyContactService extends ApiService<CompanyContact> {

  constructor(protected httpClient: HttpClient ) {
    super(httpClient);
  }

  getResourceUrl(): string {

    return 'CompanyContact';
  }
}
