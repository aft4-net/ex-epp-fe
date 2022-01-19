import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../environments/environment";
import { ErrHandleService } from './error-handle.service';

@Injectable({
    providedIn: 'root',
  })
  export class PermissionListService {
    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    path = `${environment.apiUrl}/GroupSet`;
permissionList:any[]=[ ];

constructor(private http: HttpClient, private errHandler: ErrHandleService) {}
      authorizedPerson(key:string){
        let found=false;
          this.permissionList.forEach(element => {
              if(element.KeyValue==key){
                  found= true;
              }
          });
          return found;
      }
    } 