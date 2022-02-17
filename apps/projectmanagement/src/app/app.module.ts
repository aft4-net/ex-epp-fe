import { RemoteEntryModule } from './remote-entry/entry.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import en from '@angular/common/locales/en';
import { registerLocaleData } from '@angular/common';

import { ProjectModule } from './features/project/project.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { DemoNgZorroAntdModule } from './ng-zorro-antd.module';

registerLocaleData(en);
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    ProjectModule,
    NzIconModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    HttpClientModule,
    DemoNgZorroAntdModule,
    RemoteEntryModule,
    RouterModule.forRoot([], { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  exports: [AppComponent],

  bootstrap: [AppComponent],
})
export class AppModule { }
