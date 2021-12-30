import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  baseUrl = environment.apiUrl + '/Permission/zeroLevel';
  constructor(private http: HttpClient) { }

  getPermission(){
    return this.http.get(this.baseUrl);
  }
}
