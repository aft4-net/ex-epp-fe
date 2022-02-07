import { ClientContact } from './../models/get/client-contact';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ApiService } from '..';

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
  DeleteContact(id:string|number)
  {
    return this.delete(id);
  }
}
