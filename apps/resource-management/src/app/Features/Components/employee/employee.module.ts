import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';

import { AddEmergencycontactComponent } from './add-emergencycontact/add-emergencycontact.component';
import { AddressNewComponent } from './address-new/address-new.component';
import { AngularFileUploaderModule } from 'angular-file-uploader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { DemoNgZorroAntdModule } from '../../../ng-zorro-antd.module';
import { EmployeeComponent } from './employee.component';
import { EmployeeRoutingModule } from './employee-routing.module';
import { FamilyDetailComponent } from './family-detail/family-detail.component';
import { NgModule } from '@angular/core';
import { OrganizationDetailComponent } from './organization-detail/organization-detail.component';
import { PageTitleComponent } from '../../../components/page-title/page-title.component';
import { PersonalAddressesComponent } from './personal-addresses/personal-addresses.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import en from '@angular/common/locales/en';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { registerLocaleData } from '@angular/common';

//


@NgModule({
  declarations: [
    EmployeeComponent,
    AddEmergencycontactComponent,
    OrganizationDetailComponent,
    AddressNewComponent,
    PersonalInfoComponent,
    PersonalAddressesComponent,
    FamilyDetailComponent,
    PageTitleComponent,
    SideBarComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    EmployeeRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    DemoNgZorroAntdModule,
    AngularFileUploaderModule,
  ],

  exports: [SideBarComponent],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
})
export class EmployeeModule {}
