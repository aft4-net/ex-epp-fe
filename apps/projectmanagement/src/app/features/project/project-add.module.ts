import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProjectComponent } from './components/Add-Project/Add-Project.component';
import { ProjectResourceComponent } from './components/project-resource/project-resource.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { AddresourceComponent } from './components/addresource/addresource.component';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProjectCrudRoutingRoutingModule } from './project-add-routing.module';
import { ManageProjectComponent } from './manage-project/manage-project.component';




@NgModule({
  declarations: [ManageProjectComponent,AddProjectComponent,ProjectResourceComponent,ProjectDetailsComponent,AddresourceComponent],
  imports: [
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    NzAutocompleteModule,
    NzButtonModule,
    NzBreadCrumbModule,
    NzDatePickerModule,
    NzDropDownModule,
    NzFormModule,
    NzGridModule,
    NzIconModule, 
    NzInputModule,
    NzLayoutModule,
    NzModalModule,
    NzNotificationModule,
    NzPageHeaderModule,
    NzPaginationModule,
    NzSelectModule,
    NzTableModule,
    NzTabsModule,
    ProjectCrudRoutingRoutingModule
  ],
  exports:[ProjectDetailsComponent]
})
export class ProjectCrudModule { }
