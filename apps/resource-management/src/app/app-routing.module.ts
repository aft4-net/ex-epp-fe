import { RouterModule, Routes } from '@angular/router';

import { AddEmergencycontactComponent } from './Features/Components/add-emergencycontact/add-emergencycontact.component';
import { AddressNewComponent } from './Features/Components/address-new/address-new.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { NgModule } from '@angular/core';
import { OrganizationDetailComponent } from './Features/Components/organization-detail/organization-detail.component';
import { PersonalInfoComponent } from './Features/Components/personal-info/personal-info.component';
import { FamilyDetailComponent } from './Features/Components/family-detail/family-detail.component';

const routes: Routes = [
  { path: '', component: PersonalInfoComponent },
  { path: 'Organization-Detail', component: OrganizationDetailComponent },
  { path: 'address-new', component: AddressNewComponent },
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
