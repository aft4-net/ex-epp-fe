import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ClickEventLocation } from '../../../models/clickEventLocation';

@Component({
  selector: 'app-day-and-date-column',
  templateUrl: './day-and-date-column.component.html',
  styleUrls: ['./day-and-date-column.component.scss']
})
export class DayAndDateColumnComponent implements OnInit {
  @Output() dateColumnClicked = new EventEmitter<ClickEventLocation>()
  @Output() editButtonClicked = new EventEmitter<ClickEventLocation>()

  clickEventLocation = ClickEventLocation.dateColumn;

  constructor() { }

  ngOnInit(): void {
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
