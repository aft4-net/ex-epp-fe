import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Employee } from '..';
import { ApiService } from '../models/apiService';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends ApiService<Employee> {

  constructor(protected httpClient: HttpClient ) { 
    super(httpClient);
  }

  getResourceUrl(): string {

    return 'Employee/GetEmployeeSelection';
  }

   
}





