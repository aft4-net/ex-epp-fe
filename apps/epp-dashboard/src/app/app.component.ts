import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from './../../../../libs/common-services/Authentication.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'exec-epp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'epp-dashboard';
  isLogin = false;
  constructor(
    private _authenticationService: AuthenticationService,
    private router: Router,
    private actviatedUrl: ActivatedRoute
  ) {
    switch (window.location.href.split('?')[0].toLowerCase()) {
      case `${environment.redirectUrl}/usermanagement/forgotpassword`.toLowerCase():
        return;
      case `${environment.redirectUrl}/usermanagement/resetpassword`.toLowerCase():
        return;
      default: {
        this.isLogin = _authenticationService.loginStatus();
        if (!this.isLogin) {
          // window.location.reload();
          this.router.navigateByUrl('usermanagement');
        }
      }
    }
  }
}
