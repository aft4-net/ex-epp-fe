import { NgModule } from '@angular/core';
import { Routes, RouterModule} from "@angular/router";
import { TimesheetDetailComponent } from './components/timesheet-detail/timesheet-detail.component';

import { TimesheetComponent } from './timesheet.component';

const routes: Routes = [
  {
    path: "",
    component: TimesheetComponent
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
