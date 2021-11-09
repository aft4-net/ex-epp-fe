import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { ProjectFormComponent } from './features/project/components/project-form/project-form.component';
import { ProjectCreateComponent } from './features/project/pages/project-create/project-create.component';
import { BreadCrumbComponent } from './features/project/components/bread-crumb/bread-crumb.component';
import { NgZorroModule } from '@exec-epp/ng-zorro';
import { AddProjectComponent } from './features/project/components/Add-Project/Add-Project.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectFormComponent,
    ProjectCreateComponent,
    AddProjectComponent,
    BreadCrumbComponent
  ],
  imports: [
    BrowserModule,
    NgZorroModule,
    RouterModule.forRoot([], { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
