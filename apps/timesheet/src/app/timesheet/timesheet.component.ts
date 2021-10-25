import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss']
})
export class TimesheetComponent implements OnInit {
  drawerVisible = false;

  constructor() { }

  ngOnInit(): void {
  }

  dateColumnClicked() {
    this.drawerVisible = true;
  }

  closeTimesheetDrawer() {
    this.drawerVisible = false;
  }

}
