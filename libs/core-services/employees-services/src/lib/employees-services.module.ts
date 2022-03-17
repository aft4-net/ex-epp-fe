import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EmployeeApiService } from './services/emoployee';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    HttpClient,
    { provide: EmployeeApiService, useClass: EmployeeApiService }
  ]
})
export class EmployeesServicesModule {}
