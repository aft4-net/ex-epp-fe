import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IntialdataService {

  userEmail=window.sessionStorage.getItem('username');
    useEmails = JSON.parse(
    localStorage.getItem('loggedInUserInfo') ?? ''
  );
  baseUrl = `${environment.apiUrl}/UserGroups/GetPermissionsByUserEmail?email=${this.userEmail?.toLowerCase()}`;
  baseUrlByEmail = `${environment.apiUrl}/UserGroups/GetPermissionsByUserEmail?email=${this.useEmails.Email?.toLowerCase()}`;
  baseUrl2 = environment.apiUrl + '/Permission/module';

  constructor(private http: HttpClient) {
}

  getUserPermission(){
    console.log(this.baseUrlByEmail);
    return this.http.get(this.baseUrlByEmail).pipe(
      map((response:any)=>{
        return response;
      })
    );
  }

  getUsersPermissionByEmail(){
    return this.http.get(this.baseUrl).pipe(
      map((response:any)=>{
        return response;
      })
    );
  }
  getModulePermission(){

    return this.http.get(this.baseUrl2);
  }
}
