import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PersonalInfoModel } from '../../models/applicant/personal-info.model';

// @Injectable({
//   providedIn: 'root',
// })
@Injectable({providedIn: 'root'})
export class ApplicantGeneralInfoService {
  header = new HttpHeaders({ 'Content-Type': 'application/json' });
  routerInfo = '/application/personal-information';
  constructor(private http: HttpClient) {}
  private formatErrors(error: any) {
    return throwError(error.error);
  }

  updatePersonalInfo(body: PersonalInfoModel): Observable<any> {
    return this.http
      .put(`${environment.apiUrl}/Applicant/ApplicantGeneralInfo`, JSON.stringify(body), {
        headers: this.header,
      })
      .pipe(catchError(this.formatErrors));
  }
  appliedToPositions() {
    return of([
      {
        id: 1,
        positionId: 1
      },
      {
        id: 2,
        positionId: 6
      }
    ]);
  }
  getSkills() {
    return of([
      {
        id: 1,
        name: 'test'
      },
      {
        id: 2,
        name: 'abcd'
      },
      {
        id: 4,
        name: 'added new'
      },
      {
        id: 3,
        name: 'skillSetTesting'
      }
    ]);
  }

  getPersonalInfo(
    params: any
  ): Observable<any> {
    return this.http
      .get<any>(`${environment.apiUrl}/Applicant`, { params })
      .pipe(catchError(this.formatErrors));
  }
  setRoutInfo(path: string) {
    this.routerInfo = path;
  }
  getRoutInfo() {
    return this.routerInfo;
  }
}
