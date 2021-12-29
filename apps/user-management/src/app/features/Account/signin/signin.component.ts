import { Component, OnInit } from '@angular/core';
import{MsalService} from '@azure/msal-angular';
import{AuthenticationResult} from '@azure/msal-browser'


@Component({
  selector: 'exec-epp-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],

})
export class SigninComponent implements OnInit {

constructor() {}
  
ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


}

