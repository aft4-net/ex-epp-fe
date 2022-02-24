import { RemoteEntryModule } from './remote-entry/entry.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';
import en from '@angular/common/locales/en';
import { registerLocaleData } from '@angular/common';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';


registerLocaleData(en);
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
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
