import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { ResponseDTO } from '../../models/ResponseDTO';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { GetClient } from '../Models/get-client';
import { GetProject } from '../Models/get-project';
import { ResponseDTO } from '../Models/ResponseDTO';
import { ErrHandleService } from '../shared/services/error-handle.service';


Injectable({providedIn: 'root'})
export class ViewReportService {
  header = new HttpHeaders({ 'Content-Type': 'application/json' });
  routerInfo = '/viewreport';
  path = `${environment.apiUrl}/reports`;

  private dataSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  data: Observable<boolean> = this.dataSource.asObservable();
 
  constructor(private http: HttpClient,private errHandler: ErrHandleService) {}
  private formatErrors(error: any) {
    return throwError(error.error);
  }
 
  getClientName(
    params: any
  ): Observable<any> {
    return this.http
      .get<any>(`${environment.apiUrl}/Client`, { params })
      .pipe(catchError(this.formatErrors));
  }
  getprojectData(params: any): Observable<any> {
    return this.http
      .get<any>(`${environment.apiUrl}/Project`, { params })
      .pipe(catchError(this.formatErrors));
  }
 
  getProjectByClientId(id: string): Observable<ResponseDTO<any>> {
    return this.http.get<any>(`${environment.apiUrl}/Project/ClientProjects(clientGuid)?guid=${id}`)
      .pipe(catchError(this.formatErrors));
  }
 


  setRoutInfo(path: string) {
    this.routerInfo = path;
  }
  getRoutInfo() {
    return this.routerInfo;
  }


   getClientList(): Observable<[GetClient]> {
    const url = `${environment.apiUrl}/Client`;
  return this.http.get<[GetClient]>(url).pipe(
    catchError(this.formatErrors)
  );
  }
  getProjectList(): Observable<[GetProject]> {
    const url = `${environment.apiUrl}/Project`;
  return this.http.get<[GetProject]>(url).pipe(
    catchError(this.formatErrors)
  );
  }
  getProjectsListByClient(ClientId: string): Observable<ResponseDTO< [GetProject]>> {
    
    const url = `${environment.apiUrl}/Project/ClientProjects(clientGuid)?guid=${ClientId}`;
  return this.http.get<ResponseDTO< [GetProject]>>(url).pipe(
    catchError(this.formatErrors)
  );
}

   
    
}