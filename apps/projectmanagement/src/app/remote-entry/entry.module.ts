import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { RemoteEntryComponent } from './entry.component';
import { httpJWTInterceptor } from '../../../../../libs/interceptor/httpJWTInterceptor';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
@NgModule({
  declarations: [RemoteEntryComponent],
  imports: [
    NzNotificationModule,
    BrowserModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    RouterModule.forChild([
      {path:'',
    component:RemoteEntryComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./../features/project/project.module').then((m) => m.ProjectModule)
      }]}
    ]),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass:httpJWTInterceptor , multi: true },
    { provide: NZ_I18N, useValue: en_US }
  ]

})
export class RemoteEntryModule { }
