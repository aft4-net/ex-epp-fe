import { CompanyContact } from './../models/get/company-contact';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '..';

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
