import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';

import { AuthenticationService } from './Authentication.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PermissionListService } from './permission.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private permission: PermissionListService
  ) {
    this.currentPath();
  }
  currentPath() {
    return this.router.url;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let url: string = state.url;
    return this.checkUserLogin(next, url);
  }

  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
    if (this.authService.isLogin()) {
      const userRole = this.permission.authorizedPerson(route.data.role);

      // route.data.role.indexOf(userRole) === -1
      if (!userRole) {
      // this was commented out b/c there is a problem with the list it is returning
       //this.router.navigate(['']);
       // return false;
      }
      return true;
    }
    this.router.navigate(['/usermanagement/sign_in']);
    return false;
  }
}
