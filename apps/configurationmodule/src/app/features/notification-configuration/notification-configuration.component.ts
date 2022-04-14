import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NzThSelectionComponent } from 'ng-zorro-antd/table';
import { Observable } from 'rxjs';
import { NotificationWeek ,TimesheetConfiguration,TimesheetNotificationConfiguration} from '../../models/timesheetModels';
import { TimesheetConfigurationStateService } from '../../state/timesheet-configuration-state.service';

@Component({
  selector: 'exec-epp-notification-configuration',
  templateUrl: './notification-configuration.component.html',
  styleUrls: ['./notification-configuration.component.scss']
})
export class NotificationConfigurationComponent implements OnInit {
  timesheetConfig$: Observable<TimesheetConfiguration> = new Observable();;
  timesheetConfig: TimesheetConfiguration = this.timesheetConfigStateService.defaultTimesheetConfig;
  notificationweek=Object.values(NotificationWeek);
  notificationConfigForm=new FormGroup({
      deadlineDate : new FormControl(),
      deadlineTime:new FormControl(),
      deadlineWeek : new FormControl()
     });

  public weekConfig= NotificationWeek ;
  isCurrentWeek=this.weekConfig.next_week;
  arrConfig=this.weekConfig as unknown as Array<string>;
  time: number =new Date().setHours(6);
  defaultOpenValue = new Date(0, 0, 0, 0, 0, 0);
  selectedWeekConfig: any;

  constructor(   
    private timesheetConfigStateService: TimesheetConfigurationStateService,
  ) { }

  ngOnInit(): void {debugger;
  
    this.timesheetConfig$ = this.timesheetConfigStateService.timesheetConfiguration$;

    this.timesheetConfig$.subscribe(config => {
      this.timesheetConfig = config ?? this.timesheetConfigStateService.defaultTimesheetConfig;debugger;
      this.selectedWeekConfig=Object.keys(this.weekConfig)[Object.values(this.weekConfig).indexOf(this.timesheetConfig.Deadline!.Week)];
   this.notificationConfigForm.setValue({
   
      deadlineDate : this.timesheetConfig.Deadline?.DeadlineDate,
      deadlineTime:new Date().setHours(this.timesheetConfig.Deadline?.DeadlineTime!),
      deadlineWeek : this.selectedWeekConfig
   });
  });
}
  weekChangeEvent(event:any){
    this.selectedWeekConfig=event.target.value;
  }
  saveNotificationConfiguration(){
    const configFormValues= this.notificationConfigForm.value;

    const deadlineConfig: TimesheetNotificationConfiguration= {
      DeadlineDate : configFormValues.deadlineDate,
      DeadlineTime:configFormValues.deadlineTime.getHours(),
      Week : configFormValues.deadlineWeek
    }
    this.timesheetConfig.Deadline=deadlineConfig;debugger;
    this.timesheetConfigStateService.addTimesheetConfiguration( this.timesheetConfig);
  }

}
