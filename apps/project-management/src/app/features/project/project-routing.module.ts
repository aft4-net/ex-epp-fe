import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { AddProjectComponent } from './components/Add-Project/Add-Project.component';

const routes: Routes = [
 
  { path: 'add-projects', component: AddProjectComponent},  
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectRoutingModule { }
