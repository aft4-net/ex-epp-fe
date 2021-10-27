import { Component, OnInit } from '@angular/core';
import { ClickEventLocation } from '../models/clickEventLocation';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss']
})
export class TimesheetComponent implements OnInit {
  clickEventLocation = ClickEventLocation.formDrawer;
  drawerVisible = false;

  constructor() { }

  ngOnInit(): void {
  }

  onDateColumnClicked(clickEventLocation: ClickEventLocation) {
    this.clickEventLocation = clickEventLocation;
    this.showFormDrawer();
  }

  onEditButtonClicked(clickEventLocation: ClickEventLocation) {    
    this.clickEventLocation = clickEventLocation;
    this.showFormDrawer();
  }

  showFormDrawer() {
    if (this.clickEventLocation == ClickEventLocation.dateColumn) {
      this.drawerVisible = true;
    }

    console.log({DrawerVisible: this.drawerVisible})

    this.clickEventLocation = ClickEventLocation.formDrawer;
  }

  closeFormDrawer() {
    this.drawerVisible = false;
  }
}
