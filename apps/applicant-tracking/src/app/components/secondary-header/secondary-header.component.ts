import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from '../../services/user/account.service';

@Component({
  selector: 'app-secondary-header',
  templateUrl: './secondary-header.component.html',
  styleUrls: ['./secondary-header.component.css']
})
export class SecondaryHeaderComponent implements OnInit {
  logoUrl = 'assets/logos/secondary-logo.svg';

  constructor(private accountService: AccountService, private router: Router) { }
  user : any ;
 

  ngOnInit(): void {
    this.user = this.accountService.userInfo;
    //console.log(this.user);
  }

  logout(){
    this.accountService.signOut();
  }
  signout() {
    this.accountService.signOut();
    this.router.navigate(['/user/signin']);

  }

}
