import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { IEmployeeModel } from '../../features/Models/employee.model';
import { GroupSetModel } from '../../features/Models/group-set.model';
import { IUserGetModel } from '../../features/Models/User/user-get.model';
import { IUserPostModel } from '../../features/Models/User/user-post.model';
import { ResponseDTO } from '../../features/Models/ResponseDTO';

@Injectable({
  providedIn: 'root',
})
export class AddUserService {
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  path = `${environment.apiUrl}`;

  private dataSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  data: Observable<boolean> = this.dataSource.asObservable();
  
  constructor(private http: HttpClient) {}
  
  add(user: IUserPostModel): Observable<ResponseDTO<any>> {
      this.path = `${environment.apiUrl}/user`
    return this.http.post<ResponseDTO<any>>(this.path, user, this.httpOptions).pipe(
      catchError(this.formatError)
    );
  }

  getEmployeeById(employeeId: string): Observable<ResponseDTO<IEmployeeModel>> {
    const url = `${environment.apiUrl}/Employee/GetEmployeeWithID?employeeId=${employeeId}`;
    return this.http.get<ResponseDTO<IEmployeeModel>>(url).pipe(
      catchError(this.formatError)
    );
  }

  getAllEmployees(): Observable<ResponseDTO<[IEmployeeModel]>> {
      const url = `${environment.apiUrl}/Employee`;
    return this.http.get<ResponseDTO<[IEmployeeModel]>>(url).pipe(
      catchError(this.formatError)
    );
  }
  getEmployeesNotInUsers(): Observable<ResponseDTO<[IEmployeeModel]>> {
    const url = `${environment.apiUrl}/User/GetEmployeesNotInUsers`;
  return this.http.get<ResponseDTO<[IEmployeeModel]>>(url).pipe(
    catchError(this.formatError)
  );
}

  getById(id: string): Observable<ResponseDTO<[IUserGetModel]>> {
    this.path = `${environment.apiUrl}/user`
    const url = `${this.path}?id=${id}`;
    return this.http.get<ResponseDTO<[IUserGetModel]>>(url).pipe(
      catchError(this.formatError)
    );
  }
  getGroups(): Observable<[GroupSetModel]> {
    const url = `${environment.apiUrl}/GroupSet/getAll`;
  return this.http.get<[GroupSetModel]>(url).pipe(
    catchError(this.formatError)
  );
  }
  getUserGroups(userId: string): Observable<ResponseDTO< [GroupSetModel]>> {
    
    const url = `${environment.apiUrl}/UserGroups/GetGroupSetByUserId?guid=${userId}`;
  return this.http.get<ResponseDTO< [GroupSetModel]>>(url).pipe(
    catchError(this.formatError)
  );
}
addGroups(userId: string, Groups: string []): Observable<ResponseDTO<any>> {
  this.path = `${environment.apiUrl}/UserGroups?UserId=${userId}`
return this.http.put<ResponseDTO<any>>(this.path, Groups, this.httpOptions).pipe(
  catchError(this.formatError)
);
}

  formatError(error:any)
  {
    return throwError(error);
  }

  log(data: any) {
    console.log(data);
  }
}
