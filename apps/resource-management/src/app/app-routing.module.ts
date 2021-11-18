import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { OrganizationDetailComponent } from './Features/Components/organization-detail/organization-detail.component';

const routes: Routes = [
  {path: '', component: OrganizationDetailComponent},
  {path: 'Organization-Detail', component:OrganizationDetailComponent }
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
