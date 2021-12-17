import { Component, Input, OnInit, Output, EventEmitter, OnChanges, AfterViewInit, Directive, ElementRef, QueryList, ViewChildren, TemplateRef, ViewChild } from '@angular/core';
import { findIndex } from 'rxjs/operators';
import { DateColumnEvent, TimeEntryEvent } from '../../../models/clickEventEmitObjectType';
import { ClickEventType } from '../../../models/clickEventType';
import { TimeEntry, Timesheet, TimesheetApproval } from '../../../models/timesheetModels';
import { TimesheetService } from '../../services/timesheet.service';
import { ProjectNamePaletComponent } from '../project-name-palet/project-name-palet.component';

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
export class DayAndDateColumnComponent implements OnInit, OnChanges, AfterViewInit {

  @Output() dateColumnClicked = new EventEmitter<DateColumnEvent>();
  @Output() projectNamePaletClicked = new EventEmitter<TimeEntryEvent>();
  @Output() paletEllipsisClicked = new EventEmitter<TimeEntryEvent>();
  @Output() editButtonClicked = new EventEmitter<ClickEventType>();
  @Output() totalHoursCalculated = new EventEmitter<number>();
  @Output() columnOverflow = new EventEmitter<boolean>();
  @Input() item: any; // decorate the property with @Input()
  @Input() dates1: any; // decorate the property with @Input()
  @Input() date: Date = new Date();
  @Input() timesheet: Timesheet | null = null;
  @Input() timesheetApprovals: TimesheetApproval[] | null = null;
  @Output() moreTimeEntries: EventEmitter<number> = new EventEmitter();
  @ViewChildren('entries') entriesDiv!: QueryList<any>;
  @ViewChild('pt') pointerEl!: ElementRef;
  @ViewChild('col') colEl!: ElementRef;
  @ViewChild('addIcon') iconEL!: ElementRef;
  timeEntrys: TimeEntry[] | null = null;
  totalHours: number = 0;
  dateColumnHighlightClass: string = "date-column-with-highlight";
  morePopover = false;
  index: number = 0;
  overflow = false;
  moreEntries: any[] = [];
  overflowPt?: number = 0;
  of: any;
  isSubmitted: boolean | undefined;
  constructor(private timesheetService: TimesheetService, public elRef: ElementRef) { }
  ngAfterViewInit(): void {
    this.checkOverflow(this.colEl.nativeElement);
    this.overflowCalc();
  }

  clickEventType = ClickEventType.none;

  ngOnInit(): void {
    if (this.timesheet) {
      this.timesheetService.getTimeSheetApproval(this.timesheet?.Guid).subscribe(res => {
        res != null && res.length > 0 ? this.isSubmitted = true : this.isSubmitted = false;
      })
    }
    console.log(this.isSubmitted)
  }

  ngOnChanges(): void {
    if (this.timesheet) {
      this.timesheetService.getTimeEntries(this.timesheet.Guid, this.date).subscribe(response => {
        this.timeEntrys = response ? response : null;

        if (this.timesheet) {
          let totalHours = this.timeEntrys?.map(timeEntry => timeEntry.Hour).reduce((prev, next) => prev + next, 0);
          this.totalHours = totalHours ? totalHours : 0;
          this.totalHoursCalculated.emit(totalHours);
        }
      });
      this.overflowCalc();
    }

    let today = new Date();

    if (this.date > new Date(today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate() + 1))) {
      this.dateColumnHighlightClass = "date-column-with-no-highlight";
    }
    else if (this.timesheetApprovals && this.timesheetApprovals.length > 0) {
      this.dateColumnHighlightClass = "date-column-with-no-highlight";
    }
    else {
      this.dateColumnHighlightClass = "date-column-with-highlight";
    }
  }
  overflowCalc() {
    this.entriesDiv?.changes.subscribe(() => {
      this.entriesDiv.toArray().forEach(el => {
        if (this.entriesDiv.toArray()[this.index].nativeElement.getBoundingClientRect().bottom < this.pointerEl.nativeElement.getBoundingClientRect().top) {
          this.overflowPt = this.index + 1;

        }
        this.index!++;
      });
      if (this.overflowPt! > 0) {
        if (this.checkOverflow(this.colEl.nativeElement)) {
          this.overflow = true;
          this.colEl.nativeElement.style.overflow = "hidden";
          this.columnOverflow.emit(this.overflow);
          this.split(this.overflowPt!);
          console.log(this.checkOverflow(this.colEl.nativeElement))
        }
      }
    });
  }
  onProjectNamePaletClicked(timeEntryEvent: TimeEntryEvent) {
    if (this.clickEventType === ClickEventType.none) {
      this.clickEventType = timeEntryEvent.clickEventType
      this.projectNamePaletClicked.emit(timeEntryEvent);
    }

    if (this.morePopover) {
      this.clickEventType = ClickEventType.none;
    }
  }

  onPaletEllipsisClicked(timeEntryEvent: TimeEntryEvent) {
    if (this.clickEventType === ClickEventType.none) {
      this.clickEventType = timeEntryEvent.clickEventType;
      this.paletEllipsisClicked.emit(timeEntryEvent);
    }

    if (this.morePopover) {
      this.clickEventType = ClickEventType.none;
    }
  }

  onEditButtonClicked(clickEventType: ClickEventType) {
    if (this.clickEventType === ClickEventType.none) {
      this.clickEventType = clickEventType;
      this.editButtonClicked.emit(this.clickEventType);
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

  checkOverflow(el: HTMLElement, index?: number) {
    if (el.offsetHeight < el.scrollHeight) {
      this.index ? index : null;
      this.overflow = true;
    }
    return el.offsetHeight < el.scrollHeight;
  }

  split(index: number) {

    if (this.timeEntrys !== null) {
      for (let i = index; i < this.timeEntrys.length; i++) {
        for (let j = 0; j <= this.timeEntrys.length - index - 1; j++) {
          this.moreEntries[j] = this.timeEntrys[i];
          i++;
        }
      }
    }
    return this.moreEntries;
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
}
