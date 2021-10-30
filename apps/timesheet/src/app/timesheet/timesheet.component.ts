import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {TimesheetService} from './services/timesheet.service';
import {DayAndDateService} from "./services/day-and-date.service";
import {ClickEventType} from '../models/clickEventType';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import { Timesheet } from '../models/timesheetModels';

@Component({
  selector: 'exec-epp-app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss']
})
export class TimesheetComponent implements OnInit {
  clickEventType = ClickEventType.none;
  drawerVisible = false;
  validateForm!: FormGroup;

  timesheet: Timesheet | null = null;

  clients = [
    {id: 1, client: 'client one'},
    {id: 2, client: 'client two'},
    {id: 3, client: 'client three'},
  ];
  projects = [
    {id: 1, project: 'project one'},
    {id: 2, project: 'project two'},
    {id: 3, project: 'project three'},
  ];

  formData = {
    timesheetDate: new Date(),
    client: '',
    project: '',
    hours: null,
    notes: '',
  };

  date = new Date();
  public weekDays: any[] = [];
  curr = new Date;
  firstday1: any;
  lastday1: any;
  parentCount = null;
  nextWeeks = null;
  lastWeeks = null;


  constructor(
    private fb: FormBuilder,
    private timesheetService: TimesheetService,
    private notification: NzNotificationService,
    private dayAndDateService: DayAndDateService
  ) {
  }

  ngOnInit(): void {
    let userId = localStorage.getItem("userId");
    if(userId){
      this.timesheetService.getTimeSheet(userId).subscribe(response => {
        this.timesheet = response ? response[0] : null;
      })
    }

    this.validateForm = this.fb.group({
      fromDate: [null, [Validators.required]],
      toDate: [null],
      client: [null, [Validators.required]],
      project: [null, [Validators.required]],
      hour: [null, [Validators.required]],
      notes: [null, [Validators.required]],
    });
    this.weekDays = this.dayAndDateService.weekByDate(this.curr);
  }

  selectedDate(count: any) {
    this.parentCount = count;
    if (count != null) {
      this.weekDays = this.dayAndDateService.weekByDate(count);
    } else {
      window.location.reload();
    }
  }

  selectedDateCanceled(curr: any) {
    if (curr != null) {
      this.weekDays = this.dayAndDateService.weekByDate(curr);
    } else {
      window.location.reload();
    }
  }

nextWeek(count: any) {
    this.nextWeeks = count;
    console.log(this.nextWeeks);
    let ss = this.dayAndDateService.getWeekend();
    this.weekDays = this.dayAndDateService.nextWeekDates(ss, count);
  }

  lastastWeek(count: any) {
    this.lastWeeks = count;
    console.log(this.lastWeeks);
    let ss = this.dayAndDateService.getWeekendFirstDay();
    this.weekDays = this.dayAndDateService.lastWeekDates(ss, count);
  }


  onDateColumnClicked(clickEventType: ClickEventType) {
    this.clickEventType = clickEventType;
    this.showFormDrawer();
  }

  onEditButtonClicked(clickEventType: ClickEventType) {
    this.clickEventType = clickEventType;
    this.showFormDrawer();
  }

  resetForm(): void {
    this.validateForm.reset();
  }

  submitForm(): void {

    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }

    try {
      let dataToSend = {
        timesheetDate: this.validateForm.value.fromDate != null ? this.validateForm.value.fromDate.toISOString().substring(0, 10) : null,
        client: this.validateForm.value.client,
        project: this.validateForm.value.project,
        hour: this.validateForm.value.hour,
        note: this.validateForm.value.notes,
      };

      console.log('sssssssssssssssssssss');
      console.log(dataToSend);
      // this.timesheetService.addTimesheet(dataToSend);
      this.createNotification('success');

    } catch (err) {
      console.error(err);
    }
  }

  showFormDrawer() {
    if (this.clickEventType == ClickEventType.dateColumn) {
      this.drawerVisible = true;
    }

    console.log({DrawerVisible: this.drawerVisible})

    this.clickEventType = ClickEventType.formDrawer;
  }

  closeFormDrawer() {
    this.drawerVisible = false;
  }

  createNotification(type: string): void {
    this.notification.create(
      type,
      'Timesheet',
      'Your Timesheet Added Successfully.'
    );
  }
}
