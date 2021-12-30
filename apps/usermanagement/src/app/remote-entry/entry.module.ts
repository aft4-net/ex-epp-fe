import { AppComponent } from '../app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RemoteEntryComponent } from './entry.component';
import { RouterModule } from '@angular/router';
import { PermissionComponent } from '../features/components/permission/permission.component';
import { HttpClientModule } from '@angular/common/http';
import { UserDashboardComponent } from '../features/components/user-dashboard/user-dashboard.component';
import { DemoNgZorroAntdModule } from '../ng-zorro-antd.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GroupsetComponent } from '../features/components/groupset/groupset.component';
@NgModule({
  declarations: [RemoteEntryComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    DemoNgZorroAntdModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: AppComponent,
      },
      {
        path:'permission',component:PermissionComponent
      },
      {
        path:'user-dashboard',component:UserDashboardComponent
      },
      {
        path:'group',component:GroupsetComponent
      }
    ]),
  ],
  providers: [],
})
export class RemoteEntryModule {}
