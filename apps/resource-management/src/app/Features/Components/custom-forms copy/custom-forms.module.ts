import { registerLocaleData } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import en from "@angular/common/locales/en";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AngularFileUploaderModule } from "angular-file-uploader";
import { en_US, NZ_I18N } from "ng-zorro-antd/i18n";
import { DemoNgZorroAntdModule } from "../../ng-zorro-antd.module";
import { AddressFormComponent } from "./address-form/address-form.component";
import { EmergencyContactAddressFormComponent } from "./emergency-contact-address-form/emergency-contact-address-form.component";
import { EmergencycontactFormComponent } from "./emergency-contact-form/emergency-contact-form.component";
import { FamilyDetailFormComponent } from "./family-detail-form/family-detail-form.component";
import { OrganizationDetailFormComponent } from "./organization-detail-form/organization-detail-form.component";
import { PersonalDetailFormComponent } from "./personal-detail-form/personal-detail-form.component";

registerLocaleData(en);

@NgModule({
  declarations: [
    AddressFormComponent,
    EmergencycontactFormComponent,
    EmergencyContactAddressFormComponent,
    FamilyDetailFormComponent,
    OrganizationDetailFormComponent,
    PersonalDetailFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DemoNgZorroAntdModule,
    AngularFileUploaderModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  exports: [
    AddressFormComponent,
    EmergencycontactFormComponent,
    EmergencyContactAddressFormComponent,
    FamilyDetailFormComponent,
    OrganizationDetailFormComponent,
    PersonalDetailFormComponent,
  ]
})
export class CustomFormsModule {}
