export interface Timesheet {
    guid: string;
    fromDate: Date;
    toDate: Date;
    totalHours: number;
    status: number;
    employeeId: string;
}

export interface TimeEntry {
    guid: string;
    note: string;
    date: Date;
    index: number;
    hour: number;
    projectId: string;
    timeSheetId: string;
}

export interface TimesheetApproval {
  timesheetId: string;
  projectId: string;
  status: number;
}

interface Response {
    ResponseStatus: string;
    Message: string;
    Ex?: any;
}

export interface TimesheetResponse extends Response {
    data: Timesheet | null;
}

export interface TimesheetsResponse extends Response {
    data: Timesheet[] | null;
}

export interface TimeEntryResponse extends Response {
    data: TimeEntry | null;
}

export interface TimeEntriesResponse extends Response {
    data: TimeEntry[] | null;
}

export interface TimesheetApprovalResponse extends Response{
  data: TimesheetApproval[] | null;
}
