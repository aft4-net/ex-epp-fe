import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { DateColumnEvent, TimeEntryEvent } from '../../../models/clickEventEmitObjectType';
import { ClickEventType } from '../../../models/clickEventType';
import { TimeEntry, Timesheet } from '../../../models/timesheetModels';
import { TimesheetService } from '../../services/timesheet.service';

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
  @Output() totalHoursCalculated = new EventEmitter<number>();
  @Input() item: any; // decorate the property with @Input()
  @Input() dates1: any; // decorate the property with @Input()
  @Input() date: Date = new Date();
  @Input() timesheet: Timesheet | null = null;
  @Output() moreTimeEntries: EventEmitter<number> =   new EventEmitter();
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
      this.timesheetService.getTimeEntries(this.timesheet.Guid, this.date).subscribe(response => {
        this.timeEntrys = response ? response : null;

        if (this.timesheet) {
          let totalHours = this.timeEntrys?.map(timeEntry => timeEntry.Hour).reduce((prev, next) => prev + next, 0);
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

  onPaletEllipsisClicked(timeEntryEvent: TimeEntryEvent) {
    if (this.clickEventType === ClickEventType.none) {
      this.clickEventType = timeEntryEvent.clickEventType;
      this.paletEllipsisClicked.emit(timeEntryEvent);
    }
  }

  onEditButtonClicked(clickEventType: ClickEventType) {
    if (this.clickEventType === ClickEventType.none) {
      this.clickEventType = clickEventType;
      this.editButtonClicked.emit(this.clickEventType);
    }
  }

  showFormDrawer() {
    if (this.clickEventType === ClickEventType.none) {
      this.clickEventType = ClickEventType.showFormDrawer
      let dateColumnEvent: DateColumnEvent = {
        clickEventType: this.clickEventType,
        totalHours: this.totalHours
      }
      this.dateColumnClicked.emit(dateColumnEvent);
    }

    this.clickEventType = ClickEventType.none;
  }
}
