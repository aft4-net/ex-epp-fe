import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import en from '@angular/common/locales/en';
import { registerLocaleData } from '@angular/common';
import { DemoNgZorroAntdModule } from './ng-zorro-antd.module';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RemoteEntryModule } from './remote-entry/entry.module';
import {TimesheetConfigurationComponent} from './timesheet-configuration/timesheet-configuration-component'

registerLocaleData(en);
@NgModule({
  declarations: [AppComponent,TimesheetConfigurationComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    //BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    DemoNgZorroAntdModule,
    RemoteEntryModule,
    RouterModule.forRoot([], { initialNavigation: 'enabledBlocking' }),
  ],
  providers   : [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}