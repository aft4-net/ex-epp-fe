import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservableLike } from 'rxjs';
import { environment } from './../../../../environments/environment';
import { Role } from '../../../../../../configurationmodule/src/app/models/role';
import { ResponseDto } from '../../../../../../configurationmodule/src/app/models/response-dto.model';
import { map } from 'rxjs/operators';
import { SelectOptionModel } from '../../Models/supporting-models/select-option.model';


@Injectable({
  providedIn: 'root'
})
export class ReportingManagerService {
  baseUrl = environment.apiUrl;
  roles:Role[] = [];

  constructor(private http: HttpClient) { }

  GetReportingManager(): Observable<SelectOptionModel[]> {
    return this.http.get<any>(this.baseUrl + "/Employee/GetReportingManagers")
    .pipe(map((response: any) => {
        return response.Data.map((role: any) => {
          return {
            value: role.Id,
            label: role.EmployeeName
          } as SelectOptionModel
        })
      })
    );
  }
}
