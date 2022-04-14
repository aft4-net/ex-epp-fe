import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from '../app.component';
import { DepartmentComponent } from '../features/department/department.component';
import { RoleComponent } from '../features/role/role.component';
import { TimesheetConfigurationComponent } from '../features/timesheet-configuration/timesheet-configuration-component';
import { DemoNgZorroAntdModule } from '../ng-zorro-antd.module';
import { RemoteEntryComponent } from './entry.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { httpJWTInterceptor } from './../interceptors/httpJWTInterceptor';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { CountryComponent } from '../features/country/country.component';
import { DutyStationComponent } from '../features/duty-station/duty-station.component';
import { DepartmentModule } from '../features/department/department.module';
const routes: Routes = [
  { 
    
   path: '',
   component: AppComponent,
    children: [
      {
        path: 'department',
        loadChildren: () => import('../features/department/department.module').then(m => m.DepartmentModule),
        data: {
          breadcrumb: "Department"
        }
      },
      {
        path:'timesheet',
        component: TimesheetConfigurationComponent,
        data: {
          breadcrumb: "Timesheet"
        }
      },
      {
        path: 'job-title',
        component: RoleComponent,
        data: {
          breadcrumb: "Job Title"
        }
      },
      {
        path: "country",
        component: CountryComponent,
        data: {
          breadcrumb: "Country"
        }
      },
      {
        path: "duty-station",
        component: DutyStationComponent,
        data: {
          breadcrumb: "Duty Station"
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
