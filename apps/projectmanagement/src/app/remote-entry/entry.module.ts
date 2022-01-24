import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { AppComponent } from '../app.component';
import { HttpInterceptorService } from '../core';
import { ClientProjectComponent } from '../features/client-project/client-project.component';
import { AddProjectComponent } from '../features/project/components/Add-Project/Add-Project.component';
import { ProjectRoutingModule } from '../features/project/project-routing.module';
import { ProjectModule } from '../features/project/project.module';
import { DemoNgZorroAntdModule } from '../ng-zorro-antd.module';
import { RemoteEntryComponent } from './entry.component';

@NgModule({
  declarations: [RemoteEntryComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ProjectModule,
    ProjectRoutingModule,
    BrowserAnimationsModule,
    DemoNgZorroAntdModule,
    RouterModule.forChild([
      {
        path: '',
        component: AppComponent,
        children: [
          {
            path: '',
            component: ClientProjectComponent,
          },
          {
            path: 'add-project',
            component: AddProjectComponent,
          },
        ],
      },
    ]),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
    { provide: NZ_I18N, useValue: en_US }
  ]

})
export class RemoteEntryModule { }
