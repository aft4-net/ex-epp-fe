import { Component, Input, OnInit, Output, EventEmitter, OnChanges, Directive, ElementRef, QueryList, ViewChildren, TemplateRef, ViewChild } from '@angular/core';
import { PermissionListService } from 'libs/common-services/permission.service';
import { findIndex, map } from 'rxjs/operators';
import { DateColumnEvent, TimeEntryEvent } from '../../../models/clickEventEmitObjectType';
import { ClickEventType } from '../../../models/clickEventType';
import { ApprovalStatus, TimeEntry, Timesheet, TimesheetApproval } from '../../../models/timesheetModels';
import { TimesheetService } from '../../services/timesheet.service';
import { ClientAndProjectStateService } from '../../state/client-and-projects-state.service';
import { ProjectNamePaletComponent } from '../project-name-palet/project-name-palet.component';
import { startingDateCriteria } from '../timesheet-detail/timesheet-detail.component';

@Directive({
  selector: '[entries]',
})
export class DayAndDateDirective {
  constructor(public elRef: ElementRef) {

  }
}
@Component({
  selector: 'app-day-and-date-column',
  templateUrl: './day-and-date-column.component.html',
  styleUrls: ['./day-and-date-column.component.scss']
})
export class DayAndDateColumnComponent implements OnInit, OnChanges {

  @Output() dateColumnClicked = new EventEmitter<DateColumnEvent>();
  @Output() projectNamePaletClicked = new EventEmitter<TimeEntryEvent>();
  @Output() paletEllipsisClicked = new EventEmitter<TimeEntryEvent>();
  @Output() editButtonClicked = new EventEmitter<ClickEventType>();
  @Output() deleteButtonClicked = new EventEmitter<ClickEventType>();
  @Output() totalHoursCalculated = new EventEmitter<number>();
  @Output() columnOverflow = new EventEmitter<boolean>();
  @Input() item: any; // decorate the property with @Input()
  @Input() dates1: any; // decorate the property with @Input()
  @Input() date: Date = new Date();
  @Input() timesheet: Timesheet | null = null;
  @Input() timeEntries: TimeEntry[] | null = null;
  @Input() timesheetApprovals: TimesheetApproval[] | null = null;
  @Input() timesheetreview: TimeEntry[] | null = null;
  @Output() moreTimeEntries: EventEmitter<number> = new EventEmitter();

  totalHours: number = 0;
  dateColumnHighlightClass: string = "date-column-with-highlight";
  morePopover = false;
  index: number = 0;
  overflow = false;
  moreEntries: any[] = [];
  overflowPt?: number = 0;
  of: any;
  isSubmitted: boolean | undefined;
  startingDateCriteria = startingDateCriteria
  disabled = false
  isFutureDate = false;

  constructor(
    private timesheetService: TimesheetService,
    public elRef: ElementRef,
    private readonly _permissionService: PermissionListService
  ) { }

  clickEventType = ClickEventType.none;

  ngOnInit(): void {
    this.checkForFutureDate(this.item);
  }

  ngOnChanges(): void {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate());
    this.timeEntries = this.timeEntries?.filter(te => new Date(te.Date).valueOf() === this.date.valueOf()) ?? null;

    if (this.timeEntries) {
      let totalHours = this.timeEntries?.map(timeEntry => timeEntry.Hour).reduce((prev, next) => prev + next, 0);
      this.totalHours = totalHours ? totalHours : 0;
    }

