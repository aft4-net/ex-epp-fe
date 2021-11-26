import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../models/apiService';
import { ClientDetails } from '..';

@Injectable({
  providedIn: 'root'
})
export class ClientDetailsService extends ApiService<ClientDetails> {

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }
  getResourceUrl(): string {

    return 'ClientDetails';
  }

}
