import { RouterModule, Routes } from '@angular/router';

import { EmployeeDetailComponent } from './Features/Components/employee/employee-detail/employee-detail.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  // { path: '', component: PersonalInfoComponent },
  // { path: 'Organization-Detail', component: OrganizationDetailComponent },
  // { path: 'personal-address', component: PersonalAddressesComponent },
  // { path: 'emergency-address', component: EmergencyContactAddressesComponent },
  // { path: 'Organization-Detail', component: OrganizationDetailComponent },
  // { path: 'personal-info', component: PersonalInfoComponent },
  // { path: 'emergency-contact', component: AddEmergencycontactComponent },
  // { path: 'family-detail', component: FamilyDetailComponent },
  { path: 'employee-detail', component: EmployeeDetailComponent },



  { path: 'employee', loadChildren: () => import('./Features/Components/employee/employee.module').then(m => m.EmployeeModule) },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
