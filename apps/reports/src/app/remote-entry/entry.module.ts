import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './../app.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { RemoteEntryComponent } from './entry.component';
import { ViewreportComponent } from '../timesheetreports/viewreport/viewreport.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
import en from '@angular/common/locales/en';
import { DatePipe, registerLocaleData } from '@angular/common';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { NzGridModule } from 'ng-zorro-antd/grid';

registerLocaleData(en);

@NgModule({
  declarations: [RemoteEntryComponent],
  imports: [
    OverlayModule,
    BrowserModule,
    BrowserAnimationsModule,
    NzNotificationModule,
    NzDatePickerModule,
    NzGridModule,
    RouterModule.forChild([
      {
        path: '',
        component:AppComponent,
        children: [
          { path: '', component: ViewreportComponent },
          
        ],
      },
    ]),
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US },DatePipe],
  
})
export class RemoteEntryModule {}
