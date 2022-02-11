import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
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
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { httpJWTInterceptor } from '../../../../../libs/interceptor/httpJWTInterceptor';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { CountryComponent } from '../features/country/country.component';
const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        component: DepartmentComponent,
        data: {
          breadcrumb: "configuration"
        }
      },
      {
        path: 'department',
        component: DepartmentComponent,
        data: {
          breadcrumb: "department"
        }
      },
      {
        path:'timesheet',
        component: TimesheetConfigurationComponent,
        data: {
          breadcrumb: "timesheet"
        }
      },
      {
        path: 'role',
        component: RoleComponent,
        data: {
          breadcrumb: "role"
        }
      },
      {
        path: "country",
        component: CountryComponent,
        data: {
          breadcrumb: "country"
        }
      }
    ]
  },

]
@NgModule({
  declarations: [RemoteEntryComponent],
  imports: [
    BrowserModule,
    DemoNgZorroAntdModule,
    NzNotificationModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    { provide: HTTP_INTERCEPTORS, useClass: httpJWTInterceptor, multi: true },
  ],
})
export class RemoteEntryModule {}
