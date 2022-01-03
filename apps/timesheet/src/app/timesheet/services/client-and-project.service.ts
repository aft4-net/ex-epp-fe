import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Client } from '../../models/client';
import { Project } from '../../models/project';
import { BaseQueryOnlyAPIService } from './base-api.service';

@Injectable({
  providedIn: 'root'
})
export class ClientAndProjectService extends BaseQueryOnlyAPIService<Client> {

  constructor(
    httpClient: HttpClient
  ) {
    super(
      httpClient,
      environment.apiUrl + "/ProjectModule/GetByEmployeeId?employeeId=" + localStorage.getItem("userId") as string
    );
  }

  protected _extractMultiple(response: any): Client[] {
    return response.Data.map((client: any) => {
      return {
        id: client.Guid,
        name: client.ClientName,
        projects: client.Projects.map((project: any) => {
          return {
            id: project.Guid,
            name: project.ProjectName
          } as Project
        })
      } as Client;
    });
  }

}