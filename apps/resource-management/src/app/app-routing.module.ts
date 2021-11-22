import { RouterModule, Routes } from '@angular/router';

import { AddEmergencycontactComponent } from './Features/Components/add-emergencycontact/add-emergencycontact.component';
import { NgModule } from '@angular/core';
import { OrganizationDetailComponent } from './Features/Components/organization-detail/organization-detail.component';
import { PersonalInfoComponent } from './Features/Components/personal-info/personal-info.component';
import { EmergencyContactAddressesComponent } from './Features/Components/emergency-contact-addresses/emergency-contact-addresses.component';
import { PersonalAddressesComponent } from './Features/Components/personal-addresses/personal-addresses.component';
import { FamilyDetailComponent } from './Features/Components/family-detail/family-detail.component';

const routes: Routes = [
  { path: '', component: PersonalInfoComponent },
  { path: 'Organization-Detail', component: OrganizationDetailComponent },
  { path: 'personal-address', component: PersonalAddressesComponent },
  { path: 'emergency-address', component: EmergencyContactAddressesComponent},
  { path: 'Organization-Detail', component: OrganizationDetailComponent },
  { path: 'personal-info', component: PersonalInfoComponent },
  { path: 'emergency-contact', component: AddEmergencycontactComponent },
  { path: 'family-detail', component: FamilyDetailComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
