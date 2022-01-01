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
  @Output() modalStatus=new EventEmitter<boolean>();
  submitting =true;
  inputValue='';
  appovalDetails:any[]=
  [

    {
     Date:Date.now(),
     Hours:this.formatHour(8),
     Notes:'Additional changes asked by the client'
    },
    {
      Date:Date.now(),
      Hours:this.formatHour(4),
      Notes:''
     },
  ]
    constructor(private timesheetService:TimesheetService) {

    }

    ngOnInit(): void {
    }
  formatHour(hour:number)
  {
    if(hour>=10)
    {
      return hour.toString();
    }
    else
    {
      return '0'+ hour.toString();
    }
  }
  exitModal()
  {
    this.modalStatus.emit(false);
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

