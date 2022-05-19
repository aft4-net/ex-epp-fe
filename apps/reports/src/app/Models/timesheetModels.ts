export interface StartOfWeek {
    DayOfWeek: string;
    EffectiveDate: Date;
}

export interface WorkingHours {
    Min: number;
    Max: number;
}

export interface TimesheetEscalation {
    FirstEscalation: number;
    SecondEscalation: number;
}

export enum NotificationWeek {
    current_week = "current_week",
    next_week = "next_week",
}

export interface TimesheetDeadline {
    DeadlineDate: string;
    DeadlineTime: number;
    Week: NotificationWeek;
    TimeZone: number;
}

export interface TimesheetConfiguration {
    StartOfWeeks: StartOfWeek[];
    WorkingDays: string[];
    WorkingHours: WorkingHours;
    TimesheetDeadline: TimesheetDeadline;
    TimesheetEscalation: TimesheetEscalation;
}

interface Response {
    ResponseStatus: string;
    Message: string;
    Ex?: any;
}

export interface TimesheetConfigResponse extends Response {
    Data: TimesheetConfiguration;
}
