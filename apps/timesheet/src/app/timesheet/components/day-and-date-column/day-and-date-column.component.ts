import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { TimeEntryEvent } from '../../../models/clickEventEmitObjectType';
import { ClickEventType } from '../../../models/clickEventType';
import { TimeEntry, Timesheet } from '../../../models/timesheetModels';
import { TimesheetService } from '../../services/timesheet.service';

@Component({
  selector: 'app-day-and-date-column',
  templateUrl: './day-and-date-column.component.html',
  styleUrls: ['./day-and-date-column.component.scss']
})
export class DayAndDateColumnComponent implements OnInit, OnChanges {

  @Output() dateColumnClicked = new EventEmitter<any>();
  @Output() projectNamePaletClicked = new EventEmitter<TimeEntryEvent>();
  @Output() editButtonClicked = new EventEmitter<ClickEventType>();
  @Output() totalHoursCalculated = new EventEmitter<number>();
  @Input() item: any; // decorate the property with @Input()
  @Input() dates1: any; // decorate the property with @Input()
  @Input() date: Date = new Date();
  @Input() timesheet: Timesheet | null = null;

  timeEntrys: TimeEntry[] | null = null;
  totalHours: number = 0;

  constructor(private timesheetService: TimesheetService) {
  }

  clickEventType = ClickEventType.none;

  // eslint-disable-next-line @typescript-eslint/no-empty-function,@angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.timesheet) {
      this.timesheetService.getTimeEntry(this.timesheet.guid, this.date).subscribe(response => {
        this.timeEntrys = response;

        if (this.timesheet) {
          let totalHours = this.timeEntrys?.map(timeEntry => timeEntry.hours).reduce((prev, next) => prev + next, 0);
          this.totalHours = totalHours ? totalHours : 0;
          this.totalHoursCalculated.emit(totalHours);
        }
      });
    }
  }

  onProjectNamePaletClicked(timeEntryEvent: TimeEntryEvent) {
    if (this.clickEventType === ClickEventType.none) {
      this.clickEventType = timeEntryEvent.clickEventType
      this.projectNamePaletClicked.emit(timeEntryEvent);
    }
  }

  onPaletEllipsisClicked(clickEventType: ClickEventType) {
    if (this.clickEventType === ClickEventType.none) {
      this.clickEventType = clickEventType;
      this.dateColumnClicked.emit(this.clickEventType);
    }
  }

  onEditButtonClicked(clickEventType: ClickEventType) {
    if (this.clickEventType === ClickEventType.none) {
      this.clickEventType = clickEventType;
      this.dateColumnClicked.emit(this.clickEventType);
    }
  }

  showFormDrawer() {
    if (this.clickEventType === ClickEventType.none) {
      this.clickEventType = ClickEventType.showFormDrawer
      //this.dateColumnClicked.emit(this.clickEventType);
      this.dateColumnClicked.emit({eventType:this.clickEventType,totalHours:this.totalHours});
    }

    this.clickEventType = ClickEventType.none;
  }
}
