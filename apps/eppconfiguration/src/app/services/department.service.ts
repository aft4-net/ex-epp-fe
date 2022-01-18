import { HttpClient } from '@angular/common/http';
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
    return this.http.get<ResponseDTO<Department>>(this.baseUrl + "Departments/Get?id="+ id);
  }

  getDepartments(index: number): Observable<Pagination> {
    index = index ?? 1;
    return this.http.get<Pagination>(this.baseUrl + "Departments?pageindex="+index);
  }

  addDepartment(department: Department): Observable<ResponseDto<Department>> {
    return this.http.post<ResponseDto<Department>>(this.baseUrl + "Departments", department);
  }

  updateDepartment(department: Department, id: string): Observable<ResponseDto<Department>> {
    department.Guid = id;
    return this.http.put<ResponseDto<Department>>(this.baseUrl + "Departments", department);
  }

  deleteDepartment(id: string): Observable<ResponseDto<Department>> {
    return this.http.delete<ResponseDto<Department>>(this.baseUrl + "Departments/?id="+ id);
  }
}
