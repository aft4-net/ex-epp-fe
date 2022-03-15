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
       // console.log( this._commonData.permissionList);
        let found=false;
          this._commonData.permissionList.forEach(element => {
           
              if(element.KeyValue==key){
                  found= true;
              }
          });
          return found;
      }
      get hasSingleUserPermission()
      {
        return this.authorizedPerson('Add_User')
        || this.authorizedPerson('Update_User')
        || this.authorizedPerson('Delete_User')
        || this.authorizedPerson('View_User')
      }
      get hasSingleGroupPermission()
      {
        return this.authorizedPerson('Create_Group')
        || this.authorizedPerson('Update_Group')
        || this.authorizedPerson('Delete_Group')
        || this.authorizedPerson('View_Group')
      }
    
    } 