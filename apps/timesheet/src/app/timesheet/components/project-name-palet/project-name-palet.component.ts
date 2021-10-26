import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ClickEventLocation } from '../../../models/clickEventLocation';

@Component({
  selector: 'app-project-name-palet',
  templateUrl: './project-name-palet.component.html',
  styleUrls: ['./project-name-palet.component.scss']
})
export class ProjectNamePaletComponent implements OnInit {
  @Output() paletEllipsisClicked = new EventEmitter<ClickEventLocation>();
  @Output() editClicked = new EventEmitter<ClickEventLocation>()
  
  clickEventLocation = ClickEventLocation.paletEllipsis;
  popoverVisible = false;

  constructor() { }

  ngOnInit(): void {
  }

  showPopover() {
    this.paletEllipsisClicked.emit(this.clickEventLocation);
    this.popoverVisible = true;
  }

  closePopover() {
    this.popoverVisible = false;
  }

  showFormDrawer() {
    this.editClicked.emit(ClickEventLocation.dateColumn);
  }
}
