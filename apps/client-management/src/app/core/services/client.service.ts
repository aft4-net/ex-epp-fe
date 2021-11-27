import { AddClientStateService, ApiService, Client, PaginatedResult } from '..';
import { BehaviorSubject } from 'rxjs';
import { ClientCreate } from '../models/post/ClientCreate ';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root',
})
export class ClientService extends ApiService<Client> {
  private fristPagantionClientsSource = new BehaviorSubject<
    PaginatedResult<Client[]>
  >({} as PaginatedResult<Client[]>);
  fristPagantionClients$ = this.fristPagantionClientsSource.asObservable();

  constructor(
    protected httpClient: HttpClient,
    private notification: NzNotificationService,
    private addClientStateService: AddClientStateService
  ) {
    super(httpClient);
  }

  getFirsttPageValue() {
    return this.fristPagantionClientsSource.value;
  }

  setFristPageOfClients(data: PaginatedResult<Client[]>) {
    this.fristPagantionClientsSource.next(data);
  }

  getResourceUrl(): string {
    return 'ClientDetails';
  }

  addClient() {
    this.post(this.addClientStateService.addClientData).subscribe(
      (response: any) => {
        if (response.ResponseStatus.toString().toLowerCase() == 'error') {
          this.notification.error(
            'Client Not Added',
            'Please Try Again Letter'
          );
          this.addClientStateService.restAddClientState();
        } else {
          this.notification.success('Client Added Successfully', '');
          this.addClientStateService.restAddClientState();
        }
      },
      () => {
        this.notification.error(
          'Client  Not Added',
          'Please Try Again Leetter'
        );
        this.addClientStateService.restAddClientState();
      }
    );
  }
}
