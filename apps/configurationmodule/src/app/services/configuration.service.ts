import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment'
import { TimesheetConfigResponse, TimesheetConfiguration } from './../models/timesheetModels';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  baseUrl = environment.timesheetApiUrl;
  constructor(private http: HttpClient) { }

  //#region Timesheet Configuration

  getTimeSheetConfiguration() {
    let response = this.http.get<TimesheetConfigResponse>(
      this.baseUrl + 'TimeSheetConfig'
    );

    return response.pipe(map((r) => r.Data));
  }

  addTimeSheetConfiguration(timesheetConfig: TimesheetConfiguration) {
    const headers = { 'content-type': 'application/json' }

    return this.http.post<TimesheetConfigResponse>(this.baseUrl + 'TimeSheetConfig', timesheetConfig, {headers: headers});
  }

  //#endregion
}
