import { RemoteEntryModule } from './remote-entry/entry.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { DemoNgZorroAntdModule } from './ng-zorro-antd.module';
import { TimesheetConfigurationComponent } from './features/timesheet-configuration/timesheet-configuration-component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoleComponent } from './features/role/role.component';
import { AddEditRoleComponent } from './features/role/add-edit-role/add-edit-role.component';
import { DepartmentComponent } from './features/department/department.component';
import { AddEditDepartmentComponent } from './features/department/add-edit-department/add-edit-department.component';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { httpJWTInterceptor } from 'libs/interceptor/httpJWTInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    TimesheetConfigurationComponent, 
    RoleComponent, 
    AddEditRoleComponent,
    DepartmentComponent,
    AddEditDepartmentComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    DemoNgZorroAntdModule,
    NzNotificationModule,
    RouterModule.forRoot([], { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: httpJWTInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
