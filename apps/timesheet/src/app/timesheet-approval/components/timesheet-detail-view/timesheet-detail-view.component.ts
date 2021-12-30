import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'exec-epp-timesheet-detail-view',
  templateUrl: './timesheet-detail-view.component.html',
  styleUrls: ['./timesheet-detail-view.component.scss']
})
export class TimesheetDetailViewComponent implements OnInit {
  @Input() isDialogVisible=false;
  @Input() timesheetDetail:any;

  @Output() modalStatus=new EventEmitter<boolean>();

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
    constructor() { }

    ngOnInit(): void {
    }
  exitModal()
  {
    this.modalStatus.emit(false);
    // this.isDialogVisible=false;
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

