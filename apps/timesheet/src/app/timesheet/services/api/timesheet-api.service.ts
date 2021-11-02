import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../../../models/employee';
import { Project } from '../../../models/project';
import { TimeSheet } from '../../../models/timesheet';

@Injectable({
  providedIn: 'root'
})
export class TimesheetApiService {
  start?: Date | number ;
  end?: Date | number ;
  empId?:number;
  private baseUrl = "http://localhost:14696/api/v1/";

  constructor(private readonly http: HttpClient) { }

  getTimeSheetByInterval(): Observable<TimeSheet[]>{
    return this.http.get<TimeSheet[]>(this.baseUrl + "TimeSheet/TimeSheetByEmployee/"+this.empId+"?fromDate="+this.start);
  }
  
  getEmployee() : Observable<Employee[]>{
    return this.http.get<Employee[]>(this.baseUrl + "EmployeeMock?id="+2);
  }

  getProject() : Observable<Project[]>{
    return this.http.get<Project[]>(this.baseUrl + "ProjectMock?id="+3);
  }

  getClient() : Observable<Project[]>{
    return this.http.get<Project[]>(this.baseUrl + "ClientMock?id="+1);
  }
}
