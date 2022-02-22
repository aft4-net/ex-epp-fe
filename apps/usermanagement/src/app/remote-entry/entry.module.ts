/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import { MSAL_INSTANCE, MsalService } from '@azure/msal-angular';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';

import { AppComponent } from '../app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { DemoNgZorroAntdModule } from '../ng-zorro-antd.module';
import { GroupDetailComponent } from '../features/components/group-detail/group-detail.component';
import { GroupsetComponent } from '../features/components/groupset/groupset.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { PermissionComponent } from '../features/components/permission/permission.component';
import { RemoteEntryComponent } from './entry.component';
import {RouterModule, Routes } from '@angular/router';
import { SigninComponent } from '../features/Account/signin/signin.component';
import { UserDashboardComponent } from '../features/components/user-dashboard/user-dashboard.component';
import { UserdetailsComponent } from '../features/components/userdetails/userdetails.component';
import { httpJWTInterceptor } from '../../../../../libs/interceptor/httpJWTInterceptor';
import {UnauthorizeComponent} from '../../../../../libs/shared-components/src/lib/components/unauthorize/unauthorize.component'
import { environment } from 'libs/environments/environment'
import { LoginComponent } from '../features/Account/user/login/login.component';
import { ChangepasswordComponent } from '../features/Account/changepassword/changepassword.component';
import { ForgotPasswordComponent } from '../features/Account/forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from '../features/Account/resetpassword/resetpassword.component';
export function MSALInstanceFactory(): IPublicClientApplication
{return new PublicClientApplication({
  auth: {
    clientId: environment.clientId,
    redirectUri: environment.redirectUri,
  }});}
  const routes: Routes = [
    {
    path: '',
        component: AppComponent,
        children : [
          {
            path:'',component:UserDashboardComponent,
            data: {
              breadcrumb: "Users"
            }

          },
          {
            path:'permission/:id',component:PermissionComponent,
            data: {
              breadcrumb: "Permission"
            }
          },
          {
            path:'user-dashboard',component:UserDashboardComponent,
            data: {
              breadcrumb: "Users"
            }
          },
          {
            path:'userdetails/:id',component:UserdetailsComponent,
            data: {
              breadcrumb: "User-Details"
            }
          },
          {
            path:'group',component:GroupsetComponent,
            data: {
              breadcrumb: "Groups"
            }
          },
          {
            path:'group-detail/:id',component:GroupDetailComponent,
            data: {
              breadcrumb: "Group-Detail"
            }
          },
          {
            path:'logIn', component:LoginComponent
          },
          {
            path:'changepassword', component:ChangepasswordComponent
          },
          {
            path:'forgotpassword', component:ForgotPasswordComponent
          },
          {
            path:'resetpassword', component:ResetpasswordComponent
          },
          {
            path:'unauthorize', component:UnauthorizeComponent,
          data: {
            breadcrumb: "Log In"
          }
        }
        ]
      },
  ]
@NgModule({
  declarations: [RemoteEntryComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    DemoNgZorroAntdModule,
    FormsModule,

    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    { provide: NZ_I18N, useValue: en_US },
    { provide: HTTP_INTERCEPTORS, useClass: httpJWTInterceptor, multi: true },
    MsalService
    ],

})
export class RemoteEntryModule {}
