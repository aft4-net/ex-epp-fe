
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
  public empNum="ec0001";

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

  filterEmployeeData(
    employeeParams: EmployeeParams,JobType:string,Location:string,Status:string
  ): Observable<PaginationResult<IEmployeeViewModel[]>> {
    
    return this.http
      .get<PaginationResult<IEmployeeViewModel[]>>(
        this.baseUrl + '/GetAllEmployeeDashboardFilter',
        {
          params: {
            jobType: JobType,
            location:Location,
            status:Status,
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
        }),
        
      );
  }

  SearchEmployeeDataforFilter(
    employeeParams: EmployeeParams
  ): Observable<PaginationResult<IEmployeeViewModel[]>> {
    return this.http
      .get<PaginationResult<IEmployeeViewModel[]>>(
        this.baseUrl + '/GetAllEmployeeDashboard',
        {
          params: {
            searhKey: "",
            pageIndex: employeeParams.pageIndex,
            pageSize: "10000",
          },
        }
      )
      .pipe(
        map((result: any) => {
         /* this.paginatedResult = {
            Data: result.Data,
            pagination: {
              PageIndex: result.PageIndex,
              TotalRows: result.TotalPage,
              PageSize: result.PageSize,
              TotalRecord: result.TotalRecord,
            },
          };*/
          return result.Data;
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

  DeleteEmployee(employeeId:string) {
    return this.http.delete<unknown>(this.baseUrl +'/DeleteEmployee?employeeId=' + employeeId);
  }

  getFilterData(){
    const clientNameFliter: { text: string; value: string }[] = [] as {
      text: string;
      value: string;
    }[];
    const SupervisorFilter: { text: string; value: string }[] = [] as {
      text: string;
      value: string;
    }[];
    const statusFilter: { text: string; value: string }[] = [] as {
      text: string;
      value: string;
    }[];
    
    return this.http.get(environment.apiUrl+"/Employee/FilterData").pipe(map((response:any)=>{
      console.log((response.Data.Status[0]));
      if(Object.keys(response.Data).length!= 0)
      {
        for (let i = 0; i < response.Data.jobtype.length; i++){
          if(clientNameFliter.findIndex(x=>x.text === response.Data.jobtype[i].Name.trim()) === -1 ){
          clientNameFliter.push({
            text: response.Data.jobtype[i].Name,
            value: response.Data.jobtype[i].Name,
          });
        }
        }
        for (let i = 0; i < response.Data.location.length; i++){
          if(SupervisorFilter.findIndex(x=>x.text === response.Data.location[i].Name.trim()) === -1 ){
          SupervisorFilter.push({
            text: response.Data.location[i].Name,
            value: response.Data.location[i].Name,
          });
        }
        }
        for (let i = 0; i < response.Data.Status.length; i++){
          if(statusFilter.findIndex(x=>x.text === response.Data.Status[i].Name.trim()) === -1 ){
          statusFilter.push({
            text: response.Data.Status[i].Name,
            value: response.Data.Status[i].Name,
          });
        }
        }

      }
      return {
        jobtitleFilter :clientNameFliter,
        StatusFilter :statusFilter,
        locationFilter:SupervisorFilter
      }
    }))
  }

  getWithPagnationResut( pageindex:number,pageSize:number,id?: string,
                         clientlist?:string[] ,
                         superVisorlist?:string[],
                         statuslist?:string[],searchKey?:string) :Observable<PaginationResult<IEmployeeViewModel[]>>
  {let params = new HttpParams()
    .set('pageindex', pageindex.toString())
    .set('pageSize', pageSize.toString());
    if(searchKey !== null){
      params = params.append('searchkey', searchKey?searchKey:'');
    }
    if(id !== null){
      params = params.append('id', id?id:'');
    }
    if(clientlist !== null){
      clientlist?.forEach((client) =>{
        params = params.append('jobtype', client);
      })

    }
    if(superVisorlist !== null){
      superVisorlist?.forEach((supervisorId) =>{
        params = params.append('location', supervisorId);
      })

    }
    if(statuslist!== null){
      statuslist?.forEach((status) =>{
        params = params.append('status', status);
      })

    }
    //let paginatedResult = this.paginatedResult;
    return this.http.get(  this.baseUrl + '/GetAllEmployeeDashboardFilter', {params})
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

}
