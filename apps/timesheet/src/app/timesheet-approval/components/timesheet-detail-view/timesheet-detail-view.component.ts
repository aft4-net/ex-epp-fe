import { ApprovalStatus, TimesheetApproval } from '../../../models/timesheetModels';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { NotificationBar } from '../../../models/notification';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { PermissionListService } from '../../../../../../../libs/common-services/permission.service';
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
  @Output () isApprovedOrReturned=new EventEmitter<boolean>();

    constructor(private timesheetService:TimesheetService,
      private notification: NzNotificationService,
      private notificationbar : NotificationBar,
      private readonly _permissionService:PermissionListService,) {

    }

  ngOnInit(): void {
      this.notificationbar.showNotification({
          type: 'success',
          content: '',
          duration: 1,
        });
  
    }


  isComment(comment:string)
  {
    return comment===null || comment===''?true:false;
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
    this.timesheetService.updateTimesheetProjectApproval(this.timesheetApprove).subscribe((response:any)=>{
      if (response.ResponseStatus.toString() == 'Success') {
        this.notification.success("Timesheet approved successfully","",
        { nzPlacement: 'bottomRight' }

        );
       console.log("one - approval");
       this.isApprovedOrReturned.emit(true);
      }
      else{

        this.notification.error("Timesheet approve failed","",
        { nzPlacement: 'bottomRight' }
        )

      }
    });
    this.exitModal();
  }
  requestForReview()
  {
    this.timesheetApprove=this.timesheetDetail;
    this.timesheetApprove.Comment=this.inputValue;
    this.timesheetApprove.Status=ApprovalStatus.Rejected;
    this.timesheetService.updateTimesheetProjectApproval(this.timesheetApprove).subscribe((response:any)=>{
      if (response.ResponseStatus.toString() == 'Success') {
        this.notification.success("Timesheet returned for review successfully","",
        { nzPlacement: 'bottomRight' }

        );
       console.log("one - approval");
       this.isApprovedOrReturned.emit(true);
      }
      else{

        this.notification.error("Timesheet return for review failed","",
        { nzPlacement: 'bottomRight' }
        )

      }
    });
    this.exitModal();
  }
  authorize(key: string){
    return this._permissionService.authorizedPerson(key);
  }
  }

