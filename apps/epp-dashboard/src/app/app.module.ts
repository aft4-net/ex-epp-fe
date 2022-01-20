import { IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import { MSAL_INSTANCE, MsalService } from '@azure/msal-angular';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DemoNgZorroAntdModule } from './ng-zorro-antd.module';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

export function MSALInstanceFactory(): IPublicClientApplication
{return new PublicClientApplication({
   auth: {
     clientId: '5330d43a-fef4-402e-82cc-39fb061f9b97',
      redirectUri: 'http://18.116.78.75:4206'}});}
@NgModule({
  declarations: [AppComponent, DashboardComponent
  ,HeaderComponent,
  FooterComponent
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
      ],
      { initialNavigation: 'enabledBlocking' }
    ),
  ],
  providers: [{
    provide: MSAL_INSTANCE,
    useFactory: MSALInstanceFactory
  },
  {provide: NZ_I18N, useValue: en_US},
  MsalService ],
  bootstrap: [AppComponent],
})
export class AppModule {}
