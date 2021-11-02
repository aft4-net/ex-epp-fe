import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SiderComponent } from '../../components/application/sider/sider.component';
import { PersonalInformationComponent } from '../../components/application/personal-information/personal-information.component';
import { AuthorizationCheck } from '../../services/autherization/authorizationCheck';
import { AreaOfInterestComponent } from '../../components/application/areas-of-interest/area-of-interest.component';
import { aoiGuard } from '../../services/navigationGuard/aoiGuard';

const routes: Routes = [
  {
    path: '',
    component: SiderComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'personal-information' },
      {
        path: 'personal-information',
        component: PersonalInformationComponent,
        canActivate: [AuthorizationCheck]
      },
      {
        path: 'area-of-interest',
        component:AreaOfInterestComponent,
        canActivate: [aoiGuard, AuthorizationCheck]

      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicationRoutingModule {}
