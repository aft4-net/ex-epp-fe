import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from "../../../environments/environment";
import { ResponseDTO } from '../../models/ResponseDTO';
import { ErrHandleService } from '../../shared/services/error-handle.service';

@Injectable({providedIn: 'root'})
export class UserDetailService {
  header = new HttpHeaders({ 'Content-Type': 'application/json' });
  routerInfo = '/user-detail';
  path = `${environment.apiUrl}/user`;

  private dataSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  data: Observable<boolean> = this.dataSource.asObservable();
 
  constructor(private http: HttpClient,private errHandler: ErrHandleService) {}
  private formatErrors(error: any) {
    return throwError(error.error);
  }
  getUserInfo(
    params: any
  ): Observable<any> {
    return this.http
      .get<any>(`${environment.apiUrl}/user`, { params })
      .pipe(catchError(this.formatErrors));
  }
  getGroupName(
    params: any
  ): Observable<any> {
    return this.http
      .get<any>(`${environment.apiUrl}/user`, { params })
      .pipe(catchError(this.formatErrors));
  }
  getUsergroupData(params: any): Observable<any> {
    return this.http
      .get<any>(`${environment.apiUrl}/user`, { params })
      .pipe(catchError(this.formatErrors));
  }
  addGroupToUser(body: any): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}/usergroups`, body, {headers:this.header})
      .pipe(catchError(this.formatErrors));
  }
  getGroupSetByUserId(id: string): Observable<ResponseDTO<any>> {
    return this.http.get<any>(`${environment.apiUrl}/UserGroups/GetGroupByUserId?guid=${id}`)
      .pipe(catchError(this.formatErrors));
  }
  getAllUserGroupsByUserId(id: string): Observable<ResponseDTO<any>> {
    return this.http.get<any>(`${environment.apiUrl}/UserGroups/GetAll?guid=${id}`)
      .pipe(catchError(this.formatErrors));
  }
  deleteGroupFromUser(id: string): Observable<ResponseDTO<any>> {
    return this.http.delete<ResponseDTO<any>>(`${environment.apiUrl}/UserGroups?guid=${id}`, ).pipe(
      catchError(this.errHandler.formatErrors)
    );
  }

  setRoutInfo(path: string) {
    this.routerInfo = path;
  }
  getRoutInfo() {
    return this.routerInfo;
  }
  hasData(value: boolean) {
    this.dataSource.next(value);
  }
  get(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/GroupSet`).pipe(
      catchError(this.errHandler.formatErrors)
    );
  }
  getUserById(id:string){
    return this.http.get(`${environment.apiUrl}/user/${id}`);
  }
  getUser(email:string){
   return this.http.get<any>(`${environment.apiUrl}/Employee/GetEmployeeSelectionByEmail?employeeEmail=` + email.toLowerCase())
   
   }
    
}
