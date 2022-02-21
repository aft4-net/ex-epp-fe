import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientProjectComponent } from '../client-project/client-project.component';
import { AddProjectComponent } from './components/Add-Project/Add-Project.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { ProjectResourceComponent } from './components/project-resource/project-resource.component';

const routes: Routes = [
  {
    path: '',
    component: ClientProjectComponent,
  },
  {
    path: 'add-project',
    component: ProjectDetailsComponent,
  },
  {
    path: 'edit-project',
    component: AddProjectComponent,
  },
  {
    path: 'project-resources',
    component: ProjectResourceComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectRoutingModule {}
