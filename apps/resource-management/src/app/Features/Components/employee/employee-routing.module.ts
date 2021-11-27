import { RouterModule, Routes } from '@angular/router';

import { AddEmergencycontactComponent } from './add-emergencycontact/add-emergencycontact.component';
import { FamilyDetailComponent } from './family-detail/family-detail.component';
import { NgModule } from '@angular/core';
import { OrganizationDetailComponent } from './organization-detail/organization-detail.component';
import { PersonalAddressesComponent } from './personal-addresses/personal-addresses.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { SideBarComponent } from './side-bar/side-bar.component';

const routes: Routes = [
  { path: 'add-employee', component: SideBarComponent },
  { path: '', component: PersonalInfoComponent },
  {
    path: 'add-employee/Organization-Detail',
    component: OrganizationDetailComponent,
  },
  {
    path: 'add-employee/personal-address',
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
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
