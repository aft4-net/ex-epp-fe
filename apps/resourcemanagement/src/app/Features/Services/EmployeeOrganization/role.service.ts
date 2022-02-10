import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservableLike } from 'rxjs';
import { environment } from '../../../../../../configurationmodule/src/environments/environment';
import { Role } from '../../../../../../configurationmodule/src/app/models/role';
import { ResponseDto } from '../../../../../../configurationmodule/src/app/models/response-dto.model';
import { map } from 'rxjs/operators';
import { SelectOptionModel } from '../../Models/supporting-models/select-option.model';


@Injectable({
  providedIn: 'root'
})
export class RoleService {
  baseUrl = environment.apiUrl;
  roles:Role[] = [];

  constructor(private http: HttpClient) { }

  GetAllRoles(departmentId :string): Observable<SelectOptionModel[]> {
    return this.http.get<any>(this.baseUrl + "Role/GetDepartmentRoles?departmentGuid="+ departmentId)
    .pipe(map((response: any) => {
        return response.Data.map((role: any) => {
          return {
            value: role.Guid,
            label: role.Name
          } as SelectOptionModel
        })
      })
    );
  }
}
