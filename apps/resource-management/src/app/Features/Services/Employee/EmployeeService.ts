import { BehaviorSubject } from 'rxjs';
import { Employee } from '../../Models/Employee';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseDto } from '../../Models/response-dto.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  baseUrl = 'http://localhost:14696/api/v1/Employee';

  private employeeSource = new BehaviorSubject<Employee>({} as Employee);
  employee$ = this.employeeSource.asObservable();

  constructor(private http: HttpClient) {}

  addEmployee(employee: Employee) {
    this.setEmployee(employee);
  }
  setEmployee(employee: Employee) {
    return this.http.post(this.baseUrl, employee).subscribe(
      (response: ResponseDto<Employee> | any) => {
        this.employeeSource.next(response.data), alert(response.message);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  setEmployeeData(employee: Partial<Employee>) {
    this.employeeSource.next({
      ...this.employeeSource.getValue(),

      ...employee,
    });

    console.log(this.employee$);
  }
}
