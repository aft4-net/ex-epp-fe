import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { PersonalInformation } from '../../models/personal-information';
import { NotificationBar } from '../../utils/feedbacks/notification';
import { AccountService } from '../user/account.service';

@Injectable({ providedIn: 'root' })
export class aoiGuard implements CanActivate {
    constructor(private router: Router, private accountService: AccountService, private notification: NotificationBar,) {}
    generalInfo = {} as PersonalInformation;
    profile = <PersonalInformation>{}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.accountService.userInfo;

            this.accountService.generalInfo(user.Email).subscribe(res => {
              this.generalInfo = res.Data;
              this.profile = this.generalInfo;
              if (!this.profile.phoneNo) {
                  this.router.navigateByUrl('application/personal-information');
                  this.notification.showNotification({
                    type: 'error',
                    content: 'Personal information form should be filled in first!!',
                    duration: 5000,
                  });
                  return false;
                }
                return false;
            }, error =>{
              console.log(error);
              this.router.navigateByUrl('application/personal-information');
              this.notification.showNotification({
                type: 'error',
                content: error,
                duration: 5000,
              });
              return false;
            });
        return true;
    }
}