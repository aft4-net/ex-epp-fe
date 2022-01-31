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
import { RouterModule } from '@angular/router';
import { SigninComponent } from '../features/Account/signin/signin.component';
import { UserDashboardComponent } from '../features/components/user-dashboard/user-dashboard.component';
import { UserdetailsComponent } from '../features/components/userdetails/userdetails.component';
import { httpJWTInterceptor } from '../../../../../libs/interceptor/httpJWTInterceptor';
import {UnauthorizeComponent} from '../../../../../libs/shared-components/src/lib/components/unauthorize/unauthorize.component'
import { environment } from 'libs/environments/environment'
export function MSALInstanceFactory(): IPublicClientApplication
{return new PublicClientApplication({
  auth: {
    clientId: environment.clientId,
    redirectUri: environment.redirectUri,
  }});}
@NgModule({
  declarations: [RemoteEntryComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    DemoNgZorroAntdModule,
    FormsModule,

    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: AppComponent,
        children : [
          {
            path:'',component:UserDashboardComponent

          },
          {
            path:'permission/:id',component:PermissionComponent
          },
          {
            path:'user-dashboard',component:UserDashboardComponent
          },
          {
            path:'userdetails/:id',component:UserdetailsComponent
          },
          {
            path:'group',component:GroupsetComponent
          },
          {
            path:'group-detail/:id',component:GroupDetailComponent
          },
          {
            path:'sign_in', component:SigninComponent
          },
          {path:'unauthorize', component:UnauthorizeComponent}
        ]
      },
    ]),
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
