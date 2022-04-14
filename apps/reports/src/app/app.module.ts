import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonSize, NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { RemoteEntryModule } from './remote-entry/entry.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ViewreportComponent } from './timesheetreports/viewreport/viewreport.component';




@NgModule({
  declarations: [AppComponent, ViewreportComponent],

  imports: [
    NzDropDownModule,
    BrowserModule,
    NzBreadCrumbModule,
    NzTableModule,
    NzSelectModule,
    NzFormModule,
    BrowserAnimationsModule,
    NzDatePickerModule,
    NzButtonModule,
    NzIconModule,
   
    
    RouterModule.forRoot([], { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
