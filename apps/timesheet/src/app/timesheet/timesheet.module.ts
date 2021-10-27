import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzBreadCrumbModule } from "ng-zorro-antd/breadcrumb";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzIconModule} from "ng-zorro-antd/icon";
import { NzDatePickerModule } from "ng-zorro-antd/date-picker";
import { NzDrawerModule } from "ng-zorro-antd/drawer"
import { NzSelectModule } from "ng-zorro-antd/select"
import { NzInputModule } from "ng-zorro-antd/input"
import { NzPopoverModule } from "ng-zorro-antd/popover"

import { TimesheetComponent } from "./timesheet.component"
import { TimesheetRoutingModule } from './timesheet-routing.module';
import { TimesheetHeaderComponent } from './components/timesheet-header/timesheet-header.component';
import { DateSelectorComponent } from './components/date-selector/date-selector.component';
import { DayAndDateColumnComponent } from './components/day-and-date-column/day-and-date-column.component';
import { ProjectNamePaletComponent } from './components/project-name-palet/project-name-palet.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    TimesheetComponent,
    TimesheetHeaderComponent,
    DateSelectorComponent,
    DayAndDateColumnComponent,
    ProjectNamePaletComponent
  ],
    imports: [
        CommonModule,
        TimesheetRoutingModule,
        NzBreadCrumbModule,
        NzButtonModule,
        NzIconModule,
        NzDatePickerModule,
        NzDrawerModule,
        NzSelectModule,
        NzInputModule,
        NzPopoverModule,
        FormsModule
    ]
})
export class TimesheetModule { }
