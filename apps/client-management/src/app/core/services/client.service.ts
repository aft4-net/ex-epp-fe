import { AddClientStateService, ApiService, Client, PaginatedResult } from '..';

import { BehaviorSubject } from 'rxjs';
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
  public clientId="";
  public isdefault = true;
  public clientDataById!:Client;
  client!: Client;
  isEdit!: boolean;
  save = 'Save';
  constructor(
    protected httpClient: HttpClient,
    private notification: NzNotificationService,
    private addClientStateService: AddClientStateService
  ) {
    super(httpClient);
  }
  setClientDataForEdit(client: Client, salesPerson:any) {
    this.clientDataById = client;
    this.clientDataById.SalesPerson=salesPerson;
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

  getResourceEditUrl():string{
    return 'SelectClientById';
  }

  addClient() {
    this.post(this.addClientStateService.addClientData).subscribe(

      (response: any) => {
        console.log("this.addClientStateService.addClientData")
        console.log(this.addClientStateService.addClientData)
        console.log('this.addClientStateService.addClientData')
        if (response.ResponseStatus.toString().toLowerCase() == 'error') {
          this.notification.error(
            'Client not added',
            'Please try again letter'
          );
          this.addClientStateService.restAddClientState();
        } else {
          this.notification.success('Client added successfully', '');
          this.addClientStateService.restAddClientState();
        }
      },
      () => {
        this.notification.error('Client  not added', 'Please try again letter');
        this.addClientStateService.restAddClientState();
      }
    );
  }
}
