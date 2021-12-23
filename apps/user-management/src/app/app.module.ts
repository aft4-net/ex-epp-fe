import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { EppdashboardComponent } from './features/components/eppdashboard/eppdashboard.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [AppComponent, EppdashboardComponent],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
