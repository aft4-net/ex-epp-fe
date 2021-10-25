import { NgModule } from '@angular/core';

import { UserRoutingModule } from './user-routing.module';
import { SignupComponent } from '../../components/user/signup/signup.component';
import { SharedModule } from '../../shared/modules/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../../services/user/account.service';

@NgModule({
  declarations: [SignupComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule,
    SharedModule,
  ],
  providers:[AccountService]
})
export class UserModule { }
