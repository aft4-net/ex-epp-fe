import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationComponent } from './location/location.component';
import { ContactComponent } from './contact/contact.component';
import { DetailsComponent } from './details/details.component';
import { AddClientComponent } from './add-client.component';
import { CompanyContactComponent } from './company-contact/company-contact.component';

@NgModule({
  declarations: [
    LocationComponent,
    ContactComponent,
    DetailsComponent,
    AddClientComponent,
    CompanyContactComponent,
  ],
  imports: [CommonModule],
  exports:[AddClientComponent]
})
export class AddClientModule {}
