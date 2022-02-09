import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IDutyBranch } from '../../Models/EmployeeOrganization/DutyBranch';
import { Observable } from 'rxjs';
import { CountryModel } from '../../Models/EmployeeOrganization/ContryModel';
import { DutyBranchModel } from '../../Models/EmployeeOrganization/DutyBranchModel';
import { SelectOptionModel } from '../../Models/supporting-models/select-option.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  baseUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) { 

  }

  loadCountries(): Observable<SelectOptionModel[]> {
    return this.http.get<any>(this.baseUrl + '/country/GetAllCountries')
    .pipe(
      map((response: any) => {
        return response.map((country: any) => {
          return {
            value: country.Guid,
            label: country.Name
          } as SelectOptionModel
        })
      })
    );
  }

  loadDutyBranch(country:string): Observable<SelectOptionModel[]> {
    return this.http.get<any>(this.baseUrl + '/dutybranch/GetDutyBranchByCountryId/' + country)
    .pipe(
      map((response: any) => {
        return response.map((dutyStation: any) => {
          return {
            value: dutyStation.Guid,
            label: dutyStation.Name
          } as SelectOptionModel
        })
      })
    );
  }
}
