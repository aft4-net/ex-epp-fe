import { RouterModule, Routes } from '@angular/router';

import { AddEmergencycontactComponent } from './Features/Components/emergencycontact/add-emergencycontact/add-emergencycontact.component';
import { AddressNewComponent } from './Features/Components/address-new/address-new.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { NgModule } from '@angular/core';
import { OrganizationDetailComponent } from './Features/Components/organization-detail/organization-detail.component';
import { PersonalInfoComponent } from './Features/Components/personal-info/personal-info.component';

const routes: Routes = [
  { path: '', component: PersonalInfoComponent },
  { path: 'Organization-Detail', component: OrganizationDetailComponent },
  { path: 'address-new', component: AddressNewComponent },
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
