import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationService } from './../../../../../../libs/common-services/Authentication.service';
import { LoadingSpinnerService} from '../../../../../../libs/common-services/loading-spinner.service';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { environment } from 'libs/environments/environment';
import { IntialdataService } from '../../services/intialdata.service';

@Component({
  selector: 'exec-epp-page-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLogin = false;
  uemail: any;
  fullName: any;
  firsName:any;
  middleName:any;
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
    private _intialdataService: IntialdataService,
    private loadingSpinnerService: LoadingSpinnerService,

  ) {
   this.fullName = (this.loggedInUser.FirstName) + (' ') + (this.loggedInUser.MiddleName)
    this.thefullName = this.fullName;
    this.firsName = this.loggedInUser.FirstName ;
    this.middleName = this.loggedInUser.MiddleName;
    const namearray = this.firsName.split();
    const namearrays = this.middleName.split();
   this.firsName = namearray[0][0].toUpperCase();
   this.middleName = namearrays[0][0].toUpperCase();
   this.fullName = this.firsName + ' '+ this.middleName

    this.uemail = _authenticationService.getUserFullName();
  }
  getUser() {
    this._authenticationService.getUser(this.uemail);
    setTimeout(() => {
      this.theGroup = this._authenticationService.position;
    }, 1000);
  }

  ngOnInit(): void {
    this.getUser();
    this.isLogin = this._authenticationService.loginStatus();

  }
  routetoResourceManagement() {
    this.loadingSpinnerService.messageSource.next(true);
    this._authenticationService.setFromViewProfile();
    this._router.navigate(['/resourcemanagement/profile']);
    setTimeout(() => {   
    this.loadingSpinnerService.messageSource.next(false);

    }, 1500);

    /*this.loadingSpinnerService.messageSource.subscribe((val)=>{
      if(val == true){
      this._authenticationService.setFromViewProfile();
      this._router.navigate(['resourcemanagement']);
      }

    });*/



  }

  logout() {
    this._authenticationService.loginCount = 0;
    localStorage.clear();
    //this.authService.logout();
    window.sessionStorage.clear();
    window.location.reload();
  }

  signout() {
    this._authenticationService.signOut();
    this._router.navigate(['usermanagement/logIn']);

  }
}
