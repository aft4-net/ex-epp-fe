import { RemoteEntryModule } from './remote-entry/entry.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgZorroModule } from '@exec-epp/ng-zorro';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ProjectCreateComponent } from './features/project/pages/project-create/project-create.component';
import { HeaderComponent } from './core/header/header.component';
import en from '@angular/common/locales/en';
import { registerLocaleData } from '@angular/common';
import { ClientProjectComponent } from './features/client-project/client-project.component';
import { ProjectModule } from './features/project/project.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HttpInterceptorService } from './core';
import { DemoNgZorroAntdModule } from './ng-zorro-antd.module';

registerLocaleData(en);
@NgModule({
  declarations: [
    AppComponent,
    ProjectCreateComponent,

    HeaderComponent
  ],
  imports: [
    ProjectModule,
    NzIconModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    // BrowserAnimationsModule,
    HttpClientModule,
    BrowserModule,
    //  NgZorroModule,
    DemoNgZorroAntdModule,
    RemoteEntryModule,
    RouterModule.forRoot([], { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
    { provide: NZ_I18N, useValue: en_US }
  ],
  exports: [AppComponent],

  bootstrap: [AppComponent],
})
export class AppModule { }
