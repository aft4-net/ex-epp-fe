import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import{DemoNgZorroAntdModule} from './ng-zorro-antd.module'
import { EppdashboardComponent } from './features/components/eppdashboard/eppdashboard.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { UserDashboardComponent } from './features/components/user-dashboard/user-dashboard.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import{SiderComponent} from './components/application/sider/sider.component'
import { CustomFormModule } from './shared/modules/forms/custom-form.module';
import { SigninComponent } from './features/Account/signin/signin.component';

@NgModule({
  declarations: [
    AppComponent,
    EppdashboardComponent,
    HeaderComponent,
    FooterComponent,
    SiderComponent,
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
    CustomFormModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
