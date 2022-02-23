import { NgModule } from '@angular/core';

import { ApplicationRoutingModule } from './user-routing.module';
import { SiderComponent } from '../../components/application/sider/sider.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [SiderComponent],
  imports: [
    ApplicationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    //SharedModule,
    //DemoNgZorroAntdModule,
    HttpClientModule
  ]
})
export class ApplicationModule { }
