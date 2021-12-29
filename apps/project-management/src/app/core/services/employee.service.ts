import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEmployeeViewModel } from '..';
import { ApiService } from '../models/apiService';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends ApiService<IEmployeeViewModel> {

  constructor(protected httpClient: HttpClient ) { 
    super(httpClient);
  }

  getResourceUrl(): string {

    return 'Employees';
  }

}





