import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/applicant-tracking/src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PersonalInfoModel } from '../../models/applicant/personal-info.model';

@Injectable({
  providedIn: 'root',
})
export class ApplicantGeneralInfoService {
  header = new HttpHeaders({ 'Content-Type': 'application/json' });
  routerInfo = '/application/personal-information';
  constructor(private http: HttpClient) {}
  private formatErrors(error: any) {
    return throwError(error.error);
  }

  updatePersonalInfo(body: PersonalInfoModel): Observable<any> {
    return this.http
      .put(`${environment.apiUrl}/Applicant/Register`, JSON.stringify(body), {
        headers: this.header,
      })
      .pipe(catchError(this.formatErrors));
  }

  PersonalInfo(
    params: HttpParams = new HttpParams()
  ): Observable<PersonalInfoModel> {
    return this.http
      .get<PersonalInfoModel>(`${environment.apiUrl}/Applicant/Register`, { params })
      .pipe(catchError(this.formatErrors));
  }
  setRoutInfo(path: string) {
    this.routerInfo = path;
  }
  getRoutInfo() {
    return this.routerInfo;
  }
}
