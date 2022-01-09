import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApprovalStatus, TimesheetApproval } from '../../../models/timesheetModels';
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
  @Input() approvalDetails:any[]=[]
  timesheetApprove!:TimesheetApproval;
  @Output () timesheetStatusUpdated=new EventEmitter<TimesheetApproval>();

    constructor(private timesheetService:TimesheetService) {

    }

    ngOnInit(): void {
    }

  getNote(note:string)
  {
    return note!==null?note:"N/A";
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
  isStatatusRequest(status:string)
  {
    return (status!=='Requested'?true:false);
  }

  exitModal()
  {
    this.modalStatus.emit(false);
    this.inputValue='';
  }

  approve()
  {
    this.timesheetApprove=this.timesheetDetail;
    this.timesheetApprove.Comment=this.inputValue;
    this.timesheetApprove.Status=ApprovalStatus.Approved;
    this.timesheetService.updateTimesheetProjectApproval(this.timesheetApprove);
    this.modalStatus.emit(false);
    this.timesheetService.success='Timesheet approved successfully';
    this.timesheetService.error='Timesheet approve failed';
    if(this.timesheetService.statusChanged)
    {
      this.timesheetStatusUpdated.emit(this.timesheetApprove);
    }
    
  }
  requestForReview()
  {
    this.timesheetApprove=this.timesheetDetail;
    this.timesheetApprove.Comment=this.inputValue;
    this.timesheetApprove.Status=ApprovalStatus.Rejected;
    this.timesheetService.updateTimesheetProjectApproval(this.timesheetApprove);
    this.modalStatus.emit(false);
    this.timesheetService.success='Timesheet returned for review successfully';
    this.timesheetService.error='Timesheet return for review failed';
    if(this.timesheetService.statusChanged)
    {
      this.timesheetStatusUpdated.emit(this.timesheetApprove);
    }
  }

  }

