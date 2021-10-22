import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  logoUrl :string = 'assets/logos/main-logo.png'  
  constructor() { }

  ngOnInit(): void {
  }

}
