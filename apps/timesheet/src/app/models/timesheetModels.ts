export interface Timesheet {
    guid: number;
    fromDate: Date;
    toDate: Date;
    totalHours?: number;
    status: boolean;
    employeeId: number;
}

export interface TimeEntry {
    guid: number;
    note: string;
    date: Date;
    index: number;
    hour: number;
    projectId: number;
    timesheetId: number;
}