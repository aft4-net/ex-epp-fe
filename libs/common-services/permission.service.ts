import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../environments/environment";
import { ErrHandleService } from './error-handle.service';
import {CommonDataService} from './commonData.service'
@Injectable({
    providedIn: 'root',
  })
  export class PermissionListService {
    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    path = `${environment.apiUrl}/GroupSet`;
constructor(private http: HttpClient, private errHandler: ErrHandleService,private _commonData:CommonDataService) {

}
      authorizedPerson(key:string){
        let found=false; 
          this._commonData.permissionList.forEach(element => {
           
              if(element.KeyValue==key){
                  found= true;
              }
          });
          return found;
      }
    } 