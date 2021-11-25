import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ApiService } from '../models/apiService';
import { OperationalAddress } from '../models/get/operational-address';

@Injectable({
  providedIn: 'root'
})
export class OperationalAddressService extends ApiService<OperationalAddress> {

  constructor(protected httpClient: HttpClient ) { 
    super(httpClient);
  }

  getResourceUrl(): string {

    return 'address';
  }
}
