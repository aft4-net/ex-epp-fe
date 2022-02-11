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
   this.fullName = (this.loggedInUser.FirstName) + (' ') + (this.loggedInUser.LastName)
    this.thefullName = this.fullName;
    console.log(this.thefullName);
    this.fullName = this.loggedInUser.FirstName ;
    const namearray = this.fullName.split();
   //this.fullName = namearray[0][0].toUpperCase() + namearray[1][0].toUpperCase();
   this.fullName = namearray[0][0].toUpperCase();
    this.uemail = _authenticationService.getUserFullName();
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
