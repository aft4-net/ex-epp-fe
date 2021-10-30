import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ClickEventLocation } from '../../../models/clickEventLocation';
import { Project } from '../../../models/project';
import { TimeEntry } from '../../../models/timesheetModels';
import { TimesheetService } from '../../services/timesheet.service';

@Component({
  selector: 'app-project-name-palet',
  templateUrl: './project-name-palet.component.html',
  styleUrls: ['./project-name-palet.component.scss']
})
export class ProjectNamePaletComponent implements OnInit {
  @Output() paletEllipsisClicked = new EventEmitter<ClickEventLocation>();
  @Output() editClicked = new EventEmitter<ClickEventLocation>()
  @Input() timeEntry: TimeEntry | null = null;
  project: Project | null = null;
  
  clickEventLocation = ClickEventLocation.paletEllipsis;
  popoverVisible = false;

  constructor(private timesheetService: TimesheetService) { }

  ngOnInit(): void {
    if(this.timeEntry) {
      this.timesheetService.getProject(this.timeEntry.projectId).subscribe(response => {
        this.project = response ? response[0] : null;
      });
    }
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
    this.popoverVisible = false;
  }
}
