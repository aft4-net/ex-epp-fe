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
    let userId = "a905649a-5627-4b30-8ea4-d83f5b001838";
    localStorage.setItem("userId", userId);

    let supervisorId = "1b38f8be-e7dc-495f-ace3-c87f2332b063";
    localStorage.setItem("supervisorId", supervisorId);
  }

  ngOnInit(): void {

  }
}
