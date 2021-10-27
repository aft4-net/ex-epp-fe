import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {ClickEventLocation} from '../../../models/clickEventLocation';

@Component({
  selector: 'app-day-and-date-column',
  templateUrl: './day-and-date-column.component.html',
  styleUrls: ['./day-and-date-column.component.scss']
})
export class DayAndDateColumnComponent implements OnInit {

  @Output() dateColumnClicked = new EventEmitter<ClickEventLocation>()
  @Output() editButtonClicked = new EventEmitter<ClickEventLocation>()
  @Input() item: any; // decorate the property with @Input()
  @Input() dates1: any; // decorate the property with @Input()

  constructor() {
  }

  clickEventLocation = ClickEventLocation.dateColumn;

  // eslint-disable-next-line @typescript-eslint/no-empty-function,@angular-eslint/no-empty-lifecycle-method
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
