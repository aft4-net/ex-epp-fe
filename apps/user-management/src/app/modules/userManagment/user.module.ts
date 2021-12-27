import { NgModule } from '@angular/core';

import { ApplicationRoutingModule } from './user-routing.module';
import { SiderComponent } from '../../components/application/sider/sider.component';
import { SharedModule } from '../../shared/modules/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SiderComponent,],
  imports: [
    ApplicationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class ApplicationModule { }
