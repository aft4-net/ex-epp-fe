import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from '../app.component';
import { HttpInterceptorService } from '../core';
import { ClientProjectComponent } from '../features/client-project/client-project.component';
import { ViewProjectLayoutComponent } from '../features/project/components/view-project-layout/view-project-layout.component';
import { ProjectRoutingModule } from '../features/project/project-routing.module';
import { ProjectModule } from '../features/project/project.module';

import { RemoteEntryComponent } from './entry.component';

@NgModule({
  declarations: [RemoteEntryComponent],
  imports: [
    BrowserModule,
    ProjectModule,
    RouterModule.forChild([
      {
        // path: '',
        // component: AppComponent,
        // children:[{
        //   path:'',
        //   component: ViewProjectLayoutComponent,
        // }]
        path: '',
        component: ClientProjectComponent,

        children: [
          {
            path: 'client-project',
            loadChildren: () =>
              import('../features/project/project.module').then(
                (m) => m.ProjectModule
              ),
          },
        ],
      },
    ]),
  ],
  providers: [ {
    provide:HTTP_INTERCEPTORS,
    useClass:HttpInterceptorService,
    multi:true
  }]
})
export class RemoteEntryModule {}
