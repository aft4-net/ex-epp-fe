
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { TimeEntryEvent } from '../../../models/clickEventEmitObjectType';
import { ClickEventType } from '../../../models/clickEventType';
import { Project } from '../../../models/project';
import { ApprovalStatus, TimeEntry, TimesheetApproval } from '../../../models/timesheetModels';
import { TimesheetService } from '../../services/timesheet.service';
import { NzModalService } from "ng-zorro-antd/modal";
import { DayAndDateService } from '../../services/day-and-date.service';
import { startingDateCriteria } from '../timesheet-detail/timesheet-detail.component';
import { TimesheetStateService } from '../../state/timesheet-state.service';
import { ClientAndProjectStateService } from '../../state/client-and-projects-state.service';
import { PermissionListService } from '../../../../../../../libs/common-services/permission.service';

@Component({
  selector: 'app-project-name-palet',
  templateUrl: './project-name-palet.component.html',
  styleUrls: ['./project-name-palet.component.scss']
})
export class ProjectNamePaletComponent implements OnInit, OnChanges {
  @Output() projectNamePaletClicked = new EventEmitter<TimeEntryEvent>();
  @Output() paletEllipsisClicked = new EventEmitter<TimeEntryEvent>();
  @Output() editClicked = new EventEmitter<ClickEventType>();
  @Output() deleteClicked = new EventEmitter<ClickEventType>();
  @Input() timeEntry: TimeEntry = {} as TimeEntry;
  @Input() timesheetApproval: TimesheetApproval | null = null;
  project: Project = {} as Project;
  projectNamePaletClass = "project-name-palet"
  isVisible1 = false;
  clickEventType = ClickEventType.none;
  popoverVisible = false;
  startingDateCriteria = startingDateCriteria
  isApproved = false;
  isRejected = false;

  constructor(private timesheetService: TimesheetService,
    private readonly _dayAndDateService: DayAndDateService,
    private modal: NzModalService,
    private timesheetStateService: TimesheetStateService,
    private readonly _clientAndProjectStateService: ClientAndProjectStateService,
    private readonly _permissionService: PermissionListService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.timeEntry) {
      this.project = this._clientAndProjectStateService.getProjectById(this.timeEntry?.ProjectId as string)
    }
    if (this.timesheetApproval && this.timesheetApproval.Status === Object.values(ApprovalStatus)[1].valueOf()) {
      this.projectNamePaletClass = "project-name-palet-approved";
    } else {
      this.projectNamePaletClass = "project-name-palet";
    }
    if (this.timesheetApproval) {
      if (this.timesheetApproval.ProjectId == this.timeEntry?.ProjectId && this.timesheetApproval.Status === Object.values(ApprovalStatus)[2].valueOf()) {
        this.isRejected = true;
        this.isApproved = false;
      }
      else if (this.timesheetApproval.ProjectId == this.timeEntry?.ProjectId && this.timesheetApproval.Status === Object.values(ApprovalStatus)[1].valueOf()) {
        this.isRejected = false;
        this.isApproved = true;
      }
      else {
        this.isRejected = false;
        this.isApproved = false;
      }
    }
  }
  showPopover() {
    if (this.clickEventType !== ClickEventType.none) {
      return;
    }
    this.clickEventType = ClickEventType.showPaletPopover;
    let timeEntryEvent: TimeEntryEvent = { clickEventType: ClickEventType.showPaletPopover, timeEntry: this.timeEntry };

    if (this.startingDateCriteria.isBeforeThreeWeeks) {
      return;
    }
    this.paletEllipsisClicked.emit(timeEntryEvent);
    this.popoverVisible = this.timesheetApproval ? this.timesheetApproval.Status !== Object.values(ApprovalStatus)[1].valueOf() : true;
  }

  onProjectNamePaletClicked() {
    if (this.clickEventType !== ClickEventType.none) {
      this.clickEventType = ClickEventType.none;
      return;
    }

    if (this.timesheetApproval?.Status === Object.values(ApprovalStatus)[1].valueOf()) {
      this.clickEventType = ClickEventType.none;
      return;
    }

    if (this.startingDateCriteria.isBeforeThreeWeeks) {
      this.clickEventType = ClickEventType.none;
      return;
    }

    this.clickEventType = ClickEventType.showFormDrawer;
    let timeEntryEvent: TimeEntryEvent = { clickEventType: ClickEventType.showFormDrawer, timeEntry: this.timeEntry };

    this.projectNamePaletClicked.emit(timeEntryEvent);
    this.clickEventType = ClickEventType.none; //Use this line of code when the element is the container element.
  }

  showFormDrawer() {
    if (this.clickEventType !== ClickEventType.none) {
      this.clickEventType = ClickEventType.none;
      return;
    }

    this.editClicked.emit(ClickEventType.showFormDrawer);
    this.popoverVisible = false;

    this.clickEventType = ClickEventType.none;
  }

  closePopover() {
    this.popoverVisible = false;
  }

  showDeleteModal() {
    this.closePopover();
    this.isVisible1 = true;
  }

  handleOk() {
    this.deleteTimeEntry()
    this.isVisible1 = false;
  }

  handleCancel() {
    this.isVisible1 = false;
  }

  deleteTimeEntry(): void {
    if (this.timeEntry) {
      this.timesheetService.deleteTimeEntry(this.timeEntry?.Guid).subscribe(response => {
        this.deleteClicked.emit(ClickEventType.deleteTimeEntry);
      });
    }
  }
  
  authorize(key: string) {
    return this._permissionService.authorizedPerson(key);
  }
}


