import { RouterModule, Routes } from '@angular/router';

import { AddEmergencycontactComponent } from './Features/Components/emergencycontact/add-emergencycontact/add-emergencycontact.component';
import { NgModule } from '@angular/core';
import { OrganizationDetailComponent } from './Features/Components/organization-detail/organization-detail.component';
import { PersonalInfoComponent } from './Features/Components/personal-info/personal-info.component';
import { EmergencyContactAddressesComponent } from './Features/Components/emergency-contact-addresses/emergency-contact-addresses.component';
import { PersonalAddressesComponent } from './Features/Components/personal-addresses/personal-addresses.component';

const routes: Routes = [
  { path: 'Organization-Detail', component: OrganizationDetailComponent },
  { path: 'personal-address', component: PersonalAddressesComponent },
  { path: 'emergency-address', component: EmergencyContactAddressesComponent},
  { path: '', component: PersonalInfoComponent },
  { path: 'Organization-Detail', component: OrganizationDetailComponent },
  { path: 'personal-info', component: PersonalInfoComponent },
  { path: 'emergencycontact', component: AddEmergencycontactComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
