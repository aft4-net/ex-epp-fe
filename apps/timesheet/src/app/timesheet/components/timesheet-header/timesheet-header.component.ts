import { Component, OnInit, Input, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { TimeEntry, Timesheet, TimesheetApproval, TimesheetConfigResponse, TimesheetConfiguration } from '../../../models/timesheetModels';
import { TimesheetValidationService } from '../../services/timesheet-validation.service';
import { TimesheetService } from '../../services/timesheet.service';

@Component({
  selector: 'app-timesheet-header',
  templateUrl: './timesheet-header.component.html',
  styleUrls: ['./timesheet-header.component.scss']
})
export class TimesheetHeaderComponent implements OnInit, OnChanges {
  @Input() timesheetConfig: TimesheetConfiguration = {
    WorkingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    WorkingHour: 0
  };
  @Input() timesheet: Timesheet | null = null;
  @Input() timeEntries: TimeEntry[] | null = null;
  @Input() timesheetApprovals: TimesheetApproval[] | null = null;
  @Input() weekFirstDate: Date | null = null;
  @Input() weekLastDate: Date | null = null;
  @Input() weeklyTotalHours: number = 0;
  @Input() isSubmitted: boolean | undefined;

  validForApproal: boolean = false;
  btnText: string = "Request for Approval";
  timeSheetStatus = "not-submitted-enable";
  notSubmittedTooltip = "";

  constructor(private timesheetService: TimesheetService, private timesheetValidationService: TimesheetValidationService) { }

  ngOnInit(): void {
    if (this.weekFirstDate && this.weekLastDate) {
      this.timesheetValidationService.fromDate = this.weekFirstDate;
      this.timesheetValidationService.toDate = this.weekLastDate;
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.checkForSubmittedForApproal();
  }

  checkForSubmittedForApproal() {
    if (this.timesheetApprovals && this.timesheetApprovals.length > 0) {
      this.btnText = "Submitted";
      this.timeSheetStatus = "submitted-class";
    }
    else {
      this.checkIfValidForApproval();
    }
  }

  checkIfValidForApproval() {
    if (this.timesheetValidationService.isValidForApproval(this.timeEntries ?? [], this.timesheetConfig)) {
      this.validForApproal = true;
      this.btnText = "Request for Approval";
      this.timeSheetStatus = "not-submitted-enable";
      this.notSubmittedTooltip = "";
    }
    else {
      this.validForApproal = false;
      this.btnText = "Request for Approval";
      this.timeSheetStatus = "not-submitted-disable";
      this.notSubmittedTooltip = `Please fill in your working days ${this.timesheetConfig.WorkingDays} with a minimum hour of ${this.timesheetConfig.WorkingHour}`;
    }
  }

  onRequestForApproval() {
    if (!this.timesheet) {
      return;
    }

    if (!this.timeEntries || this.timeEntries.length === 0) {
      return;
    }

    if (this.timesheetValidationService.isValidForApproval(this.timeEntries, this.timesheetConfig)) {
      this.timesheetService.addTimeSheetApproval(this.timesheet.Guid).subscribe(response => {
        this.timesheetApprovals = response ?? [];
        this.checkForSubmittedForApproal();
      }, error => {

      });
    }
  }
}
