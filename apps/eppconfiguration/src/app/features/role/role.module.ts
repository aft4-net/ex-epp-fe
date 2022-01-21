import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleComponent } from './role.component';
import { AddEditRoleComponent } from './add-edit-role/add-edit-role.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoleRoutingModule } from './role-routing.module';
import { DemoNgZorroAntdModule } from '../../ng-zorro-antd.module';



@NgModule({
  declarations: [
    RoleComponent,
    AddEditRoleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RoleRoutingModule,
    DemoNgZorroAntdModule
  ]
})
export class RoleModule { }
