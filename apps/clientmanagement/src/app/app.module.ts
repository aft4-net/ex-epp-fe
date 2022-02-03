import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ClientsModule } from './clients/clients.module';
import { ClientsRoutingModule } from './clients/clients-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { RemoteEntryModule } from './remote-entry/entry.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    RemoteEntryModule,
    BrowserModule,
    NzIconModule,
    BrowserAnimationsModule,
    SharedModule,
    ClientsModule,
    HttpClientModule,
    RouterModule.forRoot([], { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }, ],
  bootstrap: [AppComponent],
})
export class AppModule {}
