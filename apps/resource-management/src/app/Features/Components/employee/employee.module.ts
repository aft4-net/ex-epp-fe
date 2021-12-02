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
import { MainLayoutComponent } from '../../../components/main-layout/main-layout.component';
import { NgModule } from '@angular/core';
import { OrganizationDetailComponent } from './organization-detail/organization-detail.component';
import { PageTitleComponent } from '../../../components/page-title/page-title.component';
import { PersonalAddressesComponent } from './personal-addresses/personal-addresses.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import en from '@angular/common/locales/en';
import { registerLocaleData } from '@angular/common';
import { AddressViewComponent } from './address-view/address-view.component';
import { FamilyDetailViewComponent } from './family-detail-view/family-detail-view.component';
import { EmergencycontactViewComponent } from './emergencycontact-view/emergencycontact-view.component';
import { PersonalInfoEditComponent } from './employee-edit/personal-info-edit/personal-info-edit.component';
import { OrganizationDetailEditComponent } from './employee-edit/organization-detail-edit/organization-detail-edit.component';
import { EmergencycontactEditComponent } from './employee-edit/emergencycontact-edit/emergencycontact-edit.component';
import { AddressEditComponent } from './employee-edit/address-edit/address-edit.component';
import { FamilyDetailEditComponent } from './employee-edit/family-detail-edit/family-detail-edit.component';

// eslint-disable-next-line @typescript-eslint/no-unused-vars


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
    MainLayoutComponent,
    AddressViewComponent,
    FamilyDetailViewComponent,
    EmergencycontactViewComponent,
    PersonalInfoEditComponent,
    OrganizationDetailEditComponent,
    EmergencycontactEditComponent,
    AddressEditComponent,
    FamilyDetailEditComponent,
    
    
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

  exports: [EmployeeComponent,SideBarComponent],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
})
export class EmployeeModule {}
