import { AppComponent } from './app.component';
import { IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import { BrowserModule } from '@angular/platform-browser';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DemoNgZorroAntdModule } from './ng-zorro-antd.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MSAL_INSTANCE, MsalService } from '@azure/msal-angular';
import { httpJWTInterceptor } from '../../../../libs/interceptor/httpJWTInterceptor';
import { Configuration } from 'msal';

import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: '30cff3d0-c714-4f42-a080-19c5d4ef720e',
      redirectUri: 'https://18.218.150.53:4200/',
    },
  });
}
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    DemoNgZorroAntdModule,

    HttpClientModule,

    BrowserAnimationsModule,
    RouterModule.forRoot(
      [
        {
          path: '',
          component: DashboardComponent,
        },
        {
          path: 'usermanagement',
          loadChildren: () =>
            import('usermanagement/Module').then((m) => m.RemoteEntryModule),
        },
        {
          path: 'resourcemanagement',
          loadChildren: () =>
            import('resourcemanagement/Module').then(
              (m) => m.RemoteEntryModule
            ),
        },
        {
          path: 'timesheet',
          loadChildren: () =>
            import('timesheet/Module').then((m) => m.RemoteEntryModule),
          data: { breadcrumb: 'Timesheet' },
        },
        {
          path: 'clientmanagement',
          loadChildren: () =>
            import('clientmanagement/Module').then((m) => m.RemoteEntryModule),
        },
        {
          path: 'projectmanagement',
          loadChildren: () =>
            import('projectmanagement/Module').then((m) => m.RemoteEntryModule),
        },
        {
          path: 'configurationmodule',
          loadChildren: () =>
            import('configurationmodule/Module').then(
              (m) => m.RemoteEntryModule
            ),
        },
      ],
      { initialNavigation: 'enabledBlocking' }
    ),
  ],
  providers: [
   
    { provide: NZ_I18N, useValue: en_US },
    { provide: HTTP_INTERCEPTORS, useClass: httpJWTInterceptor, multi: true },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    MsalService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
