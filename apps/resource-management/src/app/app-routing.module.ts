import { RouterModule, Routes } from '@angular/router';

import { AddEmergencycontactComponent } from './Features/Components/add-emergencycontact/add-emergencycontact.component';
import { AddressNewComponent } from './Features/Components/address-new/address-new.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { NgModule } from '@angular/core';
import { OrganizationDetailComponent } from './Features/Components/organization-detail/organization-detail.component';
import { PersonalInfoComponent } from './Features/Components/personal-info/personal-info.component';
import { EmergencyContactAddressesComponent } from './Features/Components/emergency-contact-addresses/emergency-contact-addresses.component';
import { PersonalAddressesComponent } from './Features/Components/personal-addresses/personal-addresses.component';

const routes: Routes = [
  { path: '', component: PersonalInfoComponent },
  { path: 'Organization-Detail', component: OrganizationDetailComponent },
  { path: 'personal-address', component: PersonalAddressesComponent },
  { path: 'emergency-address', component: EmergencyContactAddressesComponent},
  { path: 'Organization-Detail', component: OrganizationDetailComponent },
  { path: 'personal-info', component: PersonalInfoComponent },
  { path: 'emergency-contact', component: AddEmergencycontactComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
