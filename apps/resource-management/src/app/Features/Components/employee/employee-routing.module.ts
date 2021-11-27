import { RouterModule, Routes } from '@angular/router';

import { AddEmergencycontactComponent } from './add-emergencycontact/add-emergencycontact.component';
import { EmployeeComponent } from './employee.component';
import { FamilyDetailComponent } from './family-detail/family-detail.component';
import { NgModule } from '@angular/core';
import { OrganizationDetailComponent } from './organization-detail/organization-detail.component';
import { PersonalAddressesComponent } from './personal-addresses/personal-addresses.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';

const routes: Routes = [
  { path: 'add-employee', component: EmployeeComponent },

  { path: 'add-employee/person-detail', component: PersonalInfoComponent },
  {
    path: 'add-employee/Organization-Detail',
    component: OrganizationDetailComponent,
  },
  {
    path: 'personal-address',
    component: PersonalAddressesComponent,
  },

  {
    path: 'add-employee/Organization-Detail',
    component: OrganizationDetailComponent,
  },

  {
    path: 'add-employee/emergency-contact',
    component: AddEmergencycontactComponent,
  },
  { path: 'add-employee/family-detail', component: FamilyDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule {}
