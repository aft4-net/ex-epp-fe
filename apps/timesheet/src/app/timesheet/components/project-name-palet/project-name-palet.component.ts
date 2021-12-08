<<<<<<< HEAD
import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {TimeEntryEvent} from '../../../models/clickEventEmitObjectType';
import {ClickEventType} from '../../../models/clickEventType';
import {Project} from '../../../models/project';
import {TimeEntry, TimesheetApproval} from '../../../models/timesheetModels';
import {TimesheetService} from '../../services/timesheet.service';
import {NzModalService} from "ng-zorro-antd/modal";
=======
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TimeEntryEvent } from '../../../models/clickEventEmitObjectType';
import { ClickEventType } from '../../../models/clickEventType';
import { Project } from '../../../models/project';
import { ApprovalStatus, TimeEntry, TimesheetApproval } from '../../../models/timesheetModels';
import { TimesheetService } from '../../services/timesheet.service';
>>>>>>> develop

@Component({
  selector: 'app-project-name-palet',
  templateUrl: './project-name-palet.component.html',
  styleUrls: ['./project-name-palet.component.scss']
})
export class ProjectNamePaletComponent implements OnInit {
  @Output() projectNamePaletClicked = new EventEmitter<TimeEntryEvent>()
  @Output() paletEllipsisClicked = new EventEmitter<TimeEntryEvent>();
  @Output() editClicked = new EventEmitter<ClickEventType>()
  @Input() timeEntry: TimeEntry | null = null;
  @Input() timesheetApproval: TimesheetApproval | null = null;
  project: Project | null = null;
  projectNamePaletClass = "project-name-palet"

  isVisible1 = false;
  clickEventType = ClickEventType.none;
  popoverVisible = false;

  constructor(private timesheetService: TimesheetService,
              private modal: NzModalService) {
  }

  ngOnInit(): void {
    if (this.timeEntry) {
      this.timesheetService.getProject(this.timeEntry.ProjectId).subscribe(response => {
        this.project = response ? response[0] : null;
      });
    }

    if (this.timesheetApproval && this.timesheetApproval.Status != ApprovalStatus.Rejected) {
      this.projectNamePaletClass = "project-name-palet-approval";
    } else {
      this.projectNamePaletClass = "project-name-palet";
    }
  }

  showPopover() {
    debugger;
    let timeEntryEvent: TimeEntryEvent = {clickEventType: ClickEventType.showPaletPopover, timeEntry: this.timeEntry};

    if (this.clickEventType === ClickEventType.none) {
      this.clickEventType = ClickEventType.showPaletPopover;
      this.paletEllipsisClicked.emit(timeEntryEvent);
      this.popoverVisible = this.timesheetApproval ? this.timesheetApproval.Status === ApprovalStatus.Rejected : true;
    }
  }

  onProjectNamePaletClicked() {
    let timeEntryEvent: TimeEntryEvent = {clickEventType: ClickEventType.showFormDrawer, timeEntry: this.timeEntry};

    if (this.clickEventType == ClickEventType.none) {
      this.clickEventType = ClickEventType.showFormDrawer;
      this.projectNamePaletClicked.emit(timeEntryEvent);
    }

    this.clickEventType = ClickEventType.none; //Use this line of code when the element is the container element.
  }

  showFormDrawer() {
    if (this.clickEventType === ClickEventType.none) {
      this.editClicked.emit(ClickEventType.showFormDrawer);
      this.popoverVisible = false;
    }

    this.clickEventType = ClickEventType.none;
  }

  closePopover() {
    this.popoverVisible = false;
  }
<<<<<<< HEAD

  showDeleteConfirm(): void {
    // // @ts-ignore
    // this.modal.confirm({
    //
    //
    //   // cursor: 'pointer',
    //   // background: '#FFFFFF',
    //   // nzContent: '<b style="color: #262626; background: #FFFFFF;border: #00A551; height: 194px;radius: 2px;padding: 24px;">Are you sure you want to delete this entry?<br> you can\'t undo this action.</b>',
    //   nzTitle: 'Delete?',
    //   nzContent: '<b style="color: #262626 ">Are you sure you want to delete this entry?<br> you can not undo this action.</b>',
    //   nzOkText: 'Yes, Delete',
    //   nzOkType: 'primary',
    //
    //
    //   // border: '#00A551',
    //   // radius: '2px',
    //   // top: '357px',
    //   // width: '328px',
    //   // padding: '24px',
    //   // left: '532px',
    //   nzOkDanger: true,
    //   nzCancelText: 'Cancel',
    //   nzOnCancel: () => console.log('Cancel'),
    //   nzOnOk: () => console.log('OK'),
    //
    // });
    this.isVisible1 = true;
  }
  showModal(): void {
    this.isVisible1 = true;
    this.modal.confirm({

        //
        //
        //   // cursor: 'pointer',
        //   // background: '#FFFFFF',
        //   // nzContent: '<b style="color: #262626; background: #FFFFFF;border: #00A551; height: 194px;radius: 2px;padding: 24px;">Are you sure you want to delete this entry?<br> you can\'t undo this action.</b>',
        //   nzTitle: 'Delete?',
        //   nzContent: '<b style="color: #262626 ">Are you sure you want to delete this entry?<br> you can not undo this action.</b>',
        //   nzOkText: 'Yes, Delete',
        //   nzOkType: 'primary',
        //
        //
        //   // border: '#00A551',
        //   // radius: '2px',
        //   // top: '357px',
        //   // width: '328px',
        //   // padding: '24px',
        //   // left: '532px',
        //   nzOkDanger: true,
        //   nzCancelText: 'Cancel',
        //   nzOnCancel: () => console.log('Cancel'),
        //   nzOnOk: () => console.log('OK'),
        //
        // });
    });
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible1 = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible1 = false;
  }
=======
  deleteTimeEntry(Guid:string):void{
    this.timesheetService.deleteTimeEntry(Guid).subscribe(data => {
        console.log(data);
      });

    }
>>>>>>> develop
}
