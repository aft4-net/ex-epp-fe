import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ClientsModule } from './clients/clients.module';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RemoteEntryModule } from './remote-entry/entry.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    RemoteEntryModule,
    BrowserModule,
    RouterModule,
    NzIconModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    ClientsModule,
    RouterModule.forRoot([], { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
