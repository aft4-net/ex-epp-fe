import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { EppdashboardComponent } from './features/components/eppdashboard/eppdashboard.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', component: EppdashboardComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
