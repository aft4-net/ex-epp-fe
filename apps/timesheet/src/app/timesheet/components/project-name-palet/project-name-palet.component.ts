import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ClickEventType } from '../../../models/clickEventType';
import { Project } from '../../../models/project';
import { TimeEntry } from '../../../models/timesheetModels';
import { TimesheetService } from '../../services/timesheet.service';

@Component({
  selector: 'app-project-name-palet',
  templateUrl: './project-name-palet.component.html',
  styleUrls: ['./project-name-palet.component.scss']
})
export class ProjectNamePaletComponent implements OnInit {
  @Output() projectNamePaletClicked = new EventEmitter<ClickEventType>()
  @Output() paletEllipsisClicked = new EventEmitter<ClickEventType>();
  @Output() editClicked = new EventEmitter<ClickEventType>()
  @Input() timeEntry: TimeEntry | null = null;
  project: Project | null = null;
  
  clickEventType = ClickEventType.none;
  popoverVisible = false;

  constructor(private timesheetService: TimesheetService) { }

  ngOnInit(): void {
    if(this.timeEntry) {
      this.timesheetService.getProject(this.timeEntry.projectId).subscribe(response => {
        this.project = response ? response[0] : null;
      });
    }
  }

  onProjectNamePaletClicked() {
    console.log("Project name palet clicked.");
  }

  showPopover() {
    this.paletEllipsisClicked.emit(this.clickEventType);
    this.popoverVisible = true;
  }

  closePopover() {
    this.popoverVisible = false;
  }

  showFormDrawer() {
    this.editClicked.emit(ClickEventType.dateColumn);
    this.popoverVisible = false;
  }
}
