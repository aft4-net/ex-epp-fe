import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-timesheet-header',
  templateUrl: './timesheet-header.component.html',
  styleUrls: ['./timesheet-header.component.scss']
})
export class TimesheetHeaderComponent implements OnInit {
  @Input() weeklyTotalHours: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
