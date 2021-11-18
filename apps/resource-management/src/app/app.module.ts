import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AddressNewComponent } from './Features/Components/address-new/address-new.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { DemoNgZorroAntdModule } from './ng-zorro-antd.module';
import { HttpClientModule } from '@angular/common/http';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { NgModule } from '@angular/core';
import { PageFooterComponent } from './components/page-footer/page-footer.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { PageTitleComponent } from './components/page-title/page-title.component';

import { PageBreadcrumbComponent } from './components/page-breadcrumb/page-breadcrumb.component';
import { OrganizationDetailComponent } from './Features/Components/organization-detail/organization-detail.component';
import { ProgressButtonsComponent } from './components/progress-buttons/progress-buttons.component';

import { PersonalInfoComponent } from './Features/Components/personal-info/personal-info.component';
import en from '@angular/common/locales/en';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent, PageHeaderComponent, PageFooterComponent, PageTitleComponent, PageBreadcrumbComponent, OrganizationDetailComponent,
    AddressNewComponent,
    ProgressButtonsComponent,
    PersonalInfoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DemoNgZorroAntdModule,
    AppRoutingModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
})
export class AppModule {}
