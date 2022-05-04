import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { ResponseDTO } from '../../models/ResponseDTO';
import { BehaviorSubject, Observable, throwError, observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { GetClient } from '../Models/get-client';
import { GetProject } from '../Models/get-project';
import { Report, projects } from '../Models/getReport';
import { ReportWithCriteria } from '../Models/reportWithCriteria';
import { ResponseDTO } from '../Models/ResponseDTO';
import { ErrHandleService } from '../shared/services/error-handle.service';


@Injectable({ providedIn: 'root' })
export class ViewReportService {
  header = new HttpHeaders({ 'Content-Type': 'application/json' });
  routerInfo = '/viewreport';
  // path = `${environment.apiUrl}/reports`;
  //path = `${environment.apiUrl}`


  private dataSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  data: Observable<boolean> = this.dataSource.asObservable();

  constructor(private http: HttpClient, private errHandler: ErrHandleService) { }
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


  getClientList(): Observable<GetClient[]> {
    const url = `${environment.apiUrl}/ClientDetails`;
    return this.http.get<any>(url).pipe(
      map(responses => {
        const clients: GetClient[] = [];
        for (const response of responses.Data) {
          clients.push({
            Guid: response.Guid,
            ClientName: response.ClientName
          });
        }
        return clients;
      }),
      catchError(this.formatErrors)
    );
  }

  getProjectList(): Observable<[GetProject]> {
    const url = `${environment.apiUrl}/Project`;
    return this.http.get<[GetProject]>(url).pipe(
      catchError(this.formatErrors)
    );
  }
  getProjectsListByClient(ClientId: string): Observable<ResponseDTO<[GetProject]>> {
    //Project/ClientProjects(clientGuid)?clientGuid
    const url = `${environment.apiUrl}/Project/ClientProjects(clientGuid)?clientGuid=${ClientId}`;
    return this.http.get<ResponseDTO<[GetProject]>>(url).pipe(
      catchError(this.formatErrors)
    );
  }
  getReports(ClientId: string, _starday: string | null, _endDay: string | null, ProjectId?: string[]): Observable<Report[]> {
    //ClientId="d1f25a6c-3e2e-4d69-882b-9f67f65a6b7f"
    //TimeSheet/TimeSheetReport/2022-03-03, 2022-3-30?clientId=d1f25a6c-3e2e-4d69-882b-9f67f65a6b7f
    console.log("Before send service");
    console.log(ProjectId);
    let url = `${environment.apiUrl}/TimeSheet/TimeSheetReport/${_starday}, ${_endDay}?clientId=${ClientId}`;
    if (ProjectId) {
      url = url + '&&projectId=' + ProjectId;
      console.log("Inside if statment", ProjectId);
    }
    console.log("End Of sssssss", ProjectId);
    return this.http.get(url).pipe(map((res: any) => {
      return res.Data;
    }));
  }
  getReportsByCriteria(body: ReportWithCriteria): Observable<Report[]> {
    const url = `${environment.apiUrl}/TimeSheet/TimeSheetReport` + body;
    console.log("to check byyy wwwwwwwwwww ffffffffffffffffffffff")

    return this.http.get(url).pipe(map((res: any) => {
      return res.Data;
    }));
  }
  getReportsByCriterias(body: ReportWithCriteria): Observable<any> {
    console.log("who is who ");
    return this.http
      .post(`${environment.apiUrl}/TimeSheet/TimeSheetReport`, body)
      .pipe(catchError(this.formatErrors));
  }

  getTimesheetReportForExport(fromDate: Date, toDate: Date, clientId: string, projectIds?: string[]) {
    const url = `${environment.apiUrl}/Timesheet/TimeSheetReport/TimsheetForExport`;
    let params = new HttpParams();

    params = params.append("fromDate", fromDate.toISOString());
    params = params.append("toDate", toDate.toISOString());
    params = params.append("clientId", clientId);

    if(projectIds && projectIds.length > 0) {
      params.append("projectIds", projectIds.toString());
    }

    const response = this.http.get<any>(url, {observe: "response", params: params})

    return response.pipe(map(r => r.body?.Data))
  }
}