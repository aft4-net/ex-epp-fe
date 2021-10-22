import { NgModule } from '@angular/core';

import { UserRoutingModule } from './user-routing.module';
import { SignupComponent } from '../../components/user/signup/signup.component';
import { SharedModule } from '../../shared/modules/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SignupComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule,
    SharedModule,
    
  ]
})
export class UserModule { }
