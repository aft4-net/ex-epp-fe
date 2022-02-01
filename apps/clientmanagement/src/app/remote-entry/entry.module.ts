import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddClientComponent } from '../clients/add-client/add-client.component';
import { AppComponent } from '../app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ClientsRoutingModule } from '../clients/clients-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { OverlayModule } from '@angular/cdk/overlay';
import { RemoteEntryComponent } from './entry.component';
import { RouterModule } from '@angular/router';
import { ViewClientsComponent } from '../clients/view-clients/view-clients.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { httpJWTInterceptor } from '../../../../../libs/interceptor/httpJWTInterceptor';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { ClientsModule } from '../clients/clients.module';

@NgModule({
  declarations: [RemoteEntryComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    OverlayModule,
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
  providers: [NzNotificationService,
    NzModalService,
    { provide: NZ_I18N, useValue: en_US },
    { provide: HTTP_INTERCEPTORS, useClass: httpJWTInterceptor, multi: true }],
})
export class RemoteEntryModule {}
