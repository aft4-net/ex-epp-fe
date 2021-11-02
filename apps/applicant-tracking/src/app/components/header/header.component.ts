import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../services/user/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  logoUrl :string = 'assets/logos/main-logo.png'  
  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
  }
  signout() {
    this.accountService.signOut();
    this.router.navigate(['/user/signin']);

  }

}
