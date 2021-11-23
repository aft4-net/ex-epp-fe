import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';

import { AddEmergencycontactComponent } from './Features/Components/add-emergencycontact/add-emergencycontact.component';
import { AddMultiComponent } from './Features/Components/personal-info/add-multi/add-multi.component';
import { AddressNewComponent } from './Features/Components/address-new/address-new.component';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { DemoNgZorroAntdModule } from './ng-zorro-antd.module';
import { EmergencyContactAddressesComponent } from './Features/Components/emergency-contact-addresses/emergency-contact-addresses.component';
import { FamilyDetailComponent } from './Features/Components/family-detail/family-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { NgModule } from '@angular/core';
import { OrganizationDetailComponent } from './Features/Components/organization-detail/organization-detail.component';
import { PageBreadcrumbComponent } from './components/page-breadcrumb/page-breadcrumb.component';
import { PageFooterComponent } from './components/page-footer/page-footer.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { PersonalAddressesComponent } from './Features/Components/personal-addresses/personal-addresses.component';
import { PersonalInfoComponent } from './Features/Components/personal-info/personal-info.component';
import { ProgressButtonsComponent } from './components/progress-buttons/progress-buttons.component';
import { ToastrModule } from 'ngx-toastr';
import { UploadphotoComponent } from './Features/Components/personal-info/uploadphoto/uploadphoto.component';
import en from '@angular/common/locales/en';
import { registerLocaleData } from '@angular/common';
import { uuid } from 'uuidv4';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    PageHeaderComponent,
    PageFooterComponent,
    PageTitleComponent,
    PageBreadcrumbComponent,
    OrganizationDetailComponent,
    AddressNewComponent,
    ProgressButtonsComponent,
    PersonalInfoComponent,
    AddEmergencycontactComponent,
    PersonalAddressesComponent,
    EmergencyContactAddressesComponent,
    UploadphotoComponent,
    AddMultiComponent,
    FamilyDetailComponent,
    UploadphotoComponent,
    AddMultiComponent
  ],
  imports: [
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
