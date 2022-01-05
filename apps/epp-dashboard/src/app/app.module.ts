import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DemoNgZorroAntdModule } from './ng-zorro-antd.module';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MsalService, MSAL_INSTANCE } from '@azure/msal-angular';
import { IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';

export function MSALInstanceFactory(): IPublicClientApplication 
{return new PublicClientApplication({
   auth: {
     clientId: '5330d43a-fef4-402e-82cc-39fb061f9b97',
      redirectUri: 'http://localhost:4200'}});}
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
