import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { ClientProjectComponent } from '../client-project/client-project.component';


const routes: Routes = [        {
  path: '',
  component: ClientProjectComponent,
},
{
  path: 'add-project',
  loadChildren: () =>
    import('./project-add.module').then(
      (m) => m.ProjectCrudModule
    ) 
}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule,],
})
export class ProjectRoutingModule { }
