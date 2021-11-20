import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { AddClientModule } from './add-client/add-client.module';
import { ViewClientsComponent } from './view-clients/view-clients.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [ViewClientsComponent],
  imports: [
    SharedModule,
    ClientsRoutingModule,
    AddClientModule,
    CommonModule,
    ClientsRoutingModule
  ]
})
export class ClientsModule { }
