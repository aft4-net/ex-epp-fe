import {  NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { ClientProjectComponent } from './features/client-project/client-project.component';

const routes:Routes=[
{

  path: '',
  component:ClientProjectComponent,
  
  children: [
    {
      path:'client-project',
      loadChildren:()=>
      import('./features/project/project.module').then((m)=>m.ProjectModule),
    }
]
}

]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
