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
  userEmails = JSON.parse(localStorage.getItem('loggedInUserInfo') ?? '{}');
  constructor(private _intialdataService: IntialdataService,private _authenticationService:AuthenticationService,private _router:Router,public _commonData:CommonDataService,private _permissionService:PermissionListService )  { 
   // this.fullName=_authenticationService.getUserFullName();
   // this.fullName = _authenticationService.getUsersName();
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
    //this.getFullName();
    this._commonData.getPermission();   
  }
  getUser(){
    console.log('response1'+ this.userEmails.Email)
    console.log('response2'+ this.userEmail )
    this._intialdataService.getUser( this.userEmails.Email).subscribe((response:any)=>{
      console.log('response4'+ this.userEmails.fullName)
      this.thePosition=response.EmployeeOrganization.JobTitle;
      this.fullName = response.name;
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


