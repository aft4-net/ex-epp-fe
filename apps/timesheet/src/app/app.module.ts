import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RemoteEntryModule } from './remote-entry/entry.module';
import { RouterModule } from '@angular/router';

import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import {DatePipe, registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TimesheetModule } from './timesheet/timesheet.module';
import { MatBadgeModule } from '@angular/material/badge';

registerLocaleData(en);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzNotificationModule,
    TimesheetModule,
    MatBadgeModule,
    
    RouterModule.forRoot([], { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [{provide: NZ_I18N, useValue: en_US}, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
