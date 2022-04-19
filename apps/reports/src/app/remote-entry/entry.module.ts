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


@NgModule({
  declarations: [RemoteEntryComponent],
  imports: [
    OverlayModule,
    BrowserModule,
    BrowserAnimationsModule,
    NzNotificationModule,
    NzDatePickerModule,
    
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
  providers: [],
  
})
export class RemoteEntryModule {}
