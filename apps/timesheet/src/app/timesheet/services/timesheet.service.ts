import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {

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
  
}
