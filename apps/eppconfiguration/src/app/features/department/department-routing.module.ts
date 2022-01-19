import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentComponent } from './department.component';
import { AddEditDepartmentComponent } from './add-edit-department/add-edit-department.component';

const routes: Routes = [
  {path: '', component: DepartmentComponent},
  {path: 'add', component: AddEditDepartmentComponent},
  {path: 'edit/:id', component: AddEditDepartmentComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class DepartmentRoutingModule { }
