import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/applicant-tracking/src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PersonalInfoModel } from '../../models/applicant/personal-info.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicantGeneralInfoService {
  constructor( private http: HttpClient  ) { }
  private formatErrors(error:any) {
    return  throwError(error.error);
  }

  post(path: string, body: PersonalInfoModel): Observable<any> {
    return this.http.post(
      `${environment.api_url}${path}`,
      JSON.stringify(body)
    ).pipe(catchError(this.formatErrors));
  }
  put(path: string, body: PersonalInfoModel): Observable<any> {
    return this.http.put(
      environment.api_url + path,
      JSON.stringify(body)
    ).pipe(catchError(this.formatErrors));
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<PersonalInfoModel> {
    return this.http.get<PersonalInfoModel>(`${environment.api_url}${path}`, { params })
      .pipe(catchError(this.formatErrors));
  }


}
