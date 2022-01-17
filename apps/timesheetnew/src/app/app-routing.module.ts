import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { ViewSubmissionsComponent } from './timesheet/components/view-submissions/view-submissions.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { breadcrumb: 'Home' } },
  { path: 'view-submission', component: ViewSubmissionsComponent },
  {
    path: 'timesheet',
    loadChildren: () =>
      import('./timesheet/timesheet.module').then((m) => m.TimesheetModule),
    data: { breadcrumb: 'Timesheet' },
  },
  {
    path: 'timesheet-approval',
    loadChildren: () =>
      import('./timesheet-approval/timesheet-approval.module').then(
        (m) => m.TimesheetApprovalModule
      ),
    data: { breadcrumb: 'Timesheet-approval' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
