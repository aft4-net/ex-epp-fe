import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { PermissionListService } from 'libs/common-services/permission.service';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { PaginatedResult } from '../../../models/PaginatedResult';
import { TimesheetApproval } from '../../../models/timesheetModels';
import { DayAndDateService } from '../../services/day-and-date.service';
import { TimesheetService } from '../../services/timesheet.service';
import { UserPermissionStateService } from '../../state/user-permission-state.service';
//import { PaginatedResult } from ''

@Component({
  selector: 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.scss']
})
export class DateSelectorComponent implements OnInit {
  @Input() dates10: any; // decorate the property with @Input()
  @Input() dates11: any; // decorate the property with @Input()
  @Output() valueChange = new EventEmitter();
  @Output() valueChangeNextWeek = new EventEmitter();
  @Output() valueChangeLastWeek = new EventEmitter();
  @Input() isToday = true;

  date = null;
  CounterNextWeek = 0;
  CounterLastWeek = 0;
  loggedInUserInfo?: any; 
  supervisorId!: string | null;
  pageSizeG =7;
  pageIndexG=1;
  searchKeyG = "";
  statusG = 'Requested';
  sortByG='';
  projectNameG?:  string[];
  clientNameG?: string[];  
  weekG="";
  sortG="Ascending";
  TimesheetApprovalResponse!: TimesheetApproval[];
  totalResponse!: number;
  totalPageResponse!: number;
  totalRecordsAll = 10;
  constructor(
    private readonly _dayAndDateService: DayAndDateService,
    private readonly _permissionService: PermissionListService,
    private readonly timeSheetService: TimesheetService,

    ) { }

  ngOnInit(): void {
    this.timesheetSubmissionPagination(
      this.pageIndexG,
     this.pageSizeG,
     this.searchKeyG,
     this.sortByG,
     this.weekG,
     this.sortG,
     this.statusG,
     this.projectNameG,
     this.clientNameG);
    
  }
  timesheetSubmissionPagination(pageIndex: number,pageSize: number,
    searchKey: string,sortBy: string, week: string, sort: string ,status:string,projectName?: string[],
    clientName?: string[]) {

    this.pageIndexG = pageIndex;
    this.pageSizeG = pageSize;
    this.searchKeyG =searchKey;
    this.sortByG = sortBy;
    this.projectNameG = projectName;
    this.clientNameG = clientName;
    this.weekG = "";
    this.sortG = sort;
    this.statusG = status;
    if(this.authorize('Timesheet_Admin')){
      this.supervisorId = ''
    }
   else{
      if(localStorage.getItem('loggedInUserInfo')){
        // eslint-disable-next-line prefer-const
        this.loggedInUserInfo = localStorage.getItem('loggedInUserInfo');
        const user = JSON.parse(this.loggedInUserInfo);
        this.supervisorId = user['EmployeeGuid'];
      }
    }

    this.timeSheetService

      .getTimesheetApprovalPagination(
        this.pageIndexG,
         this.pageSizeG,
         this.supervisorId,
         this.searchKeyG,
         this.sortByG,
         this.projectNameG,
         this.clientNameG,this.weekG,this.sortG,this.statusG

      )

      .subscribe((response: PaginatedResult<TimesheetApproval[]>) => {
       this.totalResponse = response.pagination.totalRecord;
      });

  }


  onTodaysButtonClick() {
    const date = this._dayAndDateService.getWeeksFirstDate(new Date())
    this.valueChange.emit(new Date());
  }

  onChange(result: Date): void {
    this.valueChange.emit(result);
  }

  valueChangedNextWeek() {
    this.CounterNextWeek = this.CounterNextWeek + 1;
    this.valueChangeNextWeek.emit(this.CounterNextWeek);
  }
  valueChangedLastWeek() {
    this.CounterLastWeek = this.CounterLastWeek;
    this.valueChangeLastWeek.emit(this.CounterLastWeek);
  }
  authorize(key: string){
    return this._permissionService.authorizedPerson(key);
  }

}
