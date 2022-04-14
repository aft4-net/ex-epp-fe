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
export enum DaySection{
    am,
    pm
}




export enum NotificationWeek {
   next_week= "Following week",
  current_week = "Current week",
 }

interface Response {
    ResponseStatus: string;
    Message: string;
    Ex?: any;
}

export interface TimesheetConfigResponse extends Response {
    Data: TimesheetConfiguration;
}
 