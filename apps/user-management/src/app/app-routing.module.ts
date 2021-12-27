import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { EppdashboardComponent } from './features/components/eppdashboard/eppdashboard.component';
import { NgModule } from '@angular/core';
import { SiderComponent } from './components/application/sider/sider.component';
import { UserDashboardComponent } from './features/components/user-dashboard/user-dashboard.component';
import { PrimaryPageTemplateComponent } from './shared/components/page-view-templates/primary-template/primary-page-template.component';

const routes: Routes = [
  { path: '', component: EppdashboardComponent, },
  { path: 'sider', component: SiderComponent},
  { path: 'udb', component: UserDashboardComponent},
  { path: 'users', component: PrimaryPageTemplateComponent,
      children: [
        {
          path: '',
          loadChildren: () =>
            import('./modules/userManagment/user-management.module').then((m) => m.UserManagementModule)
        },
      ], 
    }, 
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
