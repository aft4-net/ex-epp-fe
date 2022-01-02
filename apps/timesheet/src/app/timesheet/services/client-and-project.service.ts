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
      "http://localhost:14696/api/v1/ProjectModule/GetByEmployeeId?employeeId=279f7d9c-425e-4691-8eff-716ba6fd6524"
    );
  }

  protected _extractMultiple(response: any): Client[] {
    return response.Data.map((client: any) => {
      // const projects: Project[] = client.Projects as Project[]
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