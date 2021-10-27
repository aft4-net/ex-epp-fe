import { NgModule } from '@angular/core';

import { ApplicationRoutingModule } from './application-routing.module';
import { SiderComponent } from '../../components/application/sider/sider.component';
import { PersonalInformationComponent } from '../../components/application/personal-information/personal-information.component';
import { SharedModule } from '../../shared/modules/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SiderComponent, PersonalInformationComponent],
  imports: [
    ApplicationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class ApplicationModule { }
