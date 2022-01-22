import { RemoteEntryModule } from './remote-entry/entry.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { DemoNgZorroAntdModule } from './ng-zorro-antd.module';
import { TimesheetConfigurationComponent } from './features/timesheet-configuration/timesheet-configuration-component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent,TimesheetConfigurationComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    DemoNgZorroAntdModule,
    RouterModule.forRoot([], { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
