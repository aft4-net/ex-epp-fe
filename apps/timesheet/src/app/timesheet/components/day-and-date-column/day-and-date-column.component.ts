import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { ClickEventLocation } from '../../../models/clickEventLocation';
import { TimeEntry, Timesheet } from '../../../models/timesheetModels';
import { TimesheetService } from '../../services/timesheet.service';

@Component({
  selector: 'app-day-and-date-column',
  templateUrl: './day-and-date-column.component.html',
  styleUrls: ['./day-and-date-column.component.scss']
})
export class DayAndDateColumnComponent implements OnInit, OnChanges {

  @Output() dateColumnClicked = new EventEmitter<ClickEventLocation>()
  @Output() editButtonClicked = new EventEmitter<ClickEventLocation>()
  @Input() item: any; // decorate the property with @Input()
  @Input() dates1: any; // decorate the property with @Input()
  @Input() date: Date = new Date();
  @Input() timesheet: Timesheet | null = null;

  timeEntrys: TimeEntry[] | null = null;

  constructor(private timesheetService: TimesheetService) {
  }

  clickEventLocation = ClickEventLocation.dateColumn;

  // eslint-disable-next-line @typescript-eslint/no-empty-function,@angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.timesheet) {
      this.timesheetService.getTimeEntry(this.timesheet.guid, this.date).subscribe(response => {
        this.timeEntrys = response;
      });
    }
  }

  onPaletEllipsisClicked(clickEventLocation: ClickEventLocation) {
    this.clickEventLocation = clickEventLocation;
  }

  onEditButtonClicked(clickEventLocation: ClickEventLocation) {
    this.editButtonClicked.emit(clickEventLocation);
  }

  showFormDrawer() {
    if (this.clickEventLocation === ClickEventLocation.dateColumn) {
      this.dateColumnClicked.emit(this.clickEventLocation);
    }

    this.clickEventLocation = ClickEventLocation.dateColumn;
  }
}
