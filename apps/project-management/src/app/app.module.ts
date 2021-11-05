import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { ProjectFormComponent } from './features/project/components/project-form/project-form.component';
import { ProjectCreateComponent } from './features/project/pages/project-create/project-create.component';
import { BreadCrumbComponent } from './features/project/components/bread-crumb/bread-crumb.component';
import { NgZorroModule } from '@exec-epp/ng-zorro';
import { AddProjectComponent } from './features/project/components/Add-Project/Add-Project.component';
import { AddresourceComponent } from './features/project/components/addresource/addresource.component';
import { ResourseRequirementComponent } from './features/project/components/resourse-requirement/resourse-requirement.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ProjectDetailComponent } from './features/project/components/project-detail/project-detail.component';
registerLocaleData(en);
@NgModule({
  declarations: [

    AddresourceComponent,
    ResourseRequirementComponent,
    AppComponent,
    ProjectFormComponent,
    ProjectCreateComponent,
    AddProjectComponent,
    BreadCrumbComponent,
    ProjectDetailComponent

  ],
  imports: [
    NzIconModule ,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserModule,
    NgZorroModule,
    RouterModule.forRoot([], { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
})
export class AppModule {}
