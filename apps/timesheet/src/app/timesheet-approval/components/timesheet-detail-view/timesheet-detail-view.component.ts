import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TimesheetService } from '../../../timesheet/services/timesheet.service';

@Component({
  selector: 'exec-epp-timesheet-detail-view',
  templateUrl: './timesheet-detail-view.component.html',
  styleUrls: ['./timesheet-detail-view.component.scss']
})
export class TimesheetDetailViewComponent implements OnInit {
  @Input() isDialogVisible=false;
  @Input() timesheetDetail:any;
  @Input() isApproved=false;
  @Output() modalStatus=new EventEmitter<boolean>();
  @Output () projectStatus=new EventEmitter<boolean>();

  submitting =true;
  inputValue='';
  appovalDetails:any[]=
  [

    {
     Date:Date.now(),
     Hours:'08',
     Notes:'Additional changes asked by the client'
    },
  ]
    constructor(private timesheetService:TimesheetService) {

    }

    ngOnInit(): void {
    }
  exitModal()
  {
    this.modalStatus.emit(false);
    this.projectStatus.emit(false);
  }
  handleOk()
  {
    ;
  }
  approve()
  {
    ;
  }
  requestForReview()
  {
    ;
  }

  }

