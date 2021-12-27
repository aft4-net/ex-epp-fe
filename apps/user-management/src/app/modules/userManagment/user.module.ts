import { NgModule } from '@angular/core';

import { ApplicationRoutingModule } from './user-routing.module';
import { SiderComponent } from '../../components/application/sider/sider.component';
import { SharedModule } from '../../shared/modules/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserDashboardComponent } from '../../features/components/user-dashboard/user-dashboard.component';

@NgModule({
  declarations: [SiderComponent,],
  imports: [
    ApplicationRoutingModule,
    UserDashboardComponent,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class ApplicationModule { }
