import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { AddressEditComponent } from './Features/Components/employee/employee-edit/address-edit/address-edit.component';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { DemoNgZorroAntdModule } from './ng-zorro-antd.module';
import { EmergencycontactEditComponent } from './Features/Components/employee/employee-edit/emergencycontact-edit/emergencycontact-edit.component';
import { EmployeeDetailComponent } from './Features/Components/employee/employee-detail/employee-detail.component';
import { EmployeeRoutingModule } from './Features/Components/employee/employee-routing.module';
import { FamilyDetailEditComponent } from './Features/Components/employee/employee-edit/family-detail-edit/family-detail-edit.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { OrganizationDetailEditComponent } from './Features/Components/employee/employee-edit/organization-detail-edit/organization-detail-edit.component';
import { PageBreadcrumbComponent } from './components/page-breadcrumb/page-breadcrumb.component';
import { PageFooterComponent } from './components/page-footer/page-footer.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { PersonalInfoEditComponent } from './Features/Components/employee/employee-edit/personal-info-edit/personal-info-edit.component';
import { ProgressButtonsComponent } from './components/progress-buttons/progress-buttons.component';
import { ToastrModule } from 'ngx-toastr';
import en from '@angular/common/locales/en';
import { registerLocaleData } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RemoteEntryComponent } from './remote-entry/entry.component';
import { RemoteEntryModule } from './remote-entry/entry.module';
import { EmployeeModule } from './Features/Components/employee/employee.module';
import { DeviceDetailModule } from './Features/Components/device-detail/device-detail.module';
import { DeviceDetailComponent } from './Features/Components/device-detail/device-detail.component';
import { httpJWTInterceptor } from 'libs/interceptor/httpJWTInterceptor';
registerLocaleData(en);
@NgModule({
  declarations: [
    AppComponent,
    PageHeaderComponent,
    PageFooterComponent,
    PageBreadcrumbComponent,
    ProgressButtonsComponent,
    EmployeeDetailComponent,
    OrganizationDetailEditComponent,
    PersonalInfoEditComponent,
    EmergencycontactEditComponent,
    AddressEditComponent,
    FamilyDetailEditComponent,
  ],
  imports: [
    RemoteEntryModule,
    EmployeeRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DemoNgZorroAntdModule,
    AngularFileUploaderModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([], { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US },
    { provide: HTTP_INTERCEPTORS, useClass: httpJWTInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
