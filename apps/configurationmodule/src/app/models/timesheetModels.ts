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
    Deadline : TimesheetDeadline;
}

export interface TimesheetDeadline{
    DeadlineDate : string;
    Week : NotificationWeek;
}


export enum NotificationWeek {
  current_week="Current week",
  next_week="Next week",
}

interface Response {
    ResponseStatus: string;
    Message: string;
    Ex?: any;
}

export interface TimesheetConfigResponse extends Response {
    Data: TimesheetConfiguration;
}
 