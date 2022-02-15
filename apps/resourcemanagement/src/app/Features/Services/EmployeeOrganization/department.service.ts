import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservableLike } from 'rxjs';
import { environment } from './../../../../environments/environment';
import { Department } from '../../../../../../configurationmodule/src/app/models/department';
import { ResponseDto, ResponseDTO } from '../../../../../../configurationmodule/src/app/models/response-dto.model';
import { map } from 'rxjs/operators';
import { SelectOptionModel } from '../../Models/supporting-models/select-option.model';


@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getAllDeparments():Observable<SelectOptionModel[]> {
      return this.http.get<any>(this.baseUrl + "/Department/GetAllDepartments").pipe(
        map((response: any) => {
          return response.Data.map((department: any) => {
            return {
              value: department.Guid,
              label: department.Name
            } as SelectOptionModel
          })
        })
      );
  }
}
