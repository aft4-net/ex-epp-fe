import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from '../app.component';
;
import { SettimesheetComponent } from '../features/settimesheet/settimesheet.component';
import { TimesheetConfigurationComponent } from '../features/timesheet-configuration/timesheet-configuration-component';
import { DemoNgZorroAntdModule } from '../ng-zorro-antd.module';

import { RemoteEntryComponent } from './entry.component';

@NgModule({
  declarations: [RemoteEntryComponent],
  imports: [
    BrowserModule,
    DemoNgZorroAntdModule,
    RouterModule.forChild([
      {
        path: '',
        component: AppComponent,
        children: [
          {
            path:'timesheet',
            component: TimesheetConfigurationComponent
          },
         
          {
            path: 'set',
            component: SettimesheetComponent
          }
        ]
      },
    ]),
  ],
  providers: [],
})
export class RemoteEntryModule {}
