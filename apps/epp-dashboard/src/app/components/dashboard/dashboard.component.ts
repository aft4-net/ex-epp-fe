import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../../../../../libs/common-services/Authentication.service';

@Component({
  selector: 'exec-epp-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
name:any
  constructor(private _authenticationService:AuthenticationService) { }

  ngOnInit(): void {
    this.name=this._authenticationService.getUserFullName();
  }


}


