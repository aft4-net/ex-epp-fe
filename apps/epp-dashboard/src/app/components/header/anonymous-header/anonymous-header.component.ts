import { Component, OnInit } from '@angular/core';
import { environment } from 'libs/environments/environment';

@Component({
  selector: 'exec-epp-anonymous-header',
  templateUrl: './anonymous-header.component.html',
  styleUrls: ['./anonymous-header.component.scss']
})
export class AnonymousHeaderComponent implements OnInit {
  redirectUrl = environment.redirectUri;
  constructor() { }

  ngOnInit(): void {
  }

}
