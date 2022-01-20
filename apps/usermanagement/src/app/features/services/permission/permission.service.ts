import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { IPermissionModel } from '../../Models/User/Permission-get.model';
export interface Permission{
   GroupSetId:string,
      GroupSet:string,
      PermissionId:string,
      Permission:string,
      Guid:string,
      IsActive:string,
      IsDeleted:string,
      CreatedDate:string,
      CreatedbyUserGuid:string
    }
    
@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  [x: string]: any;
  goupPermissions:IPermissionModel[] = [];
  baseUrl = environment.apiUrl + '/Permission/zeroLevel';
  baseUrl2 = environment.apiUrl + '/GroupSetPermission';
  baseUrl3 = environment.apiUrl + '/Permission/CategoryByGroupId?guid=';
  baseUrl4 = environment.apiUrl + '/GroupSetPermission/GetByGroupId?guid=';
  baseUrl5 = environment.apiUrl + '/GroupSetPermission?guid=';
  baseUrl6= environment.apiUrl + '/GroupSetPermission?id=';

  PermissionList:Permission[]=[];
  constructor(private http: HttpClient) { }

  getPermission(){
    return this.http.get(this.baseUrl);
  }
  getPermissionCategoryById(guid:string){
    return this.http.get(this.baseUrl3 + guid);
  }
  addGroupPermission(data:any){
    this.http.get<Permission>(this.baseUrl5 + data.GroupSetId).subscribe((res:any)=>{
      this.PermissionList=res.Data
     
      this.PermissionList.forEach((element) => {
        this.http.delete(this.baseUrl6 + element.Guid).subscribe((data:any)=>{
        
         console.log()
        })
      });
    })
    return this.http.post(this.baseUrl2,data);
  }
  getGroupPermissionById(id:any){
     this.http.get(this.baseUrl4+id).subscribe((res:any)=>{
this.goupPermissions=res.Data;
     });
  }
}
