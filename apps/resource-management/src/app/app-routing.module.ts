import { RouterModule, Routes } from '@angular/router';

import { EmployeeDetailComponent } from './Features/Components/employee/employee-detail/employee-detail.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', component: EmployeeDetailComponent },
 


  { path: 'employee', loadChildren: () => import('./Features/Components/employee/employee.module').then(m => m.EmployeeModule) },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
