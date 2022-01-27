import { RouterModule, Routes } from '@angular/router';

import { AddressViewComponent } from './address-view/address-view.component';
import { AuthGuard } from 'libs/common-services/auth.guard';
import { EmergencycontactViewComponent } from './emergencycontact-view/emergencycontact-view.component';
import { EmployeeComponent } from './employee.component';
import { FamilyDetailComponent } from './family-detail/family-detail.component';
import { FamilyDetailViewComponent } from './family-detail-view/family-detail-view.component';
import { NgModule } from '@angular/core';
import { OrganizationDetailComponent } from './organization-detail/organization-detail.component';
import { PersonalAddressesComponent } from './personal-addresses/personal-addresses.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';

const routes: Routes = [
  { path: 'employee/add-employee', component: EmployeeComponent },

  {
    path: 'employee/add-employee/personal-info',
    component: PersonalInfoComponent,
    canActivate: [AuthGuard],
    data: { role: ['Create_Employee'] },
  },

  {
    path: 'employee/add-employee/personal-address',
    component: PersonalAddressesComponent,
    canActivate: [AuthGuard],
    data: { role: ['Create_Employee'] },
  },
  {
    path: 'myprofile',
    component: PersonalInfoComponent,
  },
  {
    path: 'employee/add-employee/Organization-Detail',
    component: OrganizationDetailComponent,
    canActivate: [AuthGuard],
    data: { role: ['Create_Employee'] },
  },

  {
    path: 'employee/add-employee/address-view',
    component: AddressViewComponent,
    canActivate: [AuthGuard],
    data: { role: ['Create_Employee'] },
  },
  {
    path: 'employee/add-employee/family-detail',
    component: FamilyDetailComponent,
    canActivate: [AuthGuard],
    data: { role: ['Create_Employee'] },
  },
  {
    path: 'employee/add-employee/family-detail-view',
    component: FamilyDetailViewComponent,
    canActivate: [AuthGuard],
    data: { role: ['Create_Employee'] },
  },

  {
    path: 'employee/add-employee/emergencycontacts-view',
    component: EmergencycontactViewComponent,
    canActivate: [AuthGuard],
    data: { role: ['Create_Employee'] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule {}
