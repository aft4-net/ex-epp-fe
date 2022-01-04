import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../environments/environment";
import { ErrHandleService } from './error-handle.service';

@Injectable({
    providedIn: 'root',
  })
  export class PermissionService {
    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    path = `${environment.apiUrl}/GroupSet`;
permissionList:any[]=[];
email:string='';
    constructor(private http: HttpClient, private errHandler: ErrHandleService) {}

    getPermission(): void {
         this.http.get<any>(`${environment.apiUrl}/UserGroups/GetPermissionsByUserEmail?email=${this.email}`).subscribe((res:any) => {
             this.permissionList=res.Data;
         })
       
      }
      authorizedPerson(key:string){
          if(!this.permissionList){
              this.getPermission();
          }
          this.permissionList.forEach(element => {
              if(element.KeyValue==key){
                  return true;
              }
          });
          return false;
      }
    } 