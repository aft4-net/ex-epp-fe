import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ViewProjectLayoutComponent } from './features/project/components/view-project-layout/view-project-layout.component';

const routes:Routes=[

  {path:'view',component:ViewProjectLayoutComponent},

]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AppRoutingModule { }
