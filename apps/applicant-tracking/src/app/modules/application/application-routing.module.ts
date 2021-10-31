import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SiderComponent } from '../../components/application/sider/sider.component';
import { PersonalInformationComponent } from '../../components/application/personal-information/personal-information.component';
import { AreaInterestComponent } from '../../components/application/area-interest/area-interest.component';

const routes: Routes = [
  {
    path: '',
    component: SiderComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'personal-information' },
      {
        path: 'personal-information',
        component: PersonalInformationComponent,
      },
      { path: 'area-of-interest', component: AreaInterestComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicationRoutingModule {}
