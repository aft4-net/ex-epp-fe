import { AppComponent } from './app.component';

import { BrowserModule } from '@angular/platform-browser';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DemoNgZorroAntdModule } from './ng-zorro-antd.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MsalService, MSAL_INSTANCE } from '@azure/msal-angular';
import { httpJWTInterceptor } from '../../../../libs/interceptor/httpJWTInterceptor';

import {
  IPublicClientApplication,
  PublicClientApplication,
} from '@azure/msal-browser';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';


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
   
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
