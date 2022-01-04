import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { MsalService } from '@azure/msal-angular';
import { AuthenticationService } from 'libs/common-services/Authentication.service';
=======
import { AuthenticationService } from './../../../../../../libs/common-services/Authentication.service';
>>>>>>> 7261c7540e2b85bb0c335918a85551a5d0e9683e

@Component({
  selector: 'exec-epp-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
<<<<<<< HEAD

  fullName:any
  constructor(private authService: MsalService,private _authenticationService:AuthenticationService) { 
    this.fullName=_authenticationService.getUserFullName();
    const namearray=this.fullName.split(' ');
    this.fullName=namearray[0];

=======
name:any
  constructor(private _authenticationService:AuthenticationService) { }

  ngOnInit(): void {
    this.name=this._authenticationService.getUserFullName();
  }
>>>>>>> 7261c7540e2b85bb0c335918a85551a5d0e9683e


}
ngOnInit(): void {
    
}
}
