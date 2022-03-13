import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from "../environments/environment";
import { ErrHandleService } from './error-handle.service';
import {IntialdataService} from "./intialdata.service"
@Injectable({
    providedIn: 'root',
  })
  export class CommonDataService {
    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    path = `${environment.apiUrl}/GroupSet`;
    permissionListSource = new BehaviorSubject<any[]>([]);
    permissionList$ = this.permissionListSource.asObservable();
permissionList:any[]=[ ];
modulePermission:any[]=[];
count=23;
constructor(private _intialdataService: IntialdataService,private http: HttpClient, private errHandler: ErrHandleService) {
  
}

getPermission(): void {
  this._intialdataService.getUserPermission().subscribe((res:any)=>{
    this.permissionListSource.next(res.Data);
    this.permissionList=res.Data;  
    this.permissionList=this.permissionList;
    this._intialdataService.getModulePermission().subscribe((res:any)=>{
      this.modulePermission=res.Data;
     
      this.modulePermission.forEach(parent => {
        this.permissionList.forEach(child => {
            if(parent.PermissionCode==child.ParentCode){
             
                this.permissionList=[...this.permissionList,parent]
               
            }
        });
    });
    })
  }, error => {
    console.log(error);
  })

}


getPermissionByEmail(): void {
  this._intialdataService.getUsersPermissionByEmail().subscribe((res:any)=>{
    this.permissionListSource.next(res.Data);
    this.permissionList=res.Data;  
    this.permissionList=this.permissionList;
    this._intialdataService.getModulePermission().subscribe((res:any)=>{
      this.modulePermission=res.Data;
     
      this.modulePermission.forEach(parent => {
        this.permissionList.forEach(child => {
            if(parent.PermissionCode==child.ParentCode){
             
                this.permissionList=[...this.permissionList,parent]
               
            }
        });
    });
    })
  }, error => {
    console.log(error);
  })

}


    } 