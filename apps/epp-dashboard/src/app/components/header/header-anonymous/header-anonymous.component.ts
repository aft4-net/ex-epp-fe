import { Component, OnInit } from '@angular/core';
import { environment } from 'libs/environments/environment';

@Component({
  selector: 'exec-epp-header-anonymous',
  templateUrl: './header-anonymous.component.html',
  styleUrls: ['./header-anonymous.component.scss']
})
export class HeaderAnonymousComponent implements OnInit {

  constructor() { }
  redirectUrl = environment.redirectUri;

  ngOnInit(): void {
  }

}
