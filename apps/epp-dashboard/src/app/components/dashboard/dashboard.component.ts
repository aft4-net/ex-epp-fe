import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
<<<<<<< HEAD
import { AuthenticationService } from 'libs/common-services/Authentication.service';

=======
>>>>>>> 561e3da05d8604beed770bc212bd9f34131f094e

import { AuthenticationService } from './../../../../../../libs/common-services/Authentication.service';
import {PermissionService} from './../../../../../../libs/common-services//permission.service';
import { IntialdataService } from '../../services/intialdata.service';
@Component({
  selector: 'exec-epp-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
<<<<<<< HEAD

  fullName:any
  constructor(private authService: MsalService,private _authenticationService:AuthenticationService) { 
    this.fullName=_authenticationService.getUserFullName();
    const namearray=this.fullName.split(' ');
    this.fullName=namearray[0];

=======
  fullName:any
  permissionList:any[]=[ ];
modulePermission:any[]=[];
  constructor(private _intialdataService: IntialdataService,private _authenticationService:AuthenticationService,private _permissionService:PermissionService) { }

  ngOnInit(): void {
    this.fullName=this._authenticationService.getUserFullName();
>>>>>>> 561e3da05d8604beed770bc212bd9f34131f094e

    this.getPermission();
    this._permissionService.permissionList=this.permissionList;
  }
   authorize(key:string){
     
    // return true;
     return this._permissionService.authorizedPerson(key);
   }
   getPermission(): void {
    this._intialdataService.getUserPermission().subscribe((res:any)=>{
      this.permissionList=res.Data;     
    })
    this._intialdataService.getModulePermission().subscribe((res:any)=>{
      this.modulePermission=res.Data;
     
      this.modulePermission.forEach(parent => {
        this.permissionList.forEach(child => {
            if(parent.PermissionCode==child.ParentCode){
                this.permissionList=[...this.permissionList,parent]
                this._permissionService.permissionList=this.permissionList;
            }
        });
    });
    })
}
}


