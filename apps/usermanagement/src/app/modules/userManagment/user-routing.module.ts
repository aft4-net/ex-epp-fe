import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SiderComponent } from '../../components/application/sider/sider.component';
import { AuthorizationCheck } from '../../services/autherization/authorizationCheck';
import { LogInComponent } from '../../features/Account/user/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: SiderComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'user' },
      {
        path: 'personal-information',
        component: LogInComponent,
        canActivate: [AuthorizationCheck]
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicationRoutingModule {}
