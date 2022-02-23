import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProjectComponent } from './components/Add-Project/Add-Project.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { ProjectResourceComponent } from './components/project-resource/project-resource.component';
import { ViewProjectLayoutComponent } from './components/view-project-layout/view-project-layout.component';

const routes: Routes = [
  {
    path: '',
    component: ViewProjectLayoutComponent
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
  {
    path: '**',
    component: ViewProjectLayoutComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectRoutingModule {}

