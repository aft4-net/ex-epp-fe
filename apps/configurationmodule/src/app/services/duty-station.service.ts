import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

import { environment } from './../../environments/environment';
import { DutyStation, DutyStationResponse } from './../models/duty-station';

@Injectable({
  providedIn: 'root'
})
export class DutyStationService {
  baseUrl = environment.dutyStationApiUrl;

  constructor(private http: HttpClient) { }

  get(countryId?: string){
    if(countryId){
      return this.http.get<DutyStation[]>(this.baseUrl + `GetDutyBranchByCountryId/${countryId}`);
    }

    return new Observable<DutyStation[]>(subscriber => {
      subscriber.next([]);
    });
  }

  add(dutyStation: DutyStation) {
    const headers = { 'content-type': 'application/json' };

    return this.http.post<DutyStationResponse>(this.baseUrl + 'RegisterDutyBranch', dutyStation, {headers: headers});
  }

  update(dutyStation: DutyStation) {
    const headers = { 'content-type': 'application/json' };

    return this.http.put<DutyStationResponse>(this.baseUrl + "UpdateDutyBranch", dutyStation, {headers: headers});
  }

  delete(dutyStation: DutyStation) {
    const headers = {'content-type': 'application/json'}

    return this.http.put<DutyStationResponse>(this.baseUrl + "DeleteDutyBranch", dutyStation, {headers: headers});
  }
}
