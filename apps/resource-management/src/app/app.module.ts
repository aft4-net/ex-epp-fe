import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { DemoNgZorroAntdModule } from './ng-zorro-antd.module';
import { AppRoutingModule } from './app-routing.module';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { PageFooterComponent } from './components/page-footer/page-footer.component';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { PageBreadcrumbComponent } from './components/page-breadcrumb/page-breadcrumb.component';
import { OrganizationDetailComponent } from './Features/Components/organization-detail/organization-detail.component';
import { ProgressButtonsComponent } from './components/progress-buttons/progress-buttons.component';
import { AddressNewComponent } from './Features/Components/address-new/address-new.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent, 
    MainLayoutComponent, PageHeaderComponent, PageFooterComponent, PageTitleComponent, PageBreadcrumbComponent, OrganizationDetailComponent,
    AddressNewComponent,
    ProgressButtonsComponent
  ],
  imports: [
    BrowserModule,
    // RouterModule.forRoot([], { initialNavigation: 'enabledBlocking' }),
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
