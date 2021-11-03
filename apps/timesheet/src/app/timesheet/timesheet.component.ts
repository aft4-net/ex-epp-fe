
import { Component, OnInit, ViewChild } from '@angular/core';
import { DayAndDateService } from "./services/day-and-date.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TimesheetService } from './services/timesheet.service';
import { differenceInCalendarDays } from 'date-fns';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { ClickEventType } from '../models/clickEventType';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { TimeEntry, Timesheet } from '../models/timesheetModels';
import { TimeEntryEvent } from '../models/clickEventEmitObjectType';
import { Client } from '../models/client';
import { Project } from '../models/project';
import { TimesheetApiService } from './services/api/timesheet-api.service';
import { Employee } from '../models/employee';


@Component({
  selector: 'exec-epp-app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss'],
})
export class TimesheetComponent implements OnInit {
  clickEventType = ClickEventType.none;
  drawerVisible = false;
  validateForm!: FormGroup;

  timesheet: Timesheet | null = null;
  timeEntry: TimeEntry | null = null;
  weeklyTotalHours: number = 0;

  clients: Client[] | null = null;
  projects: Project[] | null = null;
  employee: Employee[] = [];

  formData = {
    fromDate: new Date(),
    toDate: new Date(),
    client: '', //this.clients,
    project: '', //this.projects
    hours: '',
    note: '',
  };

  date = new Date();
  futereDate: any;
  public weekDays: any[] = [];
  curr = new Date();
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
    private dayAndDateService: DayAndDateService,
    private apiService: TimesheetApiService
  ) { }

  ngOnInit(): void {
    let userId = localStorage.getItem("userId");

    if (userId) {
      this.getTimesheet(userId);

      this.getProjectsAndClients(userId);

    }

    this.validateForm = this.fb.group({
      fromDate: [null, [Validators.required]],
      toDate: [null],
      client: [null, [Validators.required]],
      project: [null, [Validators.required]],
      hours: [null, [Validators.required]],
      note: [null, [Validators.required]],
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

  getTimesheet(userId: string) {
    this.timesheetService.getTimeSheet(userId).subscribe(response => {
      this.timesheet = response ? response[0] : null;
    })
  }

  getProjectsAndClients(userId: string) {
    this.timesheetService.getProjects(userId).subscribe(response => {
      this.projects = response;

      let clientIds = this.projects?.map(project => project.clientId);
      clientIds = clientIds?.filter((client: number, index: number) => clientIds?.indexOf(client) === index)

      this.timesheetService.getClients(clientIds).subscribe(response => {
        this.clients = response;
      });
    });
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
  }

  calculateWeeklyTotalHours(dailyTotalHours: number) {
    this.weeklyTotalHours = this.weeklyTotalHours + dailyTotalHours;
  }

  onDateColumnClicked(clickEventType: ClickEventType, date: Date) {
    this.date = date;
    this.clickEventType = clickEventType;
    if (this.date <= new Date()) {
      this.showFormDrawer();
    } else {
      this.createNotificationError('error');
    }
  }

  onProjectNamePaletClicked(timeEntryEvent: TimeEntryEvent) {
    this.clickEventType = timeEntryEvent.clickEventType;
    this.timeEntry = timeEntryEvent.timeEntry;
    this.showFormDrawer();
  }

  onEditButtonClicked(clickEventType: ClickEventType) {
    this.clickEventType = clickEventType;
    this.showFormDrawer();
  }

  showFormDrawer() {
    if (this.clickEventType == ClickEventType.showFormDrawer) {
      (this.projects?.length === 1) ? this.formData.project = this.projects[0].id.toString() : this.formData.project = '';
      (this.clients?.length === 1) ? this.formData.client = this.clients[0].id.toString() : this.formData.client = '';

      if (this.timeEntry) {
        let clientId = this.projects?.filter(project => project.id == this.timeEntry?.projectId)[0].clientId.toString();
        this.formData.client = clientId ? clientId : "";
        this.formData.project = this.timeEntry.projectId.toString();
        this.formData.hours = this.timeEntry.hours.toString();
        this.formData.note = this.timeEntry.note;
      }

      this.drawerVisible = true;
    }

    this.clickEventType = ClickEventType.none;
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
        fromDate: this.validateForm.value.fromDate != null ? this.validateForm.value.fromDate.toISOString().substring(0, 10) : null,
        toDate: this.validateForm.value.toDate != null ? this.validateForm.value.toDate.toISOString().substring(0, 10) : null,
        client: this.validateForm.value.client,
        project: this.validateForm.value.project,
        hours: this.validateForm.value.hours,
        note: this.validateForm.value.note,
      };

      console.log('sssssssssssssssssssss');
      console.log(dataToSend);
      // this.timesheetService.addTimesheet(dataToSend);
      //this.createNotification('success');

      this.validateForm.reset();
      this.closeFormDrawer();
    } catch (err) {
      console.error(err);
    }
  }

  closeFormDrawer(): void {
    this.timeEntry = null;
    this.validateForm.reset();
    this.drawerVisible = false;
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
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
