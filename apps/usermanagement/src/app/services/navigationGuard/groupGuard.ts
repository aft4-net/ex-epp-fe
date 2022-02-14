import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { PersonalInformation } from '../../models/personal-information';
import { NotificationBar } from '../../utils/feedbacks/notification';
import { AccountService } from '../../features/Services/logIn/account.service';

@Injectable({ providedIn: 'root' })
export class educationGuard implements CanActivate {
    constructor(private router: Router, private accountService:AccountService, 
    private notification: NotificationBar) {}
      
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):any {
        const user = this.accountService.userInfo;

 
      
        return true;

}
}