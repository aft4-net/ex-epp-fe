export interface Timesheet {
    Guid: string;
    FromDate: Date;
    ToDate: Date;
    TotalHours: number;
    Status: number;
    EmployeeId: string;
}

export interface TimeEntry {
    Guid: string;
    Note: string;
    Date: Date;
    Index: number;
    Hour: number;
    ProjectId: string;
    TimeSheetId: string;
}

interface Response {
    ResponseStatus: string;
    Message: string;
    Ex?: any;
}

export interface TimesheetResponse extends Response {
    Data: Timesheet | null;
}

export interface TimesheetsResponse extends Response {
    Data: Timesheet[] | null;
}

export interface TimeEntryResponse extends Response {
    Data: TimeEntry | null;
}

export interface TimeEntriesResponse extends Response {
    Data: TimeEntry[] | null;
}