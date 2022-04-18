import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';
import { Role } from '../../../../../../configurationmodule/src/app/models/role';
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
    return this.http.get<any>(
      this.baseUrl + '/Employee/GetEmployeeSelection'
    )
    .pipe(map((response: any) => {
        return response.map((employee: any) => {
          return {
            value: employee.Guid,
            label: employee.Name + ' - ' + employee.Role
          } as SelectOptionModel
        })
      })
    );
  }
}
