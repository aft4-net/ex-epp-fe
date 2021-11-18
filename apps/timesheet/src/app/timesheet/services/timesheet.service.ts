import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';

import { map } from "rxjs/operators";

import { environment } from 'apps/timesheet/src/environments/environment';
import { TimeEntriesResponse, TimeEntry, TimeEntryResponse, Timesheet, TimesheetResponse } from '../../models/timesheetModels';
import { Project } from '../../models/project';
import { Client } from '../../models/client';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient,) {
  }

  getTimeSheet(userId: string, date?: Date) {
    let fromDate = new Date();

    if (date) {
      date.setDate(date.getDate() - date.getDay() + 1);
      fromDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 3, 0, 0, 0);
    }
    else {
      fromDate.setDate(fromDate.getDate() - fromDate.getDay() + 1);
      fromDate = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate(), 3, 0, 0, 0);
    }

    let params = new HttpParams();

    params = params.append("employeeId", userId);
    params = params.append("date", fromDate.toISOString());

    let response = this.http.get<TimesheetResponse>(this.baseUrl + "Timesheets", { observe: "response", params: params });

    return response.pipe(map(r => r.body?.Data));
  }

  getTimeEntry(timeEntryId: string) {
    let params = new HttpParams();

    params = params.append("id", timeEntryId);

    let response = this.http.get<TimeEntryResponse>(this.baseUrl + "timeentries", { observe: "response", params: params });

    return response.pipe(map(r => r.body?.Data));
  }

  getTimeEntries(timesheetId: string, date?: Date, projectId?: string) {
    let params = new HttpParams();

    params = params.append("timesheetId", timesheetId);

    if (date) {
      date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 3, 0, 0, 0);
      params = params.append("date", date.toISOString());
    }

    if (projectId) {
      params = params.append("projectId", projectId);
    }

    let response = this.http.get<TimeEntriesResponse>(this.baseUrl + "timeentries", { observe: "response", params: params })

    return response.pipe(map(r => r.body?.Data));
  }

  addTimeEntry(employeeId: string, timeEntry: TimeEntry) {
    const headers = { "content-type": "application/json" };

    let params = new HttpParams();

    params = params.append("employeeId", employeeId);
    
    return this.http.post<any>(this.baseUrl + "timeentries", timeEntry, { "headers": headers, params: params });
  }

  updateTimeEntry(timeEntry: TimeEntry) {
    const headers = { "content-type": "application/json" };

    return this.http.put<TimeEntryResponse>(this.baseUrl + "timeentries", timeEntry, { "headers": headers });
  }

  //#region client and poject from mock server

  getClients(clientIds?: string[]) {
    if (clientIds) {
      let params = new HttpParams();

      for (const index in clientIds) {
        params = params.append("id", clientIds[index]);
      }

      let response = this.http.get<Client[]>("http://localhost:3000/clients", { observe: "response", params: params });

      return response.pipe(map(r => r.body));
    }
    else {
      return this.http.get<Client[]>("http://localhost:3000/clients");
    }
  }

  getClient(clientId: string) {
    let params = new HttpParams();

    params = params.append("id", clientId);

    let response = this.http.get<Client[]>("http://localhost:3000/clients", { observe: "response", params: params });

    return response.pipe(map(r => r.body));
  }

  getProjects(userId: string, clientId?: string) {
    let params = new HttpParams();

    params = params.append("employeeId", userId);

    if (clientId) {
      params = params.append("clientId", clientId);
    }

    let response = this.http.get<Project[]>("http://localhost:3000/projects", { observe: "response", params: params });

    return response.pipe(map(r => r.body));
  }

  getProject(projectId: string) {
    let params = new HttpParams();

    params = params.append("id", projectId);

    let response = this.http.get<Project[]>("http://localhost:3000/projects", { observe: "response", params: params });

    return response.pipe(map(r => r.body));
  }

  //#endregion

}
