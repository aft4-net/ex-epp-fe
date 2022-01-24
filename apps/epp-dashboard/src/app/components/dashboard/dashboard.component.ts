import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../../../../../libs/common-services/Authentication.service';
import {PermissionListService} from './../../../../../../libs/common-services/permission.service';
import {CommonDataService} from './../../../../../../libs/common-services/commonData.service';
import { IntialdataService } from '../../services/intialdata.service';
import { Router } from '@angular/router';
@Component({
  selector: 'exec-epp-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  date:any;
  fullName:any
  actions='Add_Employee';
  thePosition : any;
  userEmail=window.sessionStorage.getItem('username')+'';
  constructor(private _intialdataService: IntialdataService,private _authenticationService:AuthenticationService,private _router:Router,public _commonData:CommonDataService,private _permissionService:PermissionListService )  { 
    this.fullName=_authenticationService.getUserFullName();
   // const namearray=this.fullName.split(' ');
   // this.fullName=namearray[0] + namearray[0];
    this.date = new Date();
    //this.thePosition = _authenticationService.position;
  
  }
update(){
  this.actions='Update_Employee'
}
  ngOnInit(): void {
   
    this.getUser();
    this._commonData.getPermission();   
  }
  getUser(){
    console.log('response'+this.userEmail)
    this._intialdataService.getUser(this.userEmail).subscribe((response:any)=>{
      this.thePosition=response.EmployeeOrganization.JobTitle;
      console.log('response22')
      console.log(this.thePosition)
      console.log('response')
    });
  //  setTimeout(() => {
  //    this.thePosition = this._authenticationService.position;
  //  }, 2000); 
 }

  routetoResourceManagement(){
    this._authenticationService.setFromViewProfile2();
    this._router.navigate(['resourcemanagement']);
  }

   authorize(key:string){

    
     return this._permissionService.authorizedPerson(key);
   }

}


