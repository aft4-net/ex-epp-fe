import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';

import { AngularFileUploaderModule } from "angular-file-uploader";
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { DemoNgZorroAntdModule } from './ng-zorro-antd.module';
import { EmployeeRoutingModule } from './Features/Components/employee/employee-routing.module';
import { NgModule } from '@angular/core';
import { PageBreadcrumbComponent } from './components/page-breadcrumb/page-breadcrumb.component';
import { PageFooterComponent } from './components/page-footer/page-footer.component';
import { RemoteEntryModule } from './remote-entry/entry.module';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import en from '@angular/common/locales/en';
import { httpJWTInterceptor } from 'libs/interceptor/httpJWTInterceptor';
import { registerLocaleData } from '@angular/common';

registerLocaleData(en);
@NgModule({
  declarations: [
    AppComponent,
    PageFooterComponent,
    PageBreadcrumbComponent,
    
  ],
  imports: [
    RemoteEntryModule,
    EmployeeRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DemoNgZorroAntdModule,
    AngularFileUploaderModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([], { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US },
    { provide: HTTP_INTERCEPTORS, useClass: httpJWTInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
