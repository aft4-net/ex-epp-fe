import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonSize, NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { RemoteEntryModule } from './remote-entry/entry.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ViewreportComponent } from './timesheetreports/viewreport/viewreport.component';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { FormsModule } from '@angular/forms';

registerLocaleData(en);

@NgModule({
  declarations: [AppComponent, ViewreportComponent],

  imports: [
    NzDropDownModule,
    BrowserModule,
    NzBreadCrumbModule,
    NzTableModule,
    NzSelectModule,
    NzFormModule,
    BrowserAnimationsModule,
    NzDatePickerModule,
    NzButtonModule,
    NzIconModule,
    NzSpaceModule,
    NzNotificationModule,
    NzLayoutModule,
    FormsModule,
    RouterModule.forRoot([], { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
