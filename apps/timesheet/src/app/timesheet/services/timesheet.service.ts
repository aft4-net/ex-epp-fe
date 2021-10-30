import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';

import { map } from "rxjs/operators";

import { environment } from 'apps/timesheet/src/environments/environment';
import { Timesheet } from '../../models/timesheetModels';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient,) { 
  }

  addTimesheet(timesheet: any){
    return this.http.post<any>('http://localhost:1337/timesheets', timesheet).subscribe({
        next: data => {
            //this.postId = data.id;
            console.log('response---------------');
            console.log(data);
        },
        error: error => {
            //this.errorMessage = error.message;
            console.error('There was an error!', error);
        }
    })
  }

  getTimeSheet(userId: string, date?: Date) {
    let fromDate = new Date();

    if(date){
      date.setDate(date.getDate() - date.getDate() + 1);
      fromDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 3, 0, 0, 0);
    }
    else {
      fromDate.setDate(fromDate.getDate() - fromDate.getDay() + 1);
      fromDate = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate(), 3, 0, 0, 0);
    }

    let params = new HttpParams();

    params = params.append("employeeId", userId);
    params = params.append("fromDate", fromDate.toISOString());

    let response = this.http.get<Timesheet[]>(this.baseUrl + "timesheets", { observe: "response", params: params});

    return response.pipe(map(r => r.body));
  }
}
