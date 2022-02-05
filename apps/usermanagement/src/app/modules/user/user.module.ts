import { NgModule } from '@angular/core';

import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../../shared/modules/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../../services/user/account.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { httpInterceptor } from '../../interceptor/httpInterceptor';
import { AuthorizationCheck } from '../../services/autherization/authorizationCheck';
import { DemoNgZorroAntdModule } from '../../ng-zorro-antd.module';

@NgModule({
  declarations: [

  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule,
    SharedModule,
    DemoNgZorroAntdModule,
    HttpClientModule
  ],
  providers:[{ provide: HTTP_INTERCEPTORS, useClass: httpInterceptor, multi: true }, 
    AuthorizationCheck, AccountService]
})
export class UserModule { }
