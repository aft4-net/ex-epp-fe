import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../models/apiService';
import { Client } from '..';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
  checkSalesPersonStatus(id:string, apiUrl?: string):Observable<boolean> {
    if(!apiUrl) apiUrl = environment.apiUrl;
    const params = new HttpParams().set('id', id);
    const result = this.httpClient.get(apiUrl+'/ClientDetails/isEmployeeSalesPerson/?'+ params.toString()
    )
    .pipe(
      map((response: any) => {
        return response as boolean;
      })
    );
    return result;
  }
  checkAssignmentStatus(id:string, apiUrl?: string):Observable<boolean>
  {
    if(!apiUrl) apiUrl = environment.apiUrl;
    const params = new HttpParams().set('id', id);
    const result = this.httpClient.get(apiUrl+'/AssignResource/check_assignment_status/?'+params.toString()
    )
    .pipe(
      map((response: any) => {
        return response as boolean;
      })
    );
    return result;
  }
}
