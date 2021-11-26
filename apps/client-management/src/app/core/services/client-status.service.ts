import { ClientStatus } from './../models/get/client-status';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ApiService } from '../models/apiService';

@Injectable({
  providedIn: 'root'
})
export class ClientStatusService extends ApiService<ClientStatus>  {

  constructor(protected httpClient: HttpClient ) { 
    super(httpClient);
  }

  getResourceUrl(): string {

    return 'status';
  }
}
