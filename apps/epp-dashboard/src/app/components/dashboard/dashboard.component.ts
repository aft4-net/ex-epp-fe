import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../../../../../libs/common-services/Authentication.service';
import {PermissionService} from './../../../../../../libs/common-services//permission.service';
import { IntialdataService } from '../../services/intialdata.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
@Component({
  selector: 'exec-epp-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  date:any;
  fullName:any
  thePosition : any;
  permissionList:any[]=[ ];
  modulePermission:any[]=[];
  constructor(private _intialdataService: IntialdataService,private _authenticationService:AuthenticationService,private _router:Router,private _permissionService:PermissionService )  { 
    this.fullName=_authenticationService.getUserFullName();
    const namearray=this.fullName.split(' ');
    this.fullName=namearray[0];
    this.date = new Date();
    //this.thePosition = _authenticationService.position;
  
  }

  ngOnInit(): void {
   
    this.getUser();
    this.getPermission();
    this._permissionService.permissionList=this.permissionList;
   
  }
  getUser(){
  //  this._authenticationService.getUser(this.uemail);
   setTimeout(() => {
     this.thePosition = this._authenticationService.position;
   }, 1000); 
 }

  routetoResourceManagement(){
    this._authenticationService.setFromViewProfile2();
    this._router.navigate(['resourcemanagement']);
  }

   authorize(key:string){
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


