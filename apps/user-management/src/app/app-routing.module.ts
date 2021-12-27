import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { EppdashboardComponent } from './features/components/eppdashboard/eppdashboard.component';
import { Component, NgModule } from '@angular/core';
import { SiderComponent } from './components/application/sider/sider.component';
import { AddUserComponent } from './features/components/user/add-user/add-user.component';

const routes: Routes = [
  { path: '', component: SiderComponent, },
  {path: 'add-user', component: AddUserComponent},
 { path: 'ed', component: EppdashboardComponent, },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
