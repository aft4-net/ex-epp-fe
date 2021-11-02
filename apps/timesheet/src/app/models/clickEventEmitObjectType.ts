import { ClickEventType } from "./clickEventType";
import { TimeEntry } from "./timesheetModels";

export interface TimeEntryEvent {
    clickEventType: ClickEventType;
    timeEntry: TimeEntry | null;
}

export interface DateEvent {
    clickEventType: ClickEventType;
    timesheetDate: Date;
}