import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../models/apiService';
import { ClientStatus } from '..';

@Injectable({
  providedIn: 'root'
})
export class ClientStatusService extends ApiService<ClientStatus>{

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
   }
   getResourceUrl(): string {

    return 'ClientStatus';
  }
}
