import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddClientComponent } from './features/add-client/add-client.component';
import { ClientsComponent } from './features/clients/clients.component';

const routes: Routes = [{path:'',component:ClientsComponent},
                       {path:'add-client',component:AddClientComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
