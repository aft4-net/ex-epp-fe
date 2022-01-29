import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatBadgeModule } from '@angular/material/badge';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NzToolTipModule } from "ng-zorro-antd/tooltip";

import {CommonModule} from '@angular/common';
import {DateSelectorComponent} from './components/date-selector/date-selector.component';
import {DayAndDateColumnComponent} from './components/day-and-date-column/day-and-date-column.component';
import { MoreProjectsComponent } from './components/more-projects/more-projects.component';
import {NgModule} from '@angular/core';
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import { NzDividerModule } from 'ng-zorro-antd/divider';
import {NzDrawerModule} from "ng-zorro-antd/drawer"
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzInputModule} from "ng-zorro-antd/input"
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzModalModule} from "ng-zorro-antd/modal";
import { NzInputNumberModule } from "ng-zorro-antd/input-number"
import {NzNotificationModule} from 'ng-zorro-antd/notification';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import {NzPopoverModule} from "ng-zorro-antd/popover"
import {NzSelectModule} from "ng-zorro-antd/select"
import {NzTableModule} from 'ng-zorro-antd/table';
import {ProjectNamePaletComponent} from './components/project-name-palet/project-name-palet.component';
import {TimesheetComponent} from "./timesheet.component"
import { TimesheetDetailComponent } from './components/timesheet-detail/timesheet-detail.component';
import {TimesheetHeaderComponent} from './components/timesheet-header/timesheet-header.component';
import {TimesheetRoutingModule} from './timesheet-routing.module';
import { TimesheetService } from './services/timesheet.service';
import { TimesheetValidationService } from './services/timesheet-validation.service';
import { ViewSubmissionsComponent } from './components/view-submissions/view-submissions.component';
import { TimesheetConfigurationComponent } from './components/timesheet-configuration/timesheet-configuration.component';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    TimesheetComponent,
    TimesheetHeaderComponent,
    DateSelectorComponent,
    DayAndDateColumnComponent,
    ProjectNamePaletComponent,
    MoreProjectsComponent,
    ViewSubmissionsComponent,
    TimesheetDetailComponent,
    TimesheetConfigurationComponent
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
    FormsModule,
    NzLayoutModule,
    ReactiveFormsModule,
    NzFormModule,
    NzNotificationModule,
    NzDividerModule,
    NzModalModule,
    NzTableModule,
    NzToolTipModule,
    NzPaginationModule,
    NzInputNumberModule,
    MatBadgeModule,
    MatButtonModule ,
   
   
    
    
  ],
  exports: [TimesheetComponent, TimesheetHeaderComponent],
  providers: [TimesheetValidationService,TimesheetService],
})
export class TimesheetModule {
}
