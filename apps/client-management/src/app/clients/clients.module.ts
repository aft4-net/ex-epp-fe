import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsRoutingModule } from './clients-routing.module';
import { ViewClientsComponent } from './view-clients/view-clients.component';
import { SharedModule } from '../shared/shared.module';
import { AddClientComponent } from './add-client/add-client.component';
import { CompanyContactsFormComponent } from './add-client/company-contacts-form/company-contacts-form.component';
import { ContactsFormComponent } from './add-client/contacts-form/contacts-form.component';
import { DetailsFormComponent } from './add-client/details-form/details-form.component';
import { LoacationsFormComponent } from './add-client/loacations-form/loacations-form.component';
import { NgZorroModule } from '@exec-epp/ng-zorro';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BillingAddressComponent } from './add-client/loacations-form/billing-address/billing-address.component';
import { OperatingAddressComponent } from './add-client/loacations-form/operating-address/operating-address.component';
import { OperatingAddressFormComponent } from './add-client/loacations-form/operating-address-form/operating-address-form.component';
import { BillingAddressFormComponent } from './add-client/loacations-form/billing-address-form/billing-address-form.component';

@NgModule({
  declarations: [
    ViewClientsComponent,
    CompanyContactsFormComponent,
    ContactsFormComponent,
    DetailsFormComponent,
    LoacationsFormComponent,
    AddClientComponent,
    BillingAddressComponent,
    OperatingAddressComponent,
    OperatingAddressFormComponent,
    BillingAddressFormComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    ClientsRoutingModule,
    CommonModule,
    ClientsRoutingModule,
    NgZorroModule
  ],
  exports: [],
})
export class ClientsModule {}
