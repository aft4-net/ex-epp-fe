import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import { MSAL_INSTANCE, MsalService } from '@azure/msal-angular';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { Configuration } from 'msal';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DemoNgZorroAntdModule } from './ng-zorro-antd.module';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { httpJWTInterceptor } from './interceptors/httpJWTInterceptor';
import { environment } from './../environments/environment'
import { SidenavComponent } from './components/sidenav/sidenav.component';

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: environment.clientId,
      redirectUri: environment.redirectUrl
    },
  });
}
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    SidenavComponent,
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
