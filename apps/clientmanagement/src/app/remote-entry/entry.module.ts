import { AddClientComponent } from '../clients/add-client/add-client.component';
import { AppComponent } from '../app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RemoteEntryComponent } from './entry.component';
import { RouterModule } from '@angular/router';
import { ViewClientsComponent } from '../clients/view-clients/view-clients.component';

@NgModule({
  declarations: [RemoteEntryComponent],
  imports: [
    BrowserModule,
    RouterModule.forChild([
      {
        path: '',
        component: AppComponent,

        children: [
          { path: '', component: ViewClientsComponent },
          { path: 'add-client', component: AddClientComponent },
        ],
      },
    ]),
  ],
  providers: [],
})
export class RemoteEntryModule { }
