import { NgModule } from '@angular/core';

import { ApplicationRoutingModule } from './user-routing.module';
import { SiderComponent } from '../../components/application/sider/sider.component';
import { SharedModule } from '../../shared/modules/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoNgZorroAntdModule } from '../../ng-zorro-antd.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [SiderComponent],
  imports: [
    ApplicationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    DemoNgZorroAntdModule,
    HttpClientModule
  ]
})
export class ApplicationModule { }
