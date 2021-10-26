import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthorizationCheck implements CanActivate {

 constructor(private router: Router) { }

 canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('loggedInUserInfo')) {
        return true;
    }

    this.router.navigate(['user/signin'], { queryParams: { returnUrl: state.url } });

    return false;
}

}