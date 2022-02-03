import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IntialdataService {

  userEmail=window.sessionStorage.getItem('username');
  baseUrl = `${environment.apiUrl}/UserGroups/GetPermissionsByUserEmail?email=${this.userEmail?.toLowerCase()}`;
  baseUrl2 = environment.apiUrl + '/Permission/module';

  constructor(private http: HttpClient) {
}

  getUserPermission(){
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
