import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BillingAddress } from '../models/get/billing-address';
import { ApiService } from '../models/apiService';

@Injectable({
  providedIn: 'root'
})
export class BillingAddressService extends ApiService<BillingAddress> {

  constructor(protected httpClient: HttpClient ) {
    super(httpClient);
  }

  getResourceUrl(): string {

    return 'BillingAddress';
  }
  DeleteBillingAddress(id:string|number)
  {
    return this.delete(id);
  }
}
