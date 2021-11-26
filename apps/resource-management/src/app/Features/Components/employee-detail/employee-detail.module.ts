import { AddEmergencycontactComponent } from '../add-emergencycontact/add-emergencycontact.component';
import { AddMultiComponent } from '../personal-info/add-multi/add-multi.component';
import { AddressNewComponent } from '../address-new/address-new.component';
import { CommonModule } from '@angular/common';
import { EmergencyContactAddressesComponent } from '../emergency-contact-addresses/emergency-contact-addresses.component';
import { EmployeeDetailComponent } from './employee-detail.component';
import { EmployeeDetailRoutingModule } from './employee-detail-routing.module';
import { FamilyDetailComponent } from '../family-detail/family-detail.component';
import { MainLayoutComponent } from '../../../components/main-layout/main-layout.component';
import { NgModule } from '@angular/core';
import { OrganizationDetailComponent } from '../organization-detail/organization-detail.component';
import { PageTitleComponent } from '../../../components/page-title/page-title.component';
import { PersonalAddressesComponent } from '../personal-addresses/personal-addresses.component';
import { PersonalInfoComponent } from '../personal-info/personal-info.component';
import { ProgressButtonsComponent } from '../../../components/progress-buttons/progress-buttons.component';
import { UploadphotoComponent } from '../personal-info/uploadphoto/uploadphoto.component';

@NgModule({
  declarations: [
    EmployeeDetailComponent,
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
    AddMultiComponent,
    MainLayoutComponent,
    PageTitleComponent,
  ],
  imports: [CommonModule, EmployeeDetailRoutingModule],

  exports: [EmployeeDetailComponent, MainLayoutComponent],
})
export class EmployeeDetailModule {}
