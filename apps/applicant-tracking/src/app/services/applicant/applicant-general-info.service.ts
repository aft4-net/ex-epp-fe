import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/applicant-tracking/src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GeneraInfoPost } from '../../models/applicant/general-info-post.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicantGeneralInfoService {
  constructor( private http: HttpClient  ) { }
  private formatErrors(error:any) {
    return  throwError(error.error);
  }

  post(path: string, body: GeneraInfoPost): Observable<any> {
    return this.http.post(
      `${environment.api_url}${path}`,
      JSON.stringify(body)
    ).pipe(catchError(this.formatErrors));
  }

}
