import { DatePipe, registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { RemoteEntryComponent } from './entry.component';
import { RouterModule } from '@angular/router';
import { TimesheetHttpInterceptorService } from '../timesheet/interceptors/timesheet-http-interceptor.service';
import { TimesheetModule } from '../timesheet/timesheet.module';
import en from '@angular/common/locales/en';
import { LoadingIntercptorService } from '../timesheet/interceptors/loading-intercptor.service';

registerLocaleData(en);

@NgModule({
  declarations: [RemoteEntryComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzNotificationModule,
    TimesheetModule,
    RouterModule.forChild([]),
  ],
  providers: [
    {provide: NZ_I18N, useValue: en_US},
    {provide: HTTP_INTERCEPTORS, useClass: TimesheetHttpInterceptorService, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingIntercptorService, multi: true},
    DatePipe
  ],
})
export class RemoteEntryModule {}
