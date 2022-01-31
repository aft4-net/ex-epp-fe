import { SortPipe } from './../core/pipes/sort.pipe'
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './components/table/table.component';
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {NzDrawerModule} from "ng-zorro-antd/drawer"
import {NzSelectModule} from "ng-zorro-antd/select"
import {NzInputModule} from "ng-zorro-antd/input"
import {NzPopoverModule} from "ng-zorro-antd/popover"
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzNotificationModule} from 'ng-zorro-antd/notification';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import {NzModalModule} from "ng-zorro-antd/modal";
import { NzToolTipModule } from "ng-zorro-antd/tooltip";
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown'
import {TimesheetApprovalComponent} from "./timesheet-approval.component"
import {TimesheetApprovalRoutingModule} from './timesheet-approval-routing.module';
import { TimesheetModule } from '../timesheet/timesheet.module';
import { TimesheetDetailViewComponent } from './components/timesheet-detail-view/timesheet-detail-view.component';




@NgModule({
  declarations: [
    TableComponent,
    TimesheetApprovalComponent,
    SortPipe,
    TimesheetDetailViewComponent
  ],
  imports: [
    CommonModule,
    CommonModule,
    TimesheetApprovalRoutingModule,
    TimesheetModule,
    NzBreadCrumbModule,
    NzButtonModule,
    NzIconModule,
    NzDatePickerModule,
    NzDrawerModule,
    NzSelectModule,
    NzInputModule,
    NzPopoverModule,
    NzAlertModule,
    FormsModule,
    NzLayoutModule,
    ReactiveFormsModule,
    NzFormModule,
    NzNotificationModule,
    NzDividerModule,
    NzModalModule,
    NzTableModule,
    NzToolTipModule,
    NzTabsModule,
    NzPaginationModule,
    NzCommentModule,
    NzNotificationModule,
    NzMenuModule,
    NzDropDownModule,
    
    
    
    
  ]
})
export class TimesheetApprovalModule { }
