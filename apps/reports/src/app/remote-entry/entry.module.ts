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
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon/icon.module';
import { NzSpaceModule } from 'ng-zorro-antd/space/space.module';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb/breadcrumb.module';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';


@NgModule({
  declarations: [RemoteEntryComponent],
  imports: [
    OverlayModule,
    BrowserModule,
    BrowserAnimationsModule,
    NzNotificationModule,
    NzDatePickerModule,
    NzDropDownModule,
    NzBreadCrumbModule,
    NzTableModule,
    NzSelectModule,
    NzFormModule,
    NzButtonModule,
    NzIconModule,
    NzSpaceModule,
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
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  
})
export class RemoteEntryModule {}
