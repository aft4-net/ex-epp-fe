import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {
  IPublicClientApplication,
  PublicClientApplication,
} from '@azure/msal-browser';
import { MSAL_INSTANCE, MsalService } from '@azure/msal-angular';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';

import { AddEditDeviceDetailComponent } from '../Features/Components/device-detail/add-edit-device-detail/add-edit-device-detail.component';
import { AddressViewComponent } from '../Features/Components/employee/address-view/address-view.component';
import { AngularFileUploaderModule } from 'angular-file-uploader';
import { AppComponent } from '../app.component';
import { AuthGuard } from '../../../../../libs/common-services/auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { CustomFormsControlsModule } from '../Features/Components/custom-forms-controls/custom-forms-controls.module';
import { DemoNgZorroAntdModule } from '../ng-zorro-antd.module';
import { DeviceDetailComponent } from '../Features/Components/device-detail/device-detail.component';
import { EmergencycontactViewComponent } from '../Features/Components/employee/emergencycontact-view/emergencycontact-view.component';
import { EmployeeDetailComponent } from '../Features/Components/employee/employee-detail/employee-detail.component';
import { EmployeeModule } from '../Features/Components/employee/employee.module';
import { EmployeeRoutingModule } from '../Features/Components/employee/employee-routing.module';
import { FamilyDetailComponent } from '../Features/Components/employee/family-detail/family-detail.component';
import { FamilyDetailViewComponent } from '../Features/Components/employee/family-detail-view/family-detail-view.component';
import { NgModule } from '@angular/core';
import { OrganizationDetailComponent } from '../Features/Components/employee/organization-detail/organization-detail.component';
import { PersonalAddressesComponent } from '../Features/Components/employee/personal-addresses/personal-addresses.component';
import { PersonalInfoComponent } from '../Features/Components/employee/personal-info/personal-info.component';
import { RemoteEntryComponent } from './entry.component';
import { RouterModule } from '@angular/router';
import { httpJWTInterceptor } from '../../../../../libs/interceptor/httpJWTInterceptor';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries


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
    DemoNgZorroAntdModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CommonModule,
    EmployeeRoutingModule,

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
            canActivate: [AuthGuard],
            data: { role: ['Create_Employee'] },
          },

          {
            path: 'employee/add-employee/personal-address',
            component: PersonalAddressesComponent,
            canActivate: [AuthGuard],
            data: { role: ['Create_Employee'] },
          },

          {
            path: 'employee/add-employee/Organization-Detail',
            component: OrganizationDetailComponent,
            canActivate: [AuthGuard],
            data: { role: ['Create_Employee'] },
          },

          {
            path: 'employee/add-employee/address-view',
            component: AddressViewComponent,
            canActivate: [AuthGuard],
            data: { role: ['Create_Employee'] },
          },
          {
            path: 'employee/add-employee/family-detail',
            component: FamilyDetailComponent,
            canActivate: [AuthGuard],
            data: { role: ['Create_Employee'] },
          },
          {
            path: 'employee/add-employee/family-detail-view',
            component: FamilyDetailViewComponent,
            canActivate: [AuthGuard],
            data: { role: ['Create_Employee'] },
          },

          {
            path: 'employee/add-employee/emergencycontacts-view',
            component: EmergencycontactViewComponent,
            canActivate: [AuthGuard],
            data: { role: ['Create_Employee'] },
          },
        ],
      },
    ]),
  ],
  providers: [
    { provide: MSAL_INSTANCE, useFactory: MSALInstanceFactory },
    { provide: NZ_I18N, useValue: en_US },
    { provide: HTTP_INTERCEPTORS, useClass: httpJWTInterceptor, multi: true },
    MsalService,
    AuthGuard,
  ],
})
export class RemoteEntryModule {}
