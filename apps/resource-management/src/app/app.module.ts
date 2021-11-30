import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';

import { AngularFileUploaderModule } from "angular-file-uploader";
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { DemoNgZorroAntdModule } from './ng-zorro-antd.module';
import { EmployeeDetailComponent } from './Features/Components/employee/employee-detail/employee-detail.component';
import { EmployeeRoutingModule } from './Features/Components/employee/employee-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { PageBreadcrumbComponent } from './components/page-breadcrumb/page-breadcrumb.component';
import { PageFooterComponent } from './components/page-footer/page-footer.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { ProgressButtonsComponent } from './components/progress-buttons/progress-buttons.component';
import { ToastrModule } from 'ngx-toastr';
import en from '@angular/common/locales/en';
import { registerLocaleData } from '@angular/common';
import { AddDeviceDetailComponent } from './Features/Components/add-device-detail/add-device-detail.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    PageHeaderComponent,
    PageFooterComponent,
    PageBreadcrumbComponent,
    ProgressButtonsComponent,
    EmployeeDetailComponent,
    AddDeviceDetailComponent
    
  ],
  imports: [
    EmployeeRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DemoNgZorroAntdModule,
    AngularFileUploaderModule,
    AppRoutingModule,

    ToastrModule.forRoot(),
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
})
export class AppModule {}
