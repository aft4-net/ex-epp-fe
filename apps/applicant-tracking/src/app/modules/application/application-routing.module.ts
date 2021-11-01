import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SiderComponent } from '../../components/application/sider/sider.component';
import { PersonalInformationComponent } from '../../components/application/personal-information/personal-information.component';
import { AreaInterestComponent } from '../../components/application/area-interest/area-interest.component';
import { AuthorizationCheck } from '../../services/autherization/authorizationCheck';

const routes: Routes = [
  {
    path: '',
    component: SiderComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'personal-information' },
      {
        path: 'personal-information',
        component: PersonalInformationComponent, canActivate: [AuthorizationCheck]
      },
      { path: 'area-of-interest', component: AreaInterestComponent, canActivate: [AuthorizationCheck] },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicationRoutingModule {}
