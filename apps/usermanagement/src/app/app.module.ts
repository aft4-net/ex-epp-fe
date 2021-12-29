import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { CustomFormModule } from './shared/modules/forms/custom-form.module';
import { DemoNgZorroAntdModule } from './ng-zorro-antd.module';
import { EppdashboardComponent } from './features/components/eppdashboard/eppdashboard.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RemoteEntryModule } from './remote-entry/entry.module';
import { RouterModule } from '@angular/router';
import { SiderComponent } from './components/application/sider/sider.component';
import { SigninComponent } from './features/Account/signin/signin.component';
import { PermissionComponent } from './features/components/permission/permission.component';

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
    FormsModule,
    HttpClientModule,
    //BrowserAnimationsModule,
    DemoNgZorroAntdModule,
    CustomFormModule,
    RouterModule.forRoot([

    ], { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
