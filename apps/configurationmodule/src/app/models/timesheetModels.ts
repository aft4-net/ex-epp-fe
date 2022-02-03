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
}

interface Response {
    ResponseStatus: string;
    Message: string;
    Ex?: any;
}

export interface TimesheetConfigResponse extends Response {
    Data: TimesheetConfiguration;
}
