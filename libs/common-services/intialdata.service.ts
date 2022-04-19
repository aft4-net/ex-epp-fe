import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IntialdataService {

  userEmail = window.sessionStorage.getItem('username') ?? null;
    useEmails = JSON.parse(
    localStorage.getItem('loggedInUserInfo') ?? '{}'
  );
  /*
  baseUrl = `${environment.apiUrl}/UserGroups/GetPermissionsByUserEmail?email=${this.userEmail?.toLowerCase()}`;
  baseUrlByEmail = `${environment.apiUrl}/UserGroups/GetPermissionsByUserEmail?email=${this.useEmails.Email?.toLowerCase()}`;
  baseUrl2 = environment.apiUrl + '/Permission/module';
  //*/

  constructor(private http: HttpClient) {
}

  getUserPermission(apiUrl: string){
    return this.http.get(`${apiUrl}/UserGroups/GetPermissionsByUserEmail?email=${this.useEmails.Email?.toLowerCase()}`).pipe(
      map((response:any)=>{
        return response;
      })
    );
  }

  getUsersPermissionByEmail(apiUrl: string){
    return this.http.get(`${apiUrl}/UserGroups/GetPermissionsByUserEmail?email=${this.userEmail?.toLowerCase()}`).pipe(
      map((response:any)=>{
        return response;
      })
    );
  }

  getModulePermission(apiUrl: string){
    return this.http.get(apiUrl + '/Permission/module');
  }
}
