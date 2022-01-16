import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../../../../../libs/common-services/Authentication.service';
import {PermissionService} from './../../../../../../libs/common-services//permission.service';
import { IntialdataService } from '../../services/intialdata.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'exec-epp-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

<<<<<<< HEAD

  thePosition : any;

  fullName:any;
  date:any;
  permissionList:any[]=[ ];
  modulePermission:any[]=[];
  constructor(private _intialdataService: IntialdataService,private _authenticationService:AuthenticationService,private _permissionService:PermissionService)  { 
    setTimeout(() => {
    this.fullName=_authenticationService.getUserFullName();
    const namearray=this.fullName.split(' ');

    this.fullName=namearray[0];  
    this.date = new Date();
      this.thePosition = _authenticationService.position;
    }, 500);

=======
  date:any;
  fullName:any
  permissionList:any[]=[ ];
  modulePermission:any[]=[];
  constructor(private _intialdataService: IntialdataService,private _authenticationService:AuthenticationService,
    private _permissionService:PermissionService, )  { 
    this.fullName=_authenticationService.getUserFullName();
    const namearray=this.fullName.split(' ');
    this.fullName=namearray[0];
    this.date = new Date();
   
 
>>>>>>> origin
  }

  ngOnInit(): void {
   

    this.getPermission();
    this._permissionService.permissionList=this.permissionList;
   
  }
   authorize(key:string){
     
    // return true;
     return this._permissionService.authorizedPerson(key);
   }
   getPermission(): void {
    console.log(" Hello There ");  
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


