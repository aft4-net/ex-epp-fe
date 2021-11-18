import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { AddressNewComponent } from './Features/Components/address-new/address-new.component';
import { OrganizationDetailComponent } from './Features/Components/organization-detail/organization-detail.component';

const routes: Routes = [
  {path: '', component: MainLayoutComponent},
  {path: 'Organization-Detail', component:OrganizationDetailComponent },
  { path: 'address-new', component: AddressNewComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
