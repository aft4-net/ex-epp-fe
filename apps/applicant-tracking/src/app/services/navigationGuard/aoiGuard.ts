import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { PersonalInformation } from '../../models/personal-information';
import { AccountService } from '../user/account.service';

@Injectable({ providedIn: 'root' })
export class aoiGuard implements CanActivate {
    constructor(private router: Router, private accountService: AccountService) {}
    generalInfo = {} as PersonalInformation[];
    profile = <PersonalInformation>{}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.accountService.userInfo;

            this.accountService.generalInfo(user.email).subscribe(res => {
              this.generalInfo = res.Data[0];
              this.profile = this.generalInfo[0];
              if (this.profile.phoneNo) {
                  this.router.navigateByUrl('application/personal-info');
                }
            }, error =>{
              console.log(error);
            });
        return false;
    }
}