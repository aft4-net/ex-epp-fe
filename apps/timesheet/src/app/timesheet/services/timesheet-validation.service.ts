import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { iif } from 'rxjs';
import { throwIfEmpty } from 'rxjs/operators';
import { ApprovalStatus, TimeEntry, TimesheetApproval, TimesheetConfiguration } from '../../models/timesheetModels';
import { TimesheetService } from './timesheet.service';

@Injectable({
  providedIn: 'root'
})
export class TimesheetValidationService {
  date: Date = new Date();
  fromDate: Date | null = null;
  toDate: Date | null = null;

  constructor() { }

  isValidTimeEntry(timeEntry: TimeEntry, timeEntries: TimeEntry[], timesheetApprovals: TimesheetApproval[], timesheetConfiguration: TimesheetConfiguration) {

    this.date = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate());
    let fromDate = this.fromDate ?? new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate() - this.date.getDay() + 1);
    let toDate = this.toDate ?? new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate() + 6);

    // Future date validation
    if (this.isFutureDate(timeEntry)) {
      return false;
    }

    // 24 hr validation for a time entry
    if (this.isTimeEntryHourMoreThan24(timeEntry)) {
      return false;
    }

    // 24 hr validation for a day
    if (this.isTimeEntriesHourMoreThan24(timeEntry, timeEntries, fromDate, toDate)) {
      return false;
    }

    // Timesheet approval status validation
    if (this.isTimesheetRequestedForApproval(timeEntry, timesheetApprovals)) {
      return false;
    }

    // Displayed week's date validation
    if (this.isDateNotWithInTheWeek(timeEntry, fromDate, toDate)) {
      return false;
    }

    // Working day validation
    if (this.isDateNotWithInWorkingDay(timeEntry, timesheetConfiguration)){
      return false;
    }

    // Working hour validation

    return true;
  }

  private isFutureDate(timeEntry: TimeEntry) {

    if (timeEntry.Date.valueOf() > this.date.valueOf()) {
      return true;
    }

    return false;
  }

  private isTimeEntryHourMoreThan24(timeEntry: TimeEntry): boolean {

    if (timeEntry.Hour > 24) {
      return true;
    }

    return false;
  }

  private isTimeEntriesHourMoreThan24(timeEntry: TimeEntry, timeEntries: TimeEntry[], fromDate: Date, toDate: Date) {
    let totalHour = timeEntries
      .filter(te => te.Guid != timeEntry?.Guid && te.Date >= fromDate && te.Date <= toDate)
      .map(te => te.Hour)
      .reduce((prev, next) => prev + next, 0);

    if (totalHour + timeEntry.Hour > 24) {
      return true;
    }

    return false;
  }

  private isTimesheetRequestedForApproval(timeEntry: TimeEntry, timesheetApprovals: TimesheetApproval[]) {

    if (timesheetApprovals.length === 0) {
      return false;
    }

    let timesheetApproval = timesheetApprovals.filter(tsa => tsa.TimesheetId === timeEntry.TimeSheetId && tsa.ProjectId === timeEntry.ProjectId);

    if (timesheetApproval.length > 0 && timesheetApproval[0].Status != ApprovalStatus.Rejected) {
      return true;
    }

    return false;
  }

  private isDateNotWithInTheWeek(timeEntry: TimeEntry, fromDate: Date, toDate: Date) {

    if (timeEntry.Date < fromDate || timeEntry.Date > toDate) {
      return true;
    }

    return false;
  }

  private isDateNotWithInWorkingDay(timeEntry: TimeEntry, timesheetConfiguration: TimesheetConfiguration) {

    let weekday = timeEntry.Date.toLocaleString("en-us", { weekday: "long" });

    if (timesheetConfiguration.WorkingDays.filter(wk => wk.toUpperCase() === weekday.toUpperCase()).length === 0) {
      return true;
    }

    return false;
  }

}

