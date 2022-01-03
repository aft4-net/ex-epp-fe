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
  //@Input() approvalDetails:any[]=[]
  timesheetApprove:TimesheetApproval=
  {
    TimesheetId: "18babdff-c572-4fbc-a102-d6434b7140c3",
    ProjectId: "7645b7bf-5675-4eb8-ac1d-96b306926422",
    Status: ApprovalStatus.Approved,
    Comment:'string',
    EmployeeName:"string",
    FromDate:new Date(Date.now()),
    ToDate:new Date(Date.now()),
    CreatedDate:new Date(Date.now()),
    ClientName:"string",
    TotalHours:8,
    ProjectName:"string"
  };
  public arrayOfCheckedId:string[]=[];
  approvalDetails:any[]=[
     {
       Date:Date.now(),
       Hour:4,
       Note:'additional client requirement'

     },
     {
      Date:Date.now(),
      Hour:2,
      Note:'N/A'
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
    // const projectId='7645b7bf-5675-4eb8-ac1d-96b306926422';
    // this.timesheetApprove.ProjectId=projectId;
    // this.timesheetApprove.TimesheetId=timesheetId;
    // this.timesheetApprove.Comment=this.inputValue;
    // this.timesheetApprove.Status=ApprovalStatus.Approved;
    this.timesheetApprove.Comment=this.inputValue;
    this.timesheetApprove.Status=ApprovalStatus.Requested;
    this.timesheetService.updateTimesheetProjectApproval(this.timesheetApprove).subscribe();


  }
  requestForReview()
  {
    this.timesheetApprove.TimesheetId="18babdff-c572-4fbc-a102-d6434b7140c3";
    this.timesheetApprove.ProjectId="7645b7bf-5675-4eb8-ac1d-96b306926422";
    this.timesheetApprove.Comment=this.inputValue;
    this.timesheetApprove.Status=ApprovalStatus.Requested;
    this.timesheetService.updateTimesheetProjectApproval(this.timesheetApprove).subscribe();
  }

  }

