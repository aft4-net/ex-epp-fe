import { Client, PaginatedResult, } from '..';

import { ApiService } from '../models/apiService';
import { BehaviorSubject } from 'rxjs';
import { CreateClient } from '../models/post/CreateClient';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root',
})

export class ClientService extends ApiService<Client> {
  private fristPagantionClientsSource=  new BehaviorSubject<PaginatedResult<Client[]>>(  {} as PaginatedResult<Client[]> );
  fristPagantionClients$=this.fristPagantionClientsSource.asObservable();

  constructor(
    protected httpClient: HttpClient,
    private notification: NzNotificationService) {
    super(httpClient);
  }
  private createClientSource = new BehaviorSubject<CreateClient>(
    {} as CreateClient
  );
  createClientSource$ = this.createClientSource.asObservable();


  getFirsttPageValue()
  {
    return this.fristPagantionClientsSource.value;
  }

  setFristPageOfClients(data:PaginatedResult<Client[]>)
  {
    this.fristPagantionClientsSource.next(data);

  }

  getResourceUrl(): string {
    return 'ClientDetails';
  }

  updateCreateClientData(data: CreateClient) {
    this.createClientSource.next(data);
  }

  getCreateClientDataValue() {
    return this.createClientSource.value;
  }
  restCreateClientDataValue() {
    this.updateCreateClientData({} as CreateClient);
  }
  

  addClient() {
    if (this.getCreateClientDataValue() != ({} as CreateClient)) {
      this.post(this.getCreateClientDataValue()).subscribe(
        (response:any) => {
          if (response.ResponseStatus.toString().toLowerCase() == 'error') {
            this.notification.error(
              'Client Not Added',
              'Please Try Again Letter'
            
            );
            
            this.restCreateClientDataValue();
          }
          else {
            this.notification.success('Client Added Successfully', '');
            this.restCreateClientDataValue();
          }
        },
        () => {
          this.notification.error(
            'Client  Not Added',
            'Please Try Again Leetter'
          );
          this.updateCreateClientData({} as CreateClient);
        }
      );
    }
  }
}
