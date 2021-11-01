import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { ClickEventType } from '../../../models/clickEventType';
import { TimeEntry, Timesheet } from '../../../models/timesheetModels';
import { TimesheetService } from '../../services/timesheet.service';

@Component({
  selector: 'app-day-and-date-column',
  templateUrl: './day-and-date-column.component.html',
  styleUrls: ['./day-and-date-column.component.scss']
})
export class DayAndDateColumnComponent implements OnInit, OnChanges {

  @Output() dateColumnClicked = new EventEmitter<ClickEventType>();
  @Output() editButtonClicked = new EventEmitter<ClickEventType>();
  @Input() item: any; // decorate the property with @Input()
  @Input() dates1: any; // decorate the property with @Input()
  @Input() date: Date = new Date();
  @Input() timesheet: Timesheet | null = null;

  timeEntrys: TimeEntry[] | null = null;

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
      });
    }
  }

  onPaletEllipsisClicked(clickEventType: ClickEventType) {
    if (this.clickEventType === ClickEventType.none) {
      this.clickEventType = clickEventType;
    }
  }  

  onEditButtonClicked(clickEventType: ClickEventType) {
    if (this.clickEventType === ClickEventType.none) {
      this.clickEventType = clickEventType;
    }

    this.showFormDrawer();
  }

  showFormDrawer() {
    if (this.clickEventType === ClickEventType.none) {
      this.clickEventType = ClickEventType.showFormDrawer
    }
    
    this.dateColumnClicked.emit(this.clickEventType);

    this.clickEventType = ClickEventType.none;
  }
}
