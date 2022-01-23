import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../../environments/environment';
import { Client } from '../../models/client';
import { Project } from '../../models/project';
import { BaseQueryOnlyAPIService } from './base-api.service';

//TimeSheet/

function extractURL() {
  const url = environment.apiUrl;
  const length = url.indexOf('TimeSheet');
  if(length) {
    return url.substring(0, length);
  }
  return url
}

@Injectable({
  providedIn: 'root'
})
export class ClientAndProjectService extends BaseQueryOnlyAPIService<Client> {

  constructor(
    httpClient: HttpClient
  ) {
    super(
      httpClient,
      extractURL() + "ProjectModule/GetByEmployeeId?employeeId=" + localStorage.getItem("userId")
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