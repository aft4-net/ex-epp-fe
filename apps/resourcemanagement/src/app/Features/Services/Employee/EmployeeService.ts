
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from '../../Models/Employee';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseDTO, ResponseDto } from '../../Models/response-dto.model';
import { map, shareReplay } from 'rxjs/operators';
import { EmployeeOrganization } from '../../Models/EmployeeOrganization/EmployeeOrganization';
import { IEmployeeViewModel } from '../../Models/Employee/EmployeeViewModel';
import { EmployeeParams } from '../../Models/Employee/EmployeeParams';
import { PaginationResult } from '../../Models/PaginationResult';
import { Result } from 'postcss';
import { Pagination } from '../../Models/Pagination';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  public isdefault = true;

  baseUrl = environment.apiUrl+ '/Employee';
  constructor(private http: HttpClient) {}

  private employeeSource = new BehaviorSubject<Employee>({} as Employee);
  employee$ = this.employeeSource.asObservable();

  private responseDtoSource = new BehaviorSubject<ResponseDto<Employee>>(
    {} as ResponseDto<Employee>
  );
  responseDto$ = this.responseDtoSource.asObservable();

  public employeeListSource = new BehaviorSubject<IEmployeeViewModel[]>(
    {} as IEmployeeViewModel[]
  );
  employeeList$: Observable<IEmployeeViewModel[]> =
    this.employeeListSource.asObservable();

  public paginatedEmployeeListSource = new BehaviorSubject<
    PaginationResult<IEmployeeViewModel[]>
  >({} as PaginationResult<IEmployeeViewModel[]>);
  paginatedEmployeeList$: Observable<PaginationResult<IEmployeeViewModel[]>> =
    this.paginatedEmployeeListSource.asObservable();

  employee!: Employee;
  employeeById?: Employee;
  isEdit!: boolean;
  save = 'Save';
  setEmployeeDataForEdit(employee: Employee) {
    this.employeeById = employee;
  }
  addEmployee(employee: Employee) {
    this.setEmployee(employee);
  }
  setEmployee(employee: Employee) {
    return this.http.post(this.baseUrl, employee).subscribe(
      (response: ResponseDto<Employee> | any) => {
        this.employeeSource.next(response.data), console.log(response.message);
      },
      (error) => {
        console.log(error);
      }
    );
    if (this.isEdit) {
      return this.http.put(this.baseUrl, employee).subscribe(
        (response: ResponseDto<Employee> | any) => {
          this.employeeSource.next(response.data),
            console.log(response.message);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  setEmployeeData(employee: Partial<Employee>) {
    this.employeeSource.next({
      ...this.employeeSource.getValue(),

      ...employee,
    });
  }
  getPersonalAddresses() {
    const addresses = this.employeeSource.getValue().EmployeeAddress;
    if (addresses !== null && addresses !== undefined) {
      return addresses;
    } else {
      return [];
    }
  }
  getPersonalInfo() {
    const PersonInfo = this.employeeSource.getValue();
    //if(PersonInfo !== null && PersonInfo !== undefined){
    return PersonInfo;
    //}
  }

  getEmployeeListInfo() {
    const employeeList = this.employeeListSource.getValue();
    return employeeList;
  }

  add(employee: Employee) {
    delete employee.guid;
    return this.http.post(this.baseUrl, employee);
  }

  update(employee: Employee) {
    return this.http.put(this.baseUrl, employee);
  }

  checkIdNumber(idNumber: string): Observable<boolean> {
    const params = new HttpParams().set('idNumber', idNumber);
    // this.http.get(
    //   "http://localhost:14696/api/v1/Employee/checkidnumber?idNumber=hhvvfd"
    // )
    // .subscribe(r => {
    //   console.log('l')
    //   console.log(r)
    //   console.log('l')
    // })
    const result = this.http.get(
      this.baseUrl + "/checkidnumber?" + params.toString()
    )
    .pipe(
      map((response: any) => {
        console.log('Changed')
    
        console.log(response)
        return response as boolean;
      })
    );

    
    return result;
  }
  saveEmployee() {
    this.employee$.subscribe((x) => {
      this.employee = x;
    });
    return this.http.post(this.baseUrl, this.employee).subscribe(
      (response: ResponseDto<Employee> | any) => {
        this.responseDtoSource.next(response),
          this.employeeSource.next(response.data),
          console.log(response.message);
      },
      (error) => {
        console.log(error);
      }
    );
    if (this.isEdit) {
      this.employee$.subscribe((x) => {
        this.employee = x;
      });
      return this.http.put(this.baseUrl, this.employee).subscribe(
        (response: ResponseDto<Employee> | any) => {
          this.employeeSource.next(response.data),
            console.log(response.message);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  updateEmployee() {

    this.employee$.subscribe((x) => {
      this.employee = x;
    });

    console.log('From The new Save Method ' + this.employee.FirstName);

    return this.http.put(this.baseUrl, this.employee).subscribe(
      (response: ResponseDto<Employee> | any) => {
        this.employeeSource.next(response.data), console.log(response.message);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getEmployeeOrganization(): EmployeeOrganization {
    const organization = this.employeeSource.getValue().EmployeeOrganization;
    if (organization !== null && organization !== undefined) {
      return organization;
    } else {
      return <EmployeeOrganization>{};
    }
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  paginatedResult: PaginationResult<IEmployeeViewModel[]> = {
    Data: [] as IEmployeeViewModel[],
    pagination: {} as Pagination,
  };

  SearchEmployeeData(
    employeeParams: EmployeeParams
  ): Observable<PaginationResult<IEmployeeViewModel[]>> {
    return this.http
      .get<PaginationResult<IEmployeeViewModel[]>>(
        this.baseUrl + '/GetAllEmployeeDashboard',
        {
          params: {
            searhKey: employeeParams.searchKey,
            pageIndex: employeeParams.pageIndex,
            pageSize: employeeParams.pageSize,
          },
        }
      )
      .pipe(
        map((result: any) => {
          this.paginatedResult = {
            Data: result.Data,
            pagination: {
              PageIndex: result.PageIndex,
              TotalRows: result.TotalPage,
              PageSize: result.PageSize,
              TotalRecord: result.TotalRecord,
            },
          };
          return this.paginatedResult;
        })
      );
  }

  getEmployeeData(employeeId: string): Observable<Employee> {
    return this.http
      .get<ResponseDTO<Employee>>(
        this.baseUrl + '/GetEmployeeWithID?employeeId=' + employeeId
      )
      .pipe(map((result) => result.Data));
  }

  getUser(email:string){
    return this.http.get<any>(this.baseUrl +'/GetEmployeeSelectionByEmail?employeeEmail=' + email.toLowerCase());
   }
}
