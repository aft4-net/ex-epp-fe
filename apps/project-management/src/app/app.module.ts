import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { ProjectFormComponent } from './features/project/components/project-form/project-form.component';
import { ProjectCreateComponent } from './features/project/pages/project-create/project-create.component';

@NgModule({
  declarations: [AppComponent, ProjectFormComponent, ProjectCreateComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
