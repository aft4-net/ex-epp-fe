import { AppComponent } from './app.component';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { DemoNgZorroAntdModule } from './ng-zorro-antd.module'
import { EppdashboardComponent } from './features/components/eppdashboard/eppdashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApplicationModule, NgModule } from '@angular/core';
import en from '@angular/common/locales/en';
import { registerLocaleData } from '@angular/common';
import { CustomFormModule } from './shared/modules/forms/custom-form.module';
import { SigninComponent } from './features/Account/signin/signin.component';
import {Configuration, IPublicClientApplication , PublicClientApplication} from '@azure/msal-browser'
import { UserDashboardComponent } from './features/components/user-dashboard/user-dashboard.component';
import { UserManagementModule } from './modules/userManagment/user-management.module';
import { PageTemplateModule } from './shared/modules/templates/page-template.module';
import {  MsalModule, MSAL_INTERCEPTOR_CONFIG } from '@azure/msal-angular';
import {  MSAL_GUARD_CONFIG} from '@azure/msal-angular';


//import {MsalConfModule} from './authconfig';


export function MSALInstanceFactory(): IPublicClientApplication
{
  return new PublicClientApplication({
    auth:{
      clientId: '5330d43a-fef4-402e-82cc-39fb061f9b97',
      redirectUri: 'http://localhost:4200'
    }
  })

}

export function MSALConfigFactory(): Configuration {
  return {
   auth: {
    clientId: '5330d43a-fef4-402e-82cc-39fb061f9b97',
    redirectUri: 'http://localhost:4200',
    postLogoutRedirectUri: 'http://localhost:4200',
   },
   cache: {
    cacheLocation: 'localStorage'
   },
  }
 };
registerLocaleData(en);
@NgModule({
  declarations: [
    AppComponent, 
    EppdashboardComponent,
    SigninComponent,
    UserDashboardComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DemoNgZorroAntdModule,
    CustomFormModule,
    ReactiveFormsModule,
    UserManagementModule,
    PageTemplateModule,
    MsalModule,
    ApplicationModule,
     ],
  providers: [{ provide: NZ_I18N, useValue: en_US,  },{
    provide: MSAL_INTERCEPTOR_CONFIG,
    useFactory: MSALConfigFactory
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
