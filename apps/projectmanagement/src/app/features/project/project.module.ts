import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectRoutingModule } from './project-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ViewProjectLayoutComponent } from './components/view-project-layout/view-project-layout.component';
import { DemoNgZorroAntdModule } from '../../ng-zorro-antd.module';
import { HttpClientModule } from '@angular/common/http';
import { AddProjectComponent } from './components/Add-Project/Add-Project.component';
import { ProjectResourceComponent } from './components/project-resource/project-resource.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { AddresourceComponent } from './components/addresource/addresource.component';

@NgModule({
  declarations: [
    ViewProjectLayoutComponent,
    AddProjectComponent,
    ProjectResourceComponent,
    ProjectDetailsComponent,
    AddresourceComponent,
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    ProjectRoutingModule,
    DemoNgZorroAntdModule,
    FormsModule,
    HttpClientModule,
  ],
  exports: [],
  providers: [],
})
export class ProjectModule {}
