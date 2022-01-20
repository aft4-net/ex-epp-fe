import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { ViewSubmissionsComponent } from './components/view-submissions/view-submissions.component';
import { TimesheetDetailComponent } from './components/timesheet-detail/timesheet-detail.component';

import { TimesheetComponent } from './timesheet.component';
import { TimesheetConfigurationComponent } from './components/timesheet-configuration/timesheet-configuration.component';

const routes: Routes = [
  {
    path: "",
    component: TimesheetComponent,
    children: [
      {
        path: "",
        component: TimesheetDetailComponent
      },
      {
        path: "view-submissions",
        component: ViewSubmissionsComponent,
        data: {
          breadcrumb: "View Submission"
        }
      },
      {
        path: "timesheet-configuration",
        component: TimesheetConfigurationComponent,
        data: {
          breadcrumb: "Configuration"
        }
      }
    ]
  },
  {
    path: 'timesheet-approval',
    loadChildren: () =>
      import('../timesheet-approval/timesheet-approval.module').then(
        (m) => m.TimesheetApprovalModule
      ),
    data: { breadcrumb: 'Timesheet-approval' },
  }
]

@NgModule({
  declarations: [
  ],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class TimesheetRoutingModule { }
