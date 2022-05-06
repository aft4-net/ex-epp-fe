import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationService } from './../../../../../../libs/common-services/Authentication.service';
import { LoadingSpinnerService} from '../../../../../../libs/common-services/loading-spinner.service';
import { environment } from './../../../environments/environment'
import { IntialdataService } from '../../services/intialdata.service';
import { NzDrawerPlacement } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'exec-epp-page-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLogin = false;
  uemail: any;
  fullName: any;
  firstName:any;
  middleName:any;
  thefullName = '';
  theGroup: any;
  redirectUrl = environment.redirectUrl;
  loggedInUser = JSON.parse(
    localStorage.getItem('loggedInUserInfo') ?? ''
  );
  visible = false;
  placement: NzDrawerPlacement = 'left';

  constructor(
    private authService: MsalService,
    private _authenticationService: AuthenticationService,
    private _router: Router,
    private _intialdataService: IntialdataService,
    private loadingSpinnerService: LoadingSpinnerService,

  ) {
   this.fullName =this.loggedInUser.FullName; // (this.loggedInUser.FirstName) + (' ') + (this.loggedInUser.MiddleName?this.loggedInUser.MiddleName:this.loggedInUser.LastName)
    this.thefullName = this.fullName;
  //   this.firstName = this.loggedInUser.FirstName ;
  //   this.middleName = this.loggedInUser.MiddleName&&this.loggedInUser.MiddleName!==''?this.loggedInUser.MiddleName:this.loggedInUser.LastName;
  //   const namearray = this.firstName.split();
  //   const namearrays = this.middleName.split();
  //  this.firstName = namearray[0][0].toUpperCase();
  //  this.middleName = namearrays[0][0].toUpperCase();
  //  this.fullName = this.firstName + ' '+ this.middleName
    this.firstName = this.fullName.split(" ")[0];
    this.middleName = this.fullName.split(" ")[1];
    const namearray = this.firstName.split();
    const namearrays = this.middleName.split();
    this.firstName = namearray[0][0].toUpperCase();
    this.middleName = namearrays[0][0].toUpperCase();
    this.fullName = this.firstName + ' ' + this.middleName;

    this.uemail = _authenticationService.getUserFullName();
  }
  getUser() {
    this._authenticationService.getUser(environment.apiUrl, this.uemail);
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

  // signout() {
  //   this._authenticationService.signOut();
  //   this._router.navigate(['usermanagement/logIn']);

  // }

  openSidenav(): void {
    this.visible = true;
  }

  closeSidenav(val: boolean): void {
    this.visible = val;
  }


}
