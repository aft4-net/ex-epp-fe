import { FormsModule, ReactiveFormsModule } from '@angular/forms';

<<<<<<< HEAD
import { AddEmergencycontactComponent } from './Features/Components/emergencycontact/add-emergencycontact/add-emergencycontact.component';
import { AddMultiComponent } from './Features/Components/personal-info/add-multi/add-multi.component';
=======
import { AddEmergencycontactComponent } from './Features/Components/add-emergencycontact/add-emergencycontact.component';
>>>>>>> develop
import { AddressNewComponent } from './Features/Components/address-new/address-new.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { DemoNgZorroAntdModule } from './ng-zorro-antd.module';
import { HttpClientModule } from '@angular/common/http';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { NgModule } from '@angular/core';
import { OrganizationDetailComponent } from './Features/Components/organization-detail/organization-detail.component';
import { PageBreadcrumbComponent } from './components/page-breadcrumb/page-breadcrumb.component';
import { PageFooterComponent } from './components/page-footer/page-footer.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { PageTitleComponent } from './components/page-title/page-title.component';

import { PersonalInfoComponent } from './Features/Components/personal-info/personal-info.component';
import { ProgressButtonsComponent } from './components/progress-buttons/progress-buttons.component';
import { UploadphotoComponent } from './Features/Components/personal-info/uploadphoto/uploadphoto.component';

import en from '@angular/common/locales/en';
import { registerLocaleData } from '@angular/common';
import { PersonalInfoComponent } from './Features/Components/personal-info/personal-info.component';
import { ProgressButtonsComponent } from './components/progress-buttons/progress-buttons.component';
import { ToastrModule } from 'ngx-toastr';


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
<<<<<<< HEAD
    UploadphotoComponent,
    AddMultiComponent
=======

>>>>>>> develop
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DemoNgZorroAntdModule,
<<<<<<< HEAD
    AppRoutingModule
=======
    AppRoutingModule,
    ToastrModule.forRoot(),

>>>>>>> develop
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
})
export class AppModule {}
