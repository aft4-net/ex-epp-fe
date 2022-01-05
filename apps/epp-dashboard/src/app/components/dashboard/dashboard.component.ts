import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { AuthenticationService } from './../../../../../../libs/common-services/Authentication.service';
=======
import { MsalService } from '@azure/msal-angular';
>>>>>>> ad971f58fc612059d1e5a77dd8bb89bf39bea49d

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
name:any
  constructor(private _authenticationService:AuthenticationService) { }
=======
  fullName:any
  permissionList:any[]=[ ];
modulePermission:any[]=[];
  constructor(private _intialdataService: IntialdataService,private _authenticationService:AuthenticationService,private _permissionService:PermissionService) { }
>>>>>>> ad971f58fc612059d1e5a77dd8bb89bf39bea49d

  ngOnInit(): void {
    this.fullName=this._authenticationService.getUserFullName();
this.getPermission();
this._permissionService.permissionList=this.permissionList;
console.log('ggg')
console.log(this._permissionService.permissionList)
console.log('ggg')
  }
<<<<<<< HEAD


=======
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
                console.log(this.permissionList)
                this._permissionService.permissionList=this.permissionList;
            }
        });
    });
    })
}
>>>>>>> ad971f58fc612059d1e5a77dd8bb89bf39bea49d
}


