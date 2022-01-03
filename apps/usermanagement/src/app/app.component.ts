import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, provideRoutes } from '@angular/router';
import { MsalService } from '@azure/msal-angular';

interface RouteLinks {
  name: string;
  link: string;
}

@Component({
  selector: 'exec-epp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  route = '';


checker1= false;
counter = 1;

//user = this.accountService.userInfo;

activePath(routePath: string) {
  if (this.route === '') this.route = this.router.url;
  return this.route == routePath;
}

constructor(private router: Router, private authService: MsalService){}

ngOnInit(): void {
}

isLoggedIn(): boolean {
  return this.authService.instance.getActiveAccount() != null;
}
}

