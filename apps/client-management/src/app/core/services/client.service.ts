import { Client } from './../models/get/client';
import { ApiService } from '../models/apiService';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientService extends ApiService<Client> {

  constructor(protected httpClient: HttpClient ) {
    super(httpClient);
  }

  getResourceUrl(): string {

    return 'http://localhost:14696/api/v1/ClientDetails';
  }

}
