import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IntialdataService {

  userEmail=window.sessionStorage.getItem('username');
  useEmails = JSON.parse(localStorage.getItem('loggedInUserInfo') ?? '{}');

  baseUrl = `${environment.apiUrl}/UserGroups/GetPermissionsByUserEmail?email=${this.userEmail?.toLowerCase()}`;
  baseUrlByEmail = `${environment.apiUrl}/UserGroups/GetPermissionsByUserEmail?email=${this.useEmails.Email?.toLowerCase()}`;

  baseUrl2 = environment.apiUrl + '/Permission/module';
 
  constructor(private http: HttpClient) { 
}

  getUserPermission(){
   
    return this.http.get(this.baseUrl);
  }

  getUserPermissionByEmail(){
   
    return this.http.get( this.baseUrlByEmail);
  }

  getModulePermission(){
    
    return this.http.get(this.baseUrl2);
  }
  getUser(email:string){
   return this.http.get<any>(environment.apiUrl+'/Employee/GetEmployeeSelectionByEmail?employeeEmail=' + email.toLowerCase());
  }
}
