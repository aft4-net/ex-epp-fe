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
  localData = JSON.parse(localStorage.getItem('loggedInUserInfo') ?? '{}');

  thePosition : any;
  userEmail=window.sessionStorage.getItem('username')+'';
  userEmails = JSON.parse(localStorage.getItem('loggedInUserInfo') ?? '{}');
  constructor(private _intialdataService: IntialdataService,private _authenticationService:AuthenticationService,private _router:Router,public _commonData:CommonDataService,private _permissionService:PermissionListService )  { 
   this.fullName = (this.userEmails.FirstName) + (' ') + (this.userEmails.MiddleName)
    const namearray=this.fullName.split(' ');
    this.fullName=namearray[0] + namearray[0];
    this.date = new Date();
    }
update(){
  this.actions='Update_Employee'
}

getUsers() {
  this._authenticationService.getUser(this.userEmails.Email);

  setTimeout(() => {
    this.thePosition = this._authenticationService.position;
  }, 1000);
}

  ngOnInit(): void {
    this.getUsers();
    this.getUser();
    this._commonData.getPermission();   
  }
  getUser(){
    this._intialdataService.getUser( this.userEmails.Email).subscribe((response:any)=>{
      this.thePosition=response.EmployeeOrganization.Role.Name;
      this.fullName = (this.userEmails.FirstName) + (' ') + (this.userEmails.LastName);
    });
 }


  routetoResourceManagement(){
    this._authenticationService.setFromViewProfile2();
    this._router.navigate(['resourcemanagement']);
  }

   authorize(key:string){

    
     return this._permissionService.authorizedPerson(key);
   }

}


