import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DemoNgZorroAntdModule } from "../../ng-zorro-antd.module";
import { AddEditDepartmentComponent } from "./add-edit-department/add-edit-department.component";
import { DepartmentRoutingModule } from "./department-routing.module";
import { DepartmentComponent } from "./department.component";

@NgModule({
    declarations: [DepartmentComponent, AddEditDepartmentComponent],
    imports: [
      FormsModule,
      ReactiveFormsModule,
      DemoNgZorroAntdModule,
      DepartmentRoutingModule,
      CommonModule
    ]
  })
  export class DepartmentModule { }