import { ClientStatus } from './../models/get/client-status';
import { Injectable } from '@angular/core';
import { ApiService } from 'apps/project-management/src/app/core/models/apiService';
import { HttpClient } from '@angular/common/http';

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
