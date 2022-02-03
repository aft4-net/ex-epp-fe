import { Component, OnInit, Input, AfterViewInit, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { PermissionListService } from 'libs/common-services/permission.service';
import { NzNotificationPlacement, NzNotificationService } from 'ng-zorro-antd/notification';
import { ApprovalEntity, ApprovalStatus, TimeEntry, Timesheet, TimesheetApproval, TimesheetConfigResponse, TimesheetConfiguration } from '../../../models/timesheetModels';
import { TimesheetValidationService } from '../../services/timesheet-validation.service';
import { TimesheetService } from '../../services/timesheet.service';
import { TimesheetConfigurationStateService } from '../../state/timesheet-configuration-state.service';
import { TimesheetStateService } from '../../state/timesheet-state.service';
import { UserPermissionStateService } from '../../state/user-permission-state.service';
import { startingDateCriteria } from '../timesheet-detail/timesheet-detail.component';

@Component({
  selector: 'app-timesheet-header',
  templateUrl: './timesheet-header.component.html',
  styleUrls: ['./timesheet-header.component.scss']
})
export class TimesheetHeaderComponent implements OnInit, OnChanges {
  @Input() timesheetConfig: TimesheetConfiguration | null = this.timesheetConfigStateService.defaultTimesheetConfig;
  @Input() timesheet: Timesheet | null = null;
  @Input() timeEntries: TimeEntry[] | null = null;
  @Input() timesheetApprovals: TimesheetApproval[] | null = null;
  @Input() weekFirstDate: Date | null = null;
  @Input() weekLastDate: Date | null = null;
  @Input() isApproved = false;
  @Input() approval = false;
  resubmitClicked: boolean | undefined;
  weeklyTotalHours: number = 0;
  configWeeklyTotalHour: number = 0;
  startingDateCriteria = startingDateCriteria

  validForApproal: boolean = false;
  btnText: string = "Request for Approval";
  timeSheetStatus = "not-submitted-enable";
  notSubmittedTooltip = "";
  toolTipColor = "red";
  toolTipText = "The time is passed total hour"
  rejectedTimesheet: TimesheetApproval | null = null;

  title$ = this.timesheetStateService.timesheetPageTitle$;

  constructor(
    private timesheetService: TimesheetService,
    private notification: NzNotificationService,
    private timesheetValidationService: TimesheetValidationService,
    private timesheetConfigStateService: TimesheetConfigurationStateService,
    private timesheetStateService: TimesheetStateService,
    private readonly _permissionService: PermissionListService
  ) { }

  ngOnInit(): void {
    if (this.weekFirstDate && this.weekLastDate) {
      this.timesheetValidationService.fromDate = new Date(this.weekFirstDate);
      this.timesheetValidationService.toDate = new Date(this.weekLastDate);
    }

    if (this.timeEntries) {
      this.weeklyTotalHours = this.timeEntries?.map(timeEntry => timeEntry.Hour).reduce((prev, next) => prev + next, 0);
    }
    else {
      this.weeklyTotalHours = 0;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.weekFirstDate && this.weekLastDate) {
      this.timesheetValidationService.fromDate = new Date(this.weekFirstDate);
      this.timesheetValidationService.toDate = new Date(this.weekLastDate);
    }

    if (this.timeEntries) {
      this.weeklyTotalHours = this.timeEntries?.map(timeEntry => timeEntry.Hour).reduce((prev, next) => prev + next, 0);
    }
    else {
      this.weeklyTotalHours = 0;
    }
    this.checkForSubmittedForApproal();
  }

  checkForSubmittedForApproal() {
    let timesheetConfig = this.timesheetConfig ?? this.timesheetConfigStateService.defaultTimesheetConfig;

    if (this.timesheetApprovals && this.timesheetApprovals.length > 0) {
      for (let i = 0; i < this.timesheetApprovals.length; i++) {
        if (this.timesheetApprovals[i].Status !== Object.values(ApprovalStatus)[1].valueOf()) {
          break;
        }

        if (i === this.timesheetApprovals.length - 1) {
          this.btnText = "Approved";
          this.timeSheetStatus = "submitted-class";
          return;
        }
      }

      for (let i = 0; i < this.timesheetApprovals.length; i++) {
        if (this.timesheetApprovals[i].Status === Object.values(ApprovalStatus)[2].valueOf() || this.resubmitClicked || this.timesheetApprovals[i].Status === Object.values(ApprovalStatus)[0].valueOf()) {
          this.btnText = "Resubmit Timesheet";
          if (this.timesheetValidationService.isValidForApproval(this.timeEntries ?? [], timesheetConfig)) {
            this.validForApproal = true;
            this.timeSheetStatus = "not-submitted-enable";
            this.notSubmittedTooltip = "";
          }
          else {
            this.validForApproal = false;
            this.timeSheetStatus = "not-submitted-disable";
            this.notSubmittedTooltip = `Please fill in your working days`;
            if (timesheetConfig.WorkingHours.Min > 0) {
              this.notSubmittedTooltip += ` with a minimum hour of ${timesheetConfig.WorkingHours.Min}`;
            }
          }
          break;
        }

      }
    }
    else {
      this.checkIfValidForApproval();
    }
  }

  checkIfValidForApproval() {
    let timesheetConfig = this.timesheetConfig ?? this.timesheetConfigStateService.defaultTimesheetConfig;

    if (this.timesheetValidationService.isValidForApproval(this.timeEntries ?? [], timesheetConfig)) {
      this.validForApproal = true;
      this.btnText = "Request for Approval";
      this.timeSheetStatus = "not-submitted-enable";
      this.notSubmittedTooltip = "";
    }
    else {
      this.validForApproal = false;
      this.btnText = "Request for Approval";
      this.timeSheetStatus = "not-submitted-disable";
      this.notSubmittedTooltip = `Please fill in your working days`;
      if (timesheetConfig.WorkingHours.Min > 0) {
        this.notSubmittedTooltip += ` with a minimum hour of ${timesheetConfig.WorkingHours.Min}`;
      }
    }
  }

  onRequestForApproval() {
    let timesheetConfig = this.timesheetConfig ?? this.timesheetConfigStateService.defaultTimesheetConfig;

    if (!this.timesheet) {
      return;
    }

    if (!this.timeEntries || this.timeEntries.length === 0) {
      return;
    }

    if (this.timesheetValidationService.isValidForApproval(this.timeEntries, timesheetConfig)) {
      if (this.timesheetApprovals) {
        for (let i = 0; i < this.timesheetApprovals.length; i++) {
          if (this.timesheetApprovals[i].Status === Object.values(ApprovalStatus)[2].valueOf()) {
            this.rejectedTimesheet = this.timesheetApprovals[i];
          }
          if (this.rejectedTimesheet) {
            const temp = {
              TimesheetId: this.rejectedTimesheet.TimesheetId,
              ProjectId: this.rejectedTimesheet.ProjectId,
              ApprovalStatus: Object.values(ApprovalStatus)[0].valueOf()
            } as unknown as ApprovalEntity;

            this.timesheetService.updateTimesheetApproval(temp).subscribe(response => {
              if (this.timesheet) {
                this.timesheetStateService.getTimeSheetApproval(this.timesheet.Guid);
              }
            }, error => {

            });

            this.checkForSubmittedForApproal();
            this.createNotification("info", "Timesheet resubmitted for approval", "bottomRight");
          }
        }
      }
      else {
        this.timesheetService.addTimeSheetApproval(this.timesheet.Guid).subscribe(response => {
          if (this.timesheet) {
            this.timesheetStateService.getTimeSheetApproval(this.timesheet?.Guid)
          }
        }, error => {

        });

        this.createNotification("info", "Timesheet requested for approval", "bottomRight");
      }
    }
  }

  getConfigWeeklyTotalHours() {
    const numberOfDays = this.timesheetConfig?.WorkingDays?.length ?? 0;
    const workingHourPerDay = this.timesheetConfig?.WorkingHours?.Min ?? 0;

    return numberOfDays * workingHourPerDay;
  }

  createNotification(type: string, message: string, position?: NzNotificationPlacement) {

    if (this.startingDateCriteria.isBeforeThreeWeeks) {
      return;
    }
    if (!position) {
      position = 'topRight';
    }

    switch (type.toLowerCase()) {

      case 'success':
        this.notification.success('', message, { nzPlacement: position });
        break;
      case 'info':
        this.notification.info('', message, { nzPlacement: position });
        break;
      case 'warning':
        this.notification.warning('', message, { nzPlacement: position });
        break;
      case 'error':
        this.notification.error('', message, { nzPlacement: position });

        break;
    }
  }
  authorize(key: string){
    return this._permissionService.authorizedPerson(key);
  }
}