    let today = new Date();
    today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    if (this.date.valueOf() > today.valueOf() || this.startingDateCriteria.isBeforeThreeWeeks) {
      this.dateColumnHighlightClass = "date-column-with-no-highlight";
      this.disabled = true;
    }
    else if (this.timesheetApprovals && this.timesheetApprovals.length > 0) {
      if (this.date.valueOf() === today.valueOf()) {
        this.dateColumnHighlightClass = "date-column-with-no-highlight-today";
      }
      else {
        this.dateColumnHighlightClass = "date-column-with-no-highlight";
      }
    }
    else if (this.date.valueOf() === today.valueOf()) {
      this.dateColumnHighlightClass = "date-column-with-highlight-today";
    }
    else {
      this.dateColumnHighlightClass = "date-column-with-highlight";
    }
  }

  onProjectNamePaletClicked(timeEntryEvent: TimeEntryEvent) {
    if (this.clickEventType === ClickEventType.none) {
      this.clickEventType = timeEntryEvent.clickEventType
      this.projectNamePaletClicked.emit(timeEntryEvent);
    }

    this.clickEventType = ClickEventType.none;
  }

  onPaletEllipsisClicked(timeEntryEvent: TimeEntryEvent) {
    if (this.clickEventType === ClickEventType.none) {
      this.clickEventType = timeEntryEvent.clickEventType;
      this.paletEllipsisClicked.emit(timeEntryEvent);
    }

    this.clickEventType = ClickEventType.none;
  }

  onEditButtonClicked(clickEventType: ClickEventType) {
    if (this.clickEventType === ClickEventType.none) {
      this.clickEventType = clickEventType;
      this.editButtonClicked.emit(this.clickEventType);
    }

    this.clickEventType = ClickEventType.none;
  }

  onDeleteButtonClicked(clickEventType: ClickEventType) {
    if (this.clickEventType === ClickEventType.none) {
      this.clickEventType = clickEventType;
      this.deleteButtonClicked.emit(this.clickEventType);
    }

    this.clickEventType = ClickEventType.none;
  }

  showFormDrawer() {
    if (this.clickEventType === ClickEventType.none) {
      this.clickEventType = ClickEventType.showFormDrawer;
      let dateColumnEvent: DateColumnEvent = {
        clickEventType: this.clickEventType,
        totalHours: this.totalHours
      }
      this.dateColumnClicked.emit(dateColumnEvent);
    }

    this.clickEventType = ClickEventType.none;
  }

  onClick() {
    this.clickEventType = ClickEventType.showPaletPopover;
    this.morePopover = true;
  }

  scrollTimeEntriesUp(el: any) {
    const myElement = document.getElementById(el);
    myElement?.scroll({
      top: 100,
      behavior: 'smooth'
    });
  }

  scrollTimeEntriesBottom(el: any) {
    const myElement = document.getElementById(el);
    myElement!.scroll({ top: myElement!.scrollHeight, behavior: 'smooth' });
    //myElement!.scrollTop = myElement!.scrollHeight - myElement!.clientHeight;

  }

  checkOverflow(divId: any) {
    const elem = document.getElementById(divId)

    const isOverflowing = elem!.clientHeight < elem!.scrollHeight;

    if (isOverflowing) {
      elem!.classList.remove("entries-overflow");
      elem!.classList.add("show-scroll-bar");
    }
    else {
      elem!.classList.add("entries-overflow");
      elem!.classList.remove("show-scroll-bar");
    }
  }

  timesheetApprovalForaProject(projectId: string) {
    if (!this.timesheetApprovals) {
      return null;
    }

    let timesheetApprovals = this.timesheetApprovals.filter(tsa => tsa.ProjectId === projectId)

    if (timesheetApprovals.length === 0) {
      return null;
    }
    else {
      return timesheetApprovals[0];
    }
  }

  checkForFutureDate(curr: any) {
    let now = new Date();
    if (curr > now) {
      this.isFutureDate = true;
    }
    return this.isFutureDate;
  }

  timesheetApproved() {
    if (!this.timesheetApprovals) {
      return false;
    }

    for (let tsa of this.timesheetApprovals) {
      if (tsa.Status === Object.values(ApprovalStatus)[1].valueOf()){
        continue;
      }

      return false;
    }

    return true;
  }

  authorize(key: string) {
    return this._permissionService.authorizedPerson(key);
  }
}
