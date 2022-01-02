import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Client } from '../../models/client';
import { Project } from '../../models/project';

@Injectable({
  providedIn: 'root'
})
export class ClientAndProjectService {

  private readonly _userId = "279f7d9c-425e-4691-8eff-716ba6fd6524"
  private readonly _httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  protected readonly _url = "http://localhost:14696/api/v1/ProjectModule/GetByEmployeeId"

  /**
   *
   */
  constructor(
    protected readonly _httpClient: HttpClient
  ) { }

  public get(): Observable<Client[]> {
    const params = new HttpParams().set("employeeId", this._userId)
    return this._httpClient.get<any>(
      this._url + "?employeeId=" + this._userId
    )
      .pipe(
        map(response => {
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
        })
      )
  }
}