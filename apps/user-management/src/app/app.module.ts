import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { EppdashboardComponent } from './features/components/eppdashboard/eppdashboard.component';
import { NgModule } from '@angular/core';
import { UserDashboardComponent } from './features/components/user-dashboard/user-dashboard.component';

@NgModule({
  declarations: [AppComponent, EppdashboardComponent, UserDashboardComponent],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
