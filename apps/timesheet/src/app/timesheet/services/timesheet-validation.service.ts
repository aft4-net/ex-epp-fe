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
  date: Date;
  fromDate: Date;
  toDate: Date;
  message: string | null = null;

  constructor() { 
    this.date = new Date();
    this.date = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate());
    this.fromDate = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate() - this.date.getDay() + 1);
    this.toDate = new Date(this.fromDate.getFullYear(), this.fromDate.getMonth(), this.fromDate.getDate() + 6);
  }

  isValidForAdd(timeEntry: TimeEntry, timeEntries: TimeEntry[], timesheetApprovals: TimesheetApproval[], timesheetConfiguration: TimesheetConfiguration){
    this.message = null;

    return this.isValidTimeEntry(timeEntry, timeEntries, timesheetApprovals, timesheetConfiguration);
  }

  isValidForUpdate(timeEntry: TimeEntry, timeEntries: TimeEntry[], timesheetApprovals: TimesheetApproval[], timesheetConfiguration: TimesheetConfiguration){
    this.message = null;

    return this.isValidTimeEntry(timeEntry, timeEntries, timesheetApprovals, timesheetConfiguration);
  }

  isValidForDelete(timeEntry: TimeEntry, timesheetApprovals: TimesheetApproval[]){
    this.message = null;

    if ( this.isTimesheetRequestedForApproval(timeEntry, timesheetApprovals) ){
      return false;
    }

    if( this.isDateNotWithInTheWeek(timeEntry, this.fromDate, this.toDate)) {
      return false;
    }

    return true;
  }

  isValidForApproval(timeEntries: TimeEntry[], timesheetConfiguration: TimesheetConfiguration){
    let dates = [... new Set(timeEntries.map(te => te.Date))];
    let weekdays = dates.map(date => new Date(date).toLocaleString("en-us", { weekday: "long" }));

    this.message = null;

    for(const workingDay of timesheetConfiguration.WorkingDays){
      if(weekdays.filter(wd => wd.toUpperCase() === workingDay.toUpperCase()).length === 0){
        return false;
      }
    }

    for(const timeEntry of timeEntries){
      if(this.isDateNotWithInTheWeek(timeEntry, this.fromDate, this.toDate)){
        return false;
      }
    }

    if (timesheetConfiguration.WorkingHour && timesheetConfiguration.WorkingHour > 0){
      let totalHour = 0;
      for(const date of dates) {
        totalHour = timeEntries.filter(te => te.Date.valueOf() === date.valueOf())
        .map(te => te.Hour)
        .reduce((prev, next) => prev + next, 0);

        if (totalHour < timesheetConfiguration.WorkingHour){
          return false;
        }      
      }
    }    

    return true;
  }

  isValidTimeEntry(timeEntry: TimeEntry, timeEntries: TimeEntry[], timesheetApprovals: TimesheetApproval[], timesheetConfiguration: TimesheetConfiguration) {
    this.message = null;

    // Future date validation
    if (this.isFutureDate(timeEntry)) {
      return false;
    }

    // 24 hr validation for a time entry
    if (this.isTimeEntryHourMoreThan24(timeEntry)) {
      return false;
    }

    // 24 hr validation for a day
    if (this.isTimeEntriesHourMoreThan24(timeEntry, timeEntries, this.fromDate, this.toDate)) {
      return false;
    }

    // Timesheet approval status validation
    if (this.isTimesheetRequestedForApproval(timeEntry, timesheetApprovals)) {
      return false;
    }

    // Displayed week's date validation
    if (this.isDateNotWithInTheWeek(timeEntry, this.fromDate, this.toDate)) {
      return false;
    }

    // Working day validation

    // Working hour validation

    return true;
  }

  private isFutureDate(timeEntry: TimeEntry) {
    const date = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate());
    if (timeEntry.Date.valueOf() > date.valueOf()) {
      this.message = "Can't fill timesheet for the future.";
      return true;
    }

    return false;
  }

  private isTimeEntryHourMoreThan24(timeEntry: TimeEntry): boolean {

    if (timeEntry.Hour > 24) {
      this.message = "Hours cannot exceed the maximum days limit.";
      return true;
    }

    return false;
  }

  private isTimeEntriesHourMoreThan24(timeEntry: TimeEntry, timeEntries: TimeEntry[], fromDate: Date, toDate: Date) {debugger;
    fromDate = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate());
    toDate = new Date(toDate.getFullYear(), toDate.getMonth(), toDate.getDate());
    let totalHour = timeEntries
      .filter(te => new Date(te.Date).valueOf() === timeEntry?.Date.valueOf() && new Date(te.Date).valueOf() >= fromDate.valueOf() && new Date(te.Date).valueOf() <= toDate.valueOf())
      .map(te => te.Hour)
      .reduce((prev, next) => prev + next, 0);

    if (totalHour + timeEntry.Hour > 24) {
      this.message = "Hours cannot exceed the maximum days limit.";
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
      this.message = "Can't add or edit entries when the timesheet is approved or submitted for approval.";
      return true;
    }

    return false;
  }

  private isDateNotWithInTheWeek(timeEntry: TimeEntry, fromDate: Date, toDate: Date) {
    fromDate = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate());
    toDate = new Date(toDate.getFullYear(), toDate.getMonth(), toDate.getDate());
    
    if (timeEntry.Date < fromDate || timeEntry.Date > toDate) {
      this.message = "The Time entry date should be within the displayed week.";
      return true;
    }

    return false;
  }
}

