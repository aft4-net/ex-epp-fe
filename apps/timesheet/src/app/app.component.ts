import { Component, OnInit } from '@angular/core';
import { UserService } from './timesheet/services/user.service';

const employeeId = "279f7d9c-425e-4691-8eff-716ba6fd6524"; //Yosef
const supervisorId = "1b38f8be-e7dc-495f-ace3-c87f2332b063"; // Tariku
    
@Component({
  selector: 'exec-epp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'timesheet';

  constructor(private userService: UserService) {
    localStorage.setItem("userId", employeeId.toString());
    localStorage.setItem("supervisorId", employeeId.toString());
  }

  ngOnInit(): void {
    // let userId = "c0b74644-b81a-4c33-a6b0-672ba4bc8cb2";
    // localStorage.setItem("userId", userId.toString());
    /*
    this.userService.loadCurrentUser().subscribe(response => {
      let index = Math.floor(response.length * Math.random());
      let userId = response[index].id;
      localStorage.setItem("userId", userId.toString());
    });
    //*/
  }
}
