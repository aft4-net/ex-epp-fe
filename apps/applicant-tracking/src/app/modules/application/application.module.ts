import { NgModule } from '@angular/core';

import { ApplicationRoutingModule } from './application-routing.module';
import { PersonalInformationComponent } from '../../components/application/personal-information/personal-information.component';
import { SharedModule } from '../../shared/modules/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [PersonalInformationComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ApplicationRoutingModule,
    SharedModule,
  ]
})
export class ApplicationModule { }
