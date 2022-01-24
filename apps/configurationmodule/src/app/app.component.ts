import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'exec-epp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'configurationmodule';
  isLogin=true;
  route='';
  constructor( private router: Router){

  }
  activePath(routePath: string) {
    if (this.route === '') this.route = this.router.url;
    return this.route == routePath;
  }

}
