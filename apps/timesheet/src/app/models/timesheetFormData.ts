export interface TimesheetFormData {
    fromDate: Date | null;
    toDate: Date | null;
    clientId: number | null;
    projectId: number | null;
    hours: number | null;
    note: string | null;
}