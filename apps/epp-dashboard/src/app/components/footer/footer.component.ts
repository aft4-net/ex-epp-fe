import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'exec-epp-page-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  year : any;
  constructor() 
  { // OK
  }

  ngOnInit(): void {
    this.year = new Date().getFullYear();
  }

}
