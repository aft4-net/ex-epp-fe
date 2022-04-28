import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { ResponseDTO } from '../../models/ResponseDTO';
import { BehaviorSubject, Observable, throwError, observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { GetClient } from '../Models/get-client';
import { GetProject } from '../Models/get-project';
import { Report,projects } from '../Models/getReport';
import { ResponseDTO } from '../Models/ResponseDTO';
import { ErrHandleService } from '../shared/services/error-handle.service';


@Injectable({providedIn: 'root'})
export class ViewReportService {
  header = new HttpHeaders({ 'Content-Type': 'application/json' });
  routerInfo = '/viewreport';
 // path = `${environment.apiUrl}/reports`;
 //path = `${environment.apiUrl}`


  private dataSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  data: Observable<boolean> = this.dataSource.asObservable();
 
  constructor(private http: HttpClient,private errHandler: ErrHandleService) {}
  private formatErrors(error: any) {
    return throwError(error.error);
  }
  getAllClientLists(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/ClientDetails/GetAll`)
      .pipe(catchError(this.formatErrors));
  }


  getClientName(
    params: any
  ): Observable<any> {
    return this.http
      .get<any>(`${environment.apiUrl}/ClientDetails`, { params })
      .pipe(catchError(this.formatErrors));
  }
  getprojectData(params: any): Observable<any> {
    return this.http
      .get<any>(`${environment.apiUrl}/Project`, { params })
      .pipe(catchError(this.formatErrors));
  }
 
  // getProjectByClientId(id: string): Observable<ResponseDTO<any>> {
  //   id="d1f25a6c-3e2e-4d69-882b-9f67f65a6b7f";
  //   return this.http.get<any>(`${environment.apiUrl}/Project/ClientProjects(clientGuid)?clientGuid=${id}`)
  //     .pipe(catchError(this.formatErrors));
  // }
  getProjectByClientId(id: string): Observable<ResponseDTO<any>> {
    return this.http.get<any>(`${environment.apiUrl}/Project/ClientProjects(clientGuid)?clientGuid=${id}`)
      .pipe(catchError(this.formatErrors));
  }


  setRoutInfo(path: string) {
    this.routerInfo = path;
  }
  getRoutInfo() {
    return this.routerInfo;
  }


  getClientList(): Observable<[GetClient]> {
    const url = `${environment.apiUrl}/ClientDetails/GetAll`;
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
    //Project/ClientProjects(clientGuid)?clientGuid
    const url = `${environment.apiUrl}/Project/ClientProjects(clientGuid)?clientGuid=${ClientId}`;
  return this.http.get<ResponseDTO< [GetProject]>>(url).pipe(
    catchError(this.formatErrors)
  );
}
getReports(ClientId:string,_starday:string|null,_endDay:string|null,ProjectId?:string):Observable<Report[]>
{
  ClientId="d1f25a6c-3e2e-4d69-882b-9f67f65a6b7f"
  //TimeSheet/TimeSheetReport/2022-03-03, 2022-3-30?clientId=d1f25a6c-3e2e-4d69-882b-9f67f65a6b7f
let url =`${environment.apiUrl}/TimeSheet/TimeSheetReport/${_starday}, ${_endDay}?clientId=${ClientId}`;
if(ProjectId)
{
url= url+'&&projectId=' + ProjectId;
}
 return this.http.get(url).pipe(map((res:any)=>{
  return res.Data;
 }));
}
}