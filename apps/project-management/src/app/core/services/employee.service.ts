import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '@exec-epp/core-models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  APIUrl="http://localhost:3333/api/Employees "; 
  constructor(protected httpClient: HttpClient ) {
  }

  getAll(): Observable<Array<Employee>>
  {
    return this.httpClient.get<Employee[]>(this.APIUrl);
  }


  

}
