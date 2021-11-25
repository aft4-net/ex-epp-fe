import { ClientContact } from './../models/get/client-contact';
import { Injectable } from '@angular/core';
import { ApiService } from 'apps/project-management/src/app/core/models/apiService';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientContactService extends ApiService<ClientContact> {

  constructor(protected httpClient: HttpClient ) {
    super(httpClient);
  }

  getResourceUrl(): string {

    return 'ClientContact';
  }
}
