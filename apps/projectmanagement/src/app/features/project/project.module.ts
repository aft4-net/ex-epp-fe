

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectRoutingModule } from './project-routing.module';
import {ReactiveFormsModule,FormsModule} from '@angular/forms';
import { AddresourceComponent } from './components/addresource/addresource.component';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';
import { NgZorroModule } from '@exec-epp/ng-zorro';
import { ViewProjectLayoutComponent } from './components/view-project-layout/view-project-layout.component';
import { AddProjectComponent } from './components/Add-Project/Add-Project.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from '../../core';
import { ClientProjectComponent } from '../client-project/client-project.component';

@NgModule({
  declarations: [
   ClientProjectComponent, 
   ViewProjectLayoutComponent,AddProjectComponent, AddresourceComponent,BreadCrumbComponent
  ],
  imports: [
    ReactiveFormsModule,FormsModule,
    CommonModule,
    ProjectRoutingModule,
    NgZorroModule,
    ProjectRoutingModule

  ],
  exports:[ViewProjectLayoutComponent, AddProjectComponent, BreadCrumbComponent ],
  providers:[],
})
export class ProjectModule { }
