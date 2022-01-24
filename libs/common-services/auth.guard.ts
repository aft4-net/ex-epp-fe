import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

import { AuthenticationService } from './Authentication.service';
import { CommonDataService } from './commonData.service';
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
    private commonService: CommonDataService,
    private permission: PermissionListService,
  ) {}

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
      console.log('hhhhhhhhhhhhhhhhhhhhh', userRole);
      // route.data.role.indexOf(userRole) === -1
      if (!userRole) {
        this.router.navigate(['']);
        return false;
      }
      return true;
    }

    this.router.navigate(['']);
    return false;
  }
}
