import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { Observable } from 'rxjs';
import { AuthenticationService } from './../../../../../../libs/common-services/Authentication.service';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { environment } from 'libs/environments/environment';
import { IntialdataService } from '../../services/intialdata.service';

@Component({
  selector: 'exec-epp-page-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  uemail: any;
  fullName: any;
  firsName:any;
  middleName:any
  thefullName = '';
  theGroup: any;
  redirectUrl = environment.redirectUri;
  loggedInUser = JSON.parse(
    localStorage.getItem('loggedInUserInfo') ?? ''
  );
  constructor(
    private authService: MsalService,
    private _authenticationService: AuthenticationService,
    private _router: Router,
    private _intialdataService: IntialdataService
  ) {
    //this.fullName = this._intialdataService.getUser( this.loggedInUser.fullName)
   // this.fullName = _authenticationService.getUserFullName();
   this.fullName = (this.loggedInUser.FirstName) + (' ') + (this.loggedInUser.MiddleName)
    this.thefullName = this.fullName;
    console.log(this.thefullName + 'ABCDEFG');
    this.firsName = this.loggedInUser.FirstName ;
    this.middleName = this.loggedInUser.MiddleName;
    const namearray = this.firsName.split();
    const namearrays = this.middleName.split();
   //this.fullName = namearray[0][0].toUpperCase() + namearray[1][0].toUpperCase();
   this.firsName = namearray[0][0].toUpperCase();
   this.middleName = namearrays[0][0].toUpperCase();
   this.fullName = this.firsName + ' '+ this.middleName
    this.uemail = _authenticationService.getUserFullName();
    //console.log(this.uemail + 'PPPPPPPPP');
  }
  getUser() {
    this._authenticationService.getUser(this.uemail);
    console.log(this.uemail);
    setTimeout(() => {
      this.theGroup = this._authenticationService.position;
    }, 1000);
  }

  ngOnInit(): void {
    this.getUser();
  }
  routetoResourceManagement() {
    this._authenticationService.setFromViewProfile();
    this._router.navigate(['resourcemanagement']);
  }

  logout() {
    this._authenticationService.loginCount = 0;
    this.authService.logout();
    window.sessionStorage.clear();
    window.location.reload();
  }
}
