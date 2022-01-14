import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { Observable } from 'rxjs';
import {AuthenticationService} from './../../../../../../libs/common-services/Authentication.service'

@Component({
  selector: 'exec-epp-page-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  uemail : any;
fullName:any
thefullName = "";
 theGroup : any;

  constructor(private authService: MsalService,private _authenticationService:AuthenticationService) { 
    this.fullName=_authenticationService.getUserFullName();
    this.thefullName = this.fullName;
    const namearray=this.fullName.split(' ');
    this.fullName=namearray[0][0].toUpperCase()+namearray[1][0].toUpperCase();
    this.uemail=_authenticationService.getEmail();
  }
  getUser(){
    console.log("before: "+ this.uemail);
     this._authenticationService.getUser(this.uemail);
    setTimeout(() => {
      console.log("anotherone bites the desert " +  this._authenticationService.position);
      this.theGroup = this._authenticationService.position;
    }, 5000); 
  }

  ngOnInit(): void {
    this.getUser();
  }

  

  logout() {
    this._authenticationService.loginCount=0;
    this.authService.logout();
      window.sessionStorage.clear();
     window.location.reload();

  }

}
