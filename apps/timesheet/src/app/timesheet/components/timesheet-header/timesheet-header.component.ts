import { Component, OnInit, Input } from '@angular/core';
import { TimeEntry, Timesheet, TimesheetConfigResponse, TimesheetConfiguration } from '../../../models/timesheetModels';
import { TimesheetValidationService } from '../../services/timesheet-validation.service';
import { TimesheetService } from '../../services/timesheet.service';

@Component({
  selector: 'app-timesheet-header',
  templateUrl: './timesheet-header.component.html',
  styleUrls: ['./timesheet-header.component.scss']
})
export class TimesheetHeaderComponent implements OnInit {
  @Input() timesheet: Timesheet | null = null;
  @Input() timeEntries: TimeEntry[] | null = null;
  @Input() weeklyTotalHours: number = 0;

  constructor(private timesheetService: TimesheetService, private timesheetValidationService: TimesheetValidationService) { }

  ngOnInit(): void {
  }

  onRequestForApproval() {
    if (!this.timesheet) {
      return;
    }

    this.timesheetService.getTimeSheetConfiguration().subscribe(response => {
      let timesheetConfig: TimesheetConfiguration = response ? response : {
        WorkingDays: ["Monday", "Thursday", "Wednesday", "Thursday", "Friday", "Starday", "Sunday"],
        WorkingHour: 0
      };

      if (!this.timeEntries || this.timeEntries.length === 0) {
        return;
      }

      this.timesheetValidationService.isValidForApproval(this.timeEntries, timesheetConfig);

    }, error => {

    });

    this.timesheetService.addTimeSheetApproval(this.timesheet.Guid).subscribe();
  }
}
