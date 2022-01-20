import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentComponent } from './department.component';
import { AddEditDepartmentComponent } from './add-edit-department/add-edit-department.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DepartmentRoutingModule } from './department-routing.module';
import { DemoNgZorroAntdModule } from '../../ng-zorro-antd.module';



@NgModule({
  declarations: [
    DepartmentComponent,
    AddEditDepartmentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DepartmentRoutingModule,
    DemoNgZorroAntdModule
  ]
})
export class DepartmentModule { }
