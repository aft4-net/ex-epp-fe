import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleComponent } from './role.component';
import { AddEditRoleComponent } from './add-edit-role/add-edit-role.component';

const routes: Routes = [
  {path: '', component: RoleComponent},
  {path: 'add', component: AddEditRoleComponent},
  {path: 'edit/:id', component: AddEditRoleComponent}
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
export class RoleRoutingModule { }
