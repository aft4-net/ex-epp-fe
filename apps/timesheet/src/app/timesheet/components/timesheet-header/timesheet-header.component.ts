import { Component, OnInit,Input } from '@angular/core';
import { Timesheet } from '../../../models/timesheetModels';
import { TimesheetService } from '../../services/timesheet.service';

@Component({
  selector: 'app-timesheet-header',
  templateUrl: './timesheet-header.component.html',
  styleUrls: ['./timesheet-header.component.scss']
})
export class TimesheetHeaderComponent implements OnInit {
  @Input() timesheet: Timesheet | null = null;
  @Input() weeklyTotalHours: number = 0;

  constructor(private timesheetService: TimesheetService) { }

  ngOnInit(): void {
  }

  onRequestForApproval() {
    if(!this.timesheet){
      return;
    }
    
    console.log("timesheet Approval");
    console.log(this.timesheet);

    this.timesheetService.addTimeSheetApproval(this.timesheet.Guid).subscribe();
  }
}
