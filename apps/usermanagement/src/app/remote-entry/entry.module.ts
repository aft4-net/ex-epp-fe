import { AppComponent } from '../app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RemoteEntryComponent } from './entry.component';
import { RouterModule } from '@angular/router';
import { PermissionComponent } from '../features/components/permission/permission.component';
import { HttpClientModule } from '@angular/common/http';
import { UserDashboardComponent } from '../features/components/user-dashboard/user-dashboard.component';
import { DemoNgZorroAntdModule } from '../ng-zorro-antd.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GroupsetComponent } from '../features/components/groupset/groupset.component';
import { GroupDetailComponent } from '../features/components/group-detail/group-detail.component';
import {  MsalService, MSAL_INSTANCE} from '@azure/msal-angular';
import { IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import { SigninComponent } from '../features/Account/signin/signin.component';
import { UserdetailsComponent } from '../features/components/userdetails/userdetails.component';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
export function MSALInstanceFactory(): IPublicClientApplication 
{return new PublicClientApplication({
   auth: {
     clientId: '5330d43a-fef4-402e-82cc-39fb061f9b97',
      redirectUri: 'http://localhost:4200'}});}
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
            path:'sign_in',component:SigninComponent
          }
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
    MsalService 
    ],
})
export class RemoteEntryModule {}
