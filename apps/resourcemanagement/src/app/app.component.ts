import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'exec-epp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'resourcemanagement';
  route =''

  constructor(private router: Router){
    this.route= router.url;
  }
}
