import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CustomFormModule } from './shared/modules/forms/custom-form.module';
import { DemoNgZorroAntdModule } from './ng-zorro-antd.module';
import { EppdashboardComponent } from './features/components/eppdashboard/eppdashboard.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { RemoteEntryModule } from './remote-entry/entry.module';
import { RouterModule } from '@angular/router';
import { SiderComponent } from './components/application/sider/sider.component';
import { SigninComponent } from './features/Account/signin/signin.component';
import { PermissionComponent } from './features/components/permission/permission.component';
import { UserDashboardComponent } from './features/components/user-dashboard/user-dashboard.component';
import { GroupsetComponent } from './features/components/groupset/groupset.component';
import { GroupDetailComponent } from './features/components/group-detail/group-detail.component';
import { AddUserComponent } from './features/components/user/add-user/add-user.component';
import { UserToGroupComponent } from './features/components/user/user-to-group/user-to-group.component';
import en from '@angular/common/locales/en';
import { registerLocaleData } from '@angular/common';
import { UserdetailsComponent } from './features/components/userdetails/userdetails.component';
import { httpJWTInterceptor } from '../../../../libs/interceptor/httpJWTInterceptor';
import { IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import { environment } from 'libs/environments/environment';
import { MsalService, MSAL_INSTANCE } from '@azure/msal-angular';
registerLocaleData(en);

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: (`${environment.clientId}`),
      redirectUri:(`${environment.redirectUri}`)
    },
  });
}
@NgModule({
  declarations: [
    AppComponent,
    EppdashboardComponent,
    HeaderComponent,
    FooterComponent,
    SiderComponent,
    //SigninComponent,
    PermissionComponent,
    UserDashboardComponent,
    GroupsetComponent,
    GroupDetailComponent,
    AddUserComponent,
    UserToGroupComponent,
    UserdetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    //BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    DemoNgZorroAntdModule,
    RemoteEntryModule, 
    CustomFormModule,
    RouterModule.forRoot([

    ], { initialNavigation: 'enabledBlocking' }),
  ],
  providers   : [
    { provide: NZ_I18N, useValue: en_US }, 
    { provide: HTTP_INTERCEPTORS, useClass: httpJWTInterceptor, multi: true },
    {provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,},
      MsalService,
  ],
 
  bootstrap: [AppComponent],
})
export class AppModule {}
