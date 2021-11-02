import { Component, OnInit } from '@angular/core';
import { UserService } from './timesheet/services/user.service';

@Component({
  selector: 'exec-epp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'timesheet';

  constructor(private userService: UserService) {

  }

  ngOnInit(): void {
    this.userService.loadCurrentUser().subscribe(response => {
      let index = Math.floor(response.length * Math.random());
      let userId = response[index].id;
      localStorage.setItem("userId", userId.toString());
    });
  }
}
