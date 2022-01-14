import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { EmployeeDetailComponent } from '../Features/Components/employee/employee-detail/employee-detail.component';
import { DemoNgZorroAntdModule } from '../ng-zorro-antd.module';
import { MsalService, MSAL_INSTANCE } from '@azure/msal-angular';

import { RemoteEntryComponent } from './entry.component';
import {
  IPublicClientApplication,
  PublicClientApplication,
} from '@azure/msal-browser';
import { AppComponent } from '../app.component';
import { PersonalInfoComponent } from '../Features/Components/employee/personal-info/personal-info.component';
import { OrganizationDetailComponent } from '../Features/Components/employee/organization-detail/organization-detail.component';
import { AddressViewComponent } from '../Features/Components/employee/address-view/address-view.component';
import { EmergencycontactViewComponent } from '../Features/Components/employee/emergencycontact-view/emergencycontact-view.component';
import { FamilyDetailViewComponent } from '../Features/Components/employee/family-detail-view/family-detail-view.component';
import { FamilyDetailComponent } from '../Features/Components/employee/family-detail/family-detail.component';
import { PersonalAddressesComponent } from '../Features/Components/employee/personal-addresses/personal-addresses.component';
import { EmployeeModule } from '../Features/Components/employee/employee.module';
import { DeviceDetailComponent } from '../Features/Components/device-detail/device-detail.component';
import { AddEditDeviceDetailComponent } from '../Features/Components/device-detail/add-edit-device-detail/add-edit-device-detail.component';
export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: '5330d43a-fef4-402e-82cc-39fb061f9b97',
      redirectUri: 'http://localhost:4200',
    },
  });
}
@NgModule({
  declarations: [RemoteEntryComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserModule,
    DemoNgZorroAntdModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,

    RouterModule.forChild([
      {
        path: '',
        component: AppComponent,
       
        children: [
          {
            path: '',
            component: EmployeeDetailComponent,
          },

          {
            path: 'employee/add-employee/personal-info',
            component: PersonalInfoComponent,
          },
          
          {
            path: 'employee/add-employee/personal-address',
            component: PersonalAddressesComponent,
          },

          {
            path: 'employee/add-employee/Organization-Detail',
            component: OrganizationDetailComponent,
          },

          { path: 'employee/add-employee/address-view', component: AddressViewComponent },
          {
            path: 'employee/add-employee/family-detail',
            component: FamilyDetailComponent,
          },
          {
            path: 'employee/add-employee/family-detail-view',
            component: FamilyDetailViewComponent,
          },

          {
            path: 'employee/add-employee/emergencycontacts-view',
            component: EmergencycontactViewComponent,
          },
          {
            path: 'device-detail',
            component: DeviceDetailComponent,
          },
          { path: 'add', component: AddEditDeviceDetailComponent },
          { path: 'edit/:id', component: AddEditDeviceDetailComponent },
        ],
      },
    ]),
  ],
  providers: [
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },
    { provide: NZ_I18N, useValue: en_US },
    MsalService,
  ],
})
export class RemoteEntryModule {}
