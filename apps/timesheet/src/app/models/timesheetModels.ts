export interface TimesheetApprovalProjectDetails  {
  projectName: string;
}

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

export enum ApprovalStatus {
    Requested,
    Approved,
    Rejected
}

export interface TimesheetApproval {
    //TimesheetApprovalGuid:string;
    TimesheetId: string;
    ProjectId: string;
    Status: ApprovalStatus;
    Comment?:string;
    EmployeeName:string;
    FromDate:Date;
    ToDate:Date;
    CreatedDate:Date;
    ClientName:string;
    TotalHours:number;
    ProjectName:string;
}
export interface TimesheetBulkApproval {
    TimesheetApprovalGuid:string;
    TimesheetId: string;
    ProjectId: string;
    Status: ApprovalStatus;
    Comment?:string;
    EmployeeName:string;
    FromDate:Date;
    ToDate:Date;
    CreatedDate:Date;
    ClientName:string;
    TotalHours:number;
    ProjectName:string;
}

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

export interface TimesheetApprovalResponse extends Response {
    Data: TimesheetApproval[] | null;
}

export interface TimesheetConfigResponse extends Response {
    Data: TimesheetConfiguration;
}

export interface ApprovalEntity {
  TimesheetId: string;
  ProjectId:string;
  Status:ApprovalStatus;
}
