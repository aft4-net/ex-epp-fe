import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import{DemoNgZorroAntdModule} from './ng-zorro-antd.module'
import { EppdashboardComponent } from './features/components/eppdashboard/eppdashboard.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import en from '@angular/common/locales/en';
import { registerLocaleData } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import {SiderComponent} from './components/application/sider/sider.component'
import { CustomFormModule } from './shared/modules/forms/custom-form.module';
import { SigninComponent } from './features/Account/signin/signin.component';
import { MsalModule } from '@azure/msal-angular';
import{MsalService} from '@azure/msal-angular';
import{MSAL_INSTANCE} from '@azure/msal-angular';
import{IPublicClientApplication , PublicClientApplication} from '@azure/msal-browser'


export function MSALInstanceFactory(): IPublicClientApplication
{
  return new PublicClientApplication({
    auth:{
      clientId: '5330d43a-fef4-402e-82cc-39fb061f9b97',
      redirectUri: 'http://localhost:4200'
    }
  })

}
@NgModule({
  declarations: [
    AppComponent,
    EppdashboardComponent,
    HeaderComponent,
    FooterComponent,
    SiderComponent,
    SigninComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DemoNgZorroAntdModule,
    CustomFormModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
