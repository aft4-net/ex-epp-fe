import { AppComponent } from '../app.component';
import { AppModule } from '../app.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RemoteEntryComponent } from './entry.component';
import { RouterModule } from '@angular/router';
import { PermissionComponent } from '../features/components/permission/permission.component';

@NgModule({
  declarations: [RemoteEntryComponent],
  imports: [
    BrowserModule,
    RouterModule.forChild([
      {
        path: '',
        component: AppComponent,
      },
      {
        path:'permission',component:PermissionComponent
      }
    ]),
  ],
  providers: [],
})
export class RemoteEntryModule {}
