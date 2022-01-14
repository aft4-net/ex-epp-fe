import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import {AuthenticationService} from './../../../../../../libs/common-services/Authentication.service'

@Component({
  selector: 'exec-epp-page-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
fullName:any
thefullName = "";
  constructor(private authService: MsalService,private _authenticationService:AuthenticationService) { 
    this.fullName=_authenticationService.getUserFullName();
    this.thefullName = this.fullName;
    const namearray=this.fullName.split(' ');
    this.fullName=namearray[0][0].toUpperCase()+namearray[1][0].toUpperCase();
  }

  ngOnInit(): void {
    
  }

  logout() {
    this._authenticationService.loginCount=0;
    this.authService.logout();
      window.sessionStorage.clear();
     window.location.reload();

  }

}
