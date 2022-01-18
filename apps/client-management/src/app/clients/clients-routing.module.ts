import { RouterModule, Routes } from '@angular/router';

import { AddClientComponent } from './add-client/add-client.component';
import { NgModule } from '@angular/core';
import { ViewClientsComponent } from './view-clients/view-clients.component';

const routes: Routes = [

                        {path: '', component: ViewClientsComponent },
                        {path:'add-client',component:AddClientComponent}
                        ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
