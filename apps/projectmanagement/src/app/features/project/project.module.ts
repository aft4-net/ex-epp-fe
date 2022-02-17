

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectRoutingModule } from './project-routing.module';
import {ReactiveFormsModule,FormsModule} from '@angular/forms';
import { AddresourceComponent } from './components/addresource/addresource.component';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';
import { ViewProjectLayoutComponent } from './components/view-project-layout/view-project-layout.component';
import { AddProjectComponent } from './components/Add-Project/Add-Project.component';

import { ClientProjectComponent } from '../client-project/client-project.component';
import { ProjectResourceComponent } from './components/project-resource/project-resource.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { DemoNgZorroAntdModule } from '../../ng-zorro-antd.module';

@NgModule({
  declarations: [
   ClientProjectComponent, 
   ViewProjectLayoutComponent,AddProjectComponent, AddresourceComponent,BreadCrumbComponent, ProjectResourceComponent, ProjectDetailsComponent
  ],
  imports: [
    ReactiveFormsModule,FormsModule,
    CommonModule,
    ProjectRoutingModule,
    ProjectRoutingModule,
    DemoNgZorroAntdModule 

  ],
  exports:[ViewProjectLayoutComponent, AddProjectComponent, BreadCrumbComponent ],
  providers:[],
})
export class ProjectModule { }
