import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { ClientLocationComponent } from './client-location/client-location.component';
import { ClientContactComponent } from './client-contact/client-contact.component';
import { ClientCompanycontactComponent } from './client-companycontact/client-companycontact.component';
import { CompanycontactComponent } from './companycontact/companycontact.component';
import { LocationComponent } from './location/location.component';
import { ContactComponent } from './contact/contact.component';
import { DetailsComponent } from './details/details.component';
import { AddClientComponent } from './add-client.component';



@NgModule({
  declarations: [
    ClientDetailsComponent,
    ClientLocationComponent,
    ClientContactComponent,
    ClientCompanycontactComponent,
    CompanycontactComponent,
    LocationComponent,
    ContactComponent,
    DetailsComponent,
    AddClientComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AddClientModule { }
