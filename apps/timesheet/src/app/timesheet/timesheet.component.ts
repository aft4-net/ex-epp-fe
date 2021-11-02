import {Component, OnInit, ViewChild} from '@angular/core';
import {DatePipe, WeekDay} from "@angular/common";
import {DaydateModel} from "../models/daydate.model";
import {DayAndDateService} from "./services/day-and-date.service";

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TimesheetService} from './services/timesheet.service';
import {differenceInCalendarDays} from 'date-fns';
import {ClickEventLocation} from '../models/clickEventLocation';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {NzDatePickerComponent} from 'ng-zorro-antd/date-picker';

@Component({
  selector: 'exec-epp-app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss']
})
export class TimesheetComponent implements OnInit {
  clickEventLocation = ClickEventLocation.formDrawer;
  drawerVisible = false;
  validateForm!: FormGroup;

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
  futereDate: any;
  public weekDays: any[] = [];
  curr = new Date;
  firstday1: any;
  lastday1: any;
  parentCount = null;
  nextWeeks = null;
  lastWeeks = null;
  startValue: Date | null = null;
  endValue: Date | null = null;
  @ViewChild('endDatePicker') endDatePicker!: NzDatePickerComponent;
  endValue1 = new Date();
  disabledDate = (current: Date): boolean =>
    // Can not select days before today and today
    differenceInCalendarDays(current, this.date) > 0;

  constructor(
    private fb: FormBuilder,
    private timesheetService: TimesheetService,
    private notification: NzNotificationService,
    private dayAndDateService: DayAndDateService
  ) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      fromDate: [null, [Validators.required]],
      toDate: [null],
      client: [null, [Validators.required]],
      project: [null, [Validators.required]],
      hour: [null, [Validators.required]],
      notes: [null, [Validators.required]],
    });

    this.weekDays = this.dayAndDateService.getWeekByDate(this.curr);
    this.firstday1 = this.dayAndDateService.getWeekendFirstDay();
    this.lastday1 = this.dayAndDateService.getWeekendLastDay();
    this.calcualteNoOfDaysBetweenDates();
  }

// To calculate the time difference of two dates
  calcualteNoOfDaysBetweenDates() {
    let date1 = new Date("06/21/2019");
    let date2 = new Date("07/30/2019");
    let Difference_In_Time = date2.getTime() - date1.getTime();

// To calculate the no. of days between two dates
    let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    console.log(Difference_In_Days);
  }

  disabledDate1 = (current: Date): boolean =>
    // Can not select days before today and today
    differenceInCalendarDays(current, this.date) > 0;

  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue || !this.endValue) {
      return false;
    }
    return startValue.getTime() < this.endValue1.getTime();
  };

  disabledEndDate = (endValue: Date): boolean => {
    if (!endValue || !this.startValue) {
      return false;
    }
    return endValue.getTime() <= this.startValue.getTime();
  };


  selectedDate(count: any) {
    this.parentCount = count;
    if (count != null) {
      this.weekDays = this.dayAndDateService.getWeekByDate(count);
      this.firstday1 = this.dayAndDateService.getWeekendFirstDay();
      this.lastday1 = this.dayAndDateService.getWeekendLastDay();
    } else {
      window.location.reload();
    }
  }

  selectedDateCanceled(curr: any) {
    if (curr != null) {
      this.weekDays = this.dayAndDateService.getWeekByDate(curr);
      this.firstday1 = this.dayAndDateService.getWeekendFirstDay();
      this.lastday1 = this.dayAndDateService.getWeekendLastDay();
    } else {
      window.location.reload();
    }
  }

  nextWeek(count: any) {
    this.nextWeeks = count;
    console.log(this.nextWeeks);
    let ss = this.dayAndDateService.getWeekendLastDay();
    this.weekDays = this.dayAndDateService.nextWeekDates(ss, count);
    this.firstday1 = this.dayAndDateService.getWeekendFirstDay();
    this.lastday1 = this.dayAndDateService.getWeekendLastDay();
  }

  lastastWeek(count: any) {
    this.lastWeeks = count;
    console.log(this.lastWeeks);
    let ss = this.dayAndDateService.getWeekendFirstDay();
    this.weekDays = this.dayAndDateService.lastWeekDates(ss, count);
    this.firstday1 = this.dayAndDateService.getWeekendFirstDay();
    this.lastday1 = this.dayAndDateService.getWeekendLastDay();
    // this.lastWeeks = count;
    // let ss = this.dayAndDateService.getWeekendFirstDay();
    // console.log(ss);
    // this.weekDays = this.dayAndDateService.nextWeekDates(ss, count);
    // console.log( this.weekDays);
    // this.firstday1 = this.dayAndDateService.getWeekendFirstDay();
    // this.lastday1 = this.dayAndDateService.getWeekendLastDay();
  }

  checkFutureDate(event: Date) {
    this.futereDate = event;
  }

  onDateColumnClicked(clickEventLocation: ClickEventLocation) {
    this.clickEventLocation = clickEventLocation;
    // this.showFormDrawer();
    if (this.futereDate <= this.date) {
      this.showFormDrawer();
    } else {
      this.drawerVisible = false;
      this.createNotificationError('error');
      console.log("can't show time entry for future date");
    }
    this.futereDate=null;
  }

  onEditButtonClicked(clickEventLocation: ClickEventLocation) {
    this.clickEventLocation = clickEventLocation;
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
    if (this.clickEventLocation == ClickEventLocation.dateColumn) {
      this.drawerVisible = true;
    }

    console.log({DrawerVisible: this.drawerVisible})

    this.clickEventLocation = ClickEventLocation.formDrawer;
  }

  closeFormDrawer() {
    this.drawerVisible = false;
  }

  createNotificationError(type: string): void {
    this.notification.create(
      type,
      'Timesheet',
      'Future date timesheet entry not allowed!'
    );
  }

  createNotification(type: string): void {
    this.notification.create(
      type,
      'Timesheet',
      'Your Timesheet Added Successfully.'
    );
  }
}
