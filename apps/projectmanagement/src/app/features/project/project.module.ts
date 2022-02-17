

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectRoutingModule } from './project-routing.module';
import {ReactiveFormsModule,FormsModule} from '@angular/forms';

import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';
import { ViewProjectLayoutComponent } from './components/view-project-layout/view-project-layout.component';


import { ClientProjectComponent } from '../client-project/client-project.component';

import { DemoNgZorroAntdModule } from '../../ng-zorro-antd.module';


@NgModule({
  declarations: [
   ClientProjectComponent, 
   ViewProjectLayoutComponent,BreadCrumbComponent, 
  ],
  imports: [
    ReactiveFormsModule,FormsModule,
    CommonModule,
    ProjectRoutingModule,
    DemoNgZorroAntdModule 

  ],
  exports:[ BreadCrumbComponent ],
  providers:[],
})
export class ProjectModule { }
