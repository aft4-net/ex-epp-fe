import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from '../app.component';
import { DepartmentComponent } from '../features/department/department.component';
import { RoleComponent } from '../features/role/role.component';
;
import { TimesheetConfigurationComponent } from '../features/timesheet-configuration/timesheet-configuration-component';
import { DemoNgZorroAntdModule } from '../ng-zorro-antd.module';

import { RemoteEntryComponent } from './entry.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [RemoteEntryComponent],
  imports: [
    BrowserModule,
    DemoNgZorroAntdModule,
    NzNotificationModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: AppComponent,
        children: [
          {
            path: '',
            component: DepartmentComponent
          },
          {
            path:'timesheet',
            component: TimesheetConfigurationComponent
          },
         
          {
            path: 'role',
            component: RoleComponent
          }
        ]
      },
    ]),
  ],
  providers: [],
})
export class RemoteEntryModule {}
