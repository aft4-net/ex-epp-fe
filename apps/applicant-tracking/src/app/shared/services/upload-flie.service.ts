import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/applicant-tracking/src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  
  constructor( private http: HttpClient  ) { }

 
  upload(path: string, file: File, id: string): Observable<any> {
    const formData = new FormData();
    if(file)
    formData.append('file', file);
    formData.append('id', id);
    return this.http.post(
      `${environment.api_url}${path}`,
      formData,
      {
        reportProgress: true,
        observe: 'events'
      });
  }
  

}
