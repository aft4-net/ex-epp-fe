import { RouterModule, Routes } from '@angular/router';

import { EmployeeDetailComponent } from './employee-detail.component';
import { MainLayoutComponent } from '../../../components/main-layout/main-layout.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'add-employee',
    component: MainLayoutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeDetailRoutingModule {}
