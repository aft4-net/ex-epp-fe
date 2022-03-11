import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../models/apiService';
import { Client } from '..';
import { environment } from '../../../../../../libs/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientDetailsService extends ApiService<Client> {

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }
  getResourceUrl(): string {

    return 'ClientDetails';
  }
  checkSalesPersonStatus(id:string):Observable<boolean> {
    return this.httpClient.get<boolean>(environment.apiUrl+'/ClientDetails/isEmployeeSalesPerson/?id='+id);
 }
}
