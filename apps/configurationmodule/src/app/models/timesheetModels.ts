import { Data } from "@angular/router";

export interface StartOfWeek {
    DayOfWeek: string;
    EffectiveDate: Date;
}

export interface WorkingHours {
    Min: number;
    Max: number;
}

export interface TimesheetConfiguration {
    StartOfWeeks: StartOfWeek[];
    WorkingDays: string[];
    WorkingHours: WorkingHours;
    Deadline?:TimesheetNotificationConfiguration
   
}
export interface TimesheetNotificationConfiguration{
    DeadlineDate : string;
    DeadlineTime: number;
    Week : NotificationWeek;
}


export enum NotificationWeek {
    current_week = "Current week",
   next_week= "Following week",
  
 }

interface Response {
    ResponseStatus: string;
    Message: string;
    Ex?: any;
}

export interface TimesheetConfigResponse extends Response {
    Data: TimesheetConfiguration;
}
 