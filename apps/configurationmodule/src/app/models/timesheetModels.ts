export interface StartOfWeek {
    DayOfWeek: string;
    EffectiveDate: Date;
}

export interface WorkingHours {
    Min: number;
    Max: number;
}

export interface TimesheetEscalation {
    ToSupervisor: number;
    ToHR: number;
}

export enum NotificationWeek {
    current_week = "Current week",
    next_week= "Following week",  
}

export interface TimesheetNotificationConfiguration{
    DeadlineDate : string;
    DeadlineTime: number;
    Week : NotificationWeek;
    TimeZone:number;
}

export interface TimesheetConfiguration {
    StartOfWeeks: StartOfWeek[];
    WorkingDays: string[];
    WorkingHours: WorkingHours;
    TimesheetEscalation: TimesheetEscalation;
    Deadline?:TimesheetNotificationConfiguration,     
}

interface Response {
    ResponseStatus: string;
    Message: string;
    Ex?: any;
}

export interface TimesheetConfigResponse extends Response {
    Data: TimesheetConfiguration;
}
 