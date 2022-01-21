import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservableLike } from 'rxjs';
import { environment } from '../../environments/environment';
import { Department } from '../models/department';
import { Pagination } from '../models/pagination';
import { ResponseDto, ResponseDTO } from '../models/response-dto.model';


@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  baseUrl = environment.apiUrl;
  departments:Department[] = [];

  constructor(private http: HttpClient) { }

  getDepartment(id: string): Observable<ResponseDTO<Department>> {
    return this.http.get<ResponseDTO<Department>>(this.baseUrl + "Department/Get?id="+ id);
  }

  getDepartments(index: number, searchKey: string, sortBy: string, sortOrder: string): Observable<Pagination> {
    index = index ?? 1;

    let params = new HttpParams()
      .append('PageIndex', `${index}`);
    if(searchKey) {
      params= params.append('searchKey', `${searchKey}`);
    }
    if(sortBy) {
      params = params.append('sortBy', `${sortBy}`);
    }
    
    if(sortOrder) {
      params =params.append('sortOrder',`${sortOrder}`);
    }

    return this.http.get<Pagination>(this.baseUrl + "Department?"+params.toString());
  }

  addDepartment(department: Department): Observable<ResponseDto<Department>> {
    return this.http.post<ResponseDto<Department>>(this.baseUrl + "Department", department);
  }

  updateDepartment(department: Department, id: string): Observable<ResponseDto<Department>> {
    department.Guid = id;
    return this.http.put<ResponseDto<Department>>(this.baseUrl + "Department", department);
  }

  deleteDepartment(id: string): Observable<ResponseDto<Department>> {
    return this.http.delete<ResponseDto<Department>>(this.baseUrl + "Department/?id="+ id);
  }
}
