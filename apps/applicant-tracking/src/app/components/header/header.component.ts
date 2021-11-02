import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/user/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  logoUrl :string = 'assets/logos/main-logo.png' ;
  user : any ;
  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.user = this.accountService.userInfo;
  }

  logout(){
    this.accountService.signOut();
  }

}
