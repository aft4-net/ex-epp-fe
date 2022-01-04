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
  handleOk()
  {
    ;
  }
  approve()
  {
    this.timesheetApprove=this.timesheetDetail;
    this.timesheetApprove.Comment=this.inputValue;
    this.timesheetApprove.Status=ApprovalStatus.Approved;
    this.timesheetService.updateTimesheetProjectApproval(this.timesheetApprove).subscribe();
    this.isDialogVisible=false;
  }
  requestForReview()
  {
    this.timesheetApprove=this.timesheetDetail;
    this.timesheetApprove.Comment=this.inputValue;
    this.timesheetApprove.Status=ApprovalStatus.Rejected;
    this.timesheetService.updateTimesheetProjectApproval(this.timesheetApprove).subscribe();
    this.isDialogVisible=false;

  }

  }

