import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';

import { AddProjectComponent } from './features/project/components/Add-Project/Add-Project.component';
import { AddresourceComponent } from './features/project/components/addresource/addresource.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BreadCrumbComponent } from './features/project/components/bread-crumb/bread-crumb.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgZorroModule } from '@exec-epp/ng-zorro';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ProjectCreateComponent } from './features/project/pages/project-create/project-create.component';
import { ProjectDetailComponent } from './features/project/components/project-detail/project-detail.component';
import { ProjectFormComponent } from './features/project/components/project-form/project-form.component';

import { RouterModule } from '@angular/router';
import { ViewProjectLayoutComponent } from './features/project/components/view-project-layout/view-project-layout.component';
import en from '@angular/common/locales/en';
import { registerLocaleData } from '@angular/common';
import { ClientProjectComponent } from './features/client-project/client-project.component';
import { ProjectModule } from './features/project/project.module';

registerLocaleData(en);
@NgModule({
  declarations: [
    AppComponent,
    ProjectFormComponent,
    ProjectCreateComponent,
   ClientProjectComponent,
  

  ],
  imports: [
    AppRoutingModule,
    ProjectModule,
    NzIconModule ,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserModule,
    NgZorroModule,
    AppRoutingModule,

  ],
  providers: [ { provide: NZ_I18N, useValue: en_US }],
  exports:[AppComponent],

  bootstrap: [AppComponent],
})
export class AppModule {}
