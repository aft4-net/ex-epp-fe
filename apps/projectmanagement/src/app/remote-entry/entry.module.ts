import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from '../app.component';
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
             path: 'client-project/add-project',
             component: AddProjectComponent
          },
        ],
      },
    ]),
  ],
  providers: [],
})
export class RemoteEntryModule {}
