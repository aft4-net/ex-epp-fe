import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectDetailsComponent } from './components/project-details/project-details.component';


const routes: Routes = [ 

  // {path:'',redirectTo:'/edit-project',pathMatch:'full'},
  // {path:'',redirectTo:'/project-resources',pathMatch:'full'},


 { path: '',
  component: ProjectDetailsComponent,
},
// {
//   path: 'edit-project',
//   component: AddProjectComponent,
// },
// {
//   path: 'project-resources',
//   component: ProjectResourceComponent,
// },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectCrudRoutingRoutingModule { }
