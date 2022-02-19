import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { ProjectModule } from '../features/project/project.module';
import { RemoteEntryComponent } from './entry.component';
import { httpJWTInterceptor } from '../../../../../libs/interceptor/httpJWTInterceptor';
@NgModule({
  declarations: [RemoteEntryComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    ProjectModule,
    BrowserAnimationsModule,
    RouterModule.forChild([]),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass:httpJWTInterceptor , multi: true },
    { provide: NZ_I18N, useValue: en_US }
  ]

})
export class RemoteEntryModule { }
