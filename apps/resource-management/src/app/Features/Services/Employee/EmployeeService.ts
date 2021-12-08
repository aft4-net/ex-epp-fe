
import { BehaviorSubject, Observable } from "rxjs";
import { Employee } from "../../Models/Employee";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ResponseDTO, ResponseDto } from "../../Models/response-dto.model";
import {map} from "rxjs/operators"
import { EmployeeOrganization } from "../../Models/EmployeeOrganization/EmployeeOrganization";
import { IEmployeeViewModel } from "../../Models/Employee/EmployeeViewModel";
import { EmployeeParams } from "../../Models/Employee/EmployeeParams";
import { PaginationResult } from "../../Models/PaginationResult";
import { Result } from "postcss";
import { Pagination } from "../../Models/Pagination";


@Injectable({
  providedIn: 'root',
})
export class EmployeeService {


  baseUrl = 'http://localhost:14696/api/v1/Employee';
  constructor(private http: HttpClient) { }

  private employeeSource = new BehaviorSubject<Employee>({} as Employee);
   employee$ = this.employeeSource.asObservable();

   public employeeListSource = new BehaviorSubject<IEmployeeViewModel[]>({} as IEmployeeViewModel[]);
   employeeList$  : Observable<IEmployeeViewModel[]> = this.employeeListSource.asObservable();

   public paginatedEmployeeListSource = new BehaviorSubject<PaginationResult<IEmployeeViewModel[]>>({} as PaginationResult<IEmployeeViewModel[]>);
   paginatedEmployeeList$  : Observable<PaginationResult<IEmployeeViewModel[]>> = this.paginatedEmployeeListSource.asObservable();

   employee!:Employee;

  addEmployee(employee: Employee) {
    this.setEmployee(employee);
  }
  setEmployee(employee:Employee){
    return this.http.post(this.baseUrl,employee)
     .subscribe((response:ResponseDto<Employee> | any) => {
       this.employeeSource.next(response.data),
       console.log(response.message);
     },error => {
       console.log(error);
     });
    }
  setEmployeeData(employee: Partial<Employee>) {

    this.employeeSource.next({

      ...this.employeeSource.getValue(),

      ...employee

    });
  }
    getPersonalAddresses(){
      const addresses = this.employeeSource.getValue().EmployeeAddress
      if(addresses !== null && addresses !== undefined){
        return addresses
      } else {
        return []
      }
    }
    getPersonalInfo(){
     const PersonInfo = this.employeeSource.getValue()
      //if(PersonInfo !== null && PersonInfo !== undefined){
        return PersonInfo;
      //}

    }

    getEmployeeListInfo(){
      const employeeList = this.employeeListSource.getValue()
      return employeeList;
     }

    saveEmployee(){
       this.employee$.subscribe(x=>{
         this.employee = x;
       });
      console.log("From The new Save Method "+ this.employee.Organization?.JobTitle);
      return this.http.post(this.baseUrl,this.employee)
     .subscribe((response:ResponseDto<Employee> | any) => {
       this.employeeSource.next(response.data),
       console.log(response.message);
     },error => {
       console.log(error);
     });
    }

    updateEmployee(){
      this.employee$.subscribe(x=>{
        this.employee = x;
      });
     console.log("From The new Save Method "+ this.employee);
     return this.http.put(this.baseUrl,this.employee)
    .subscribe((response:ResponseDto<Employee> | any) => {
      this.employeeSource.next(response.data),
      console.log(response.message);
    },error => {
      console.log(error);
    });
   }


    getEmployeeOrganization() : EmployeeOrganization {
      const organization = this.employeeSource.getValue().EmployeeOrganization;
      if(organization !== null && organization !== undefined){
        return organization
      } else {
        return <EmployeeOrganization>{};
      }
    }
    // eslint-disable-next-line @typescript-eslint/member-ordering
    paginatedResult: PaginationResult<IEmployeeViewModel[]> = {
      Data: [] as  IEmployeeViewModel[],
      pagination: {} as Pagination
   };

    SearchEmployeeData(employeeParams: EmployeeParams) : Observable<PaginationResult<IEmployeeViewModel[]>>
    {
      return this.http.get<PaginationResult<IEmployeeViewModel[]>>(this.baseUrl + '/GetAllEmployeeDashboard' ,
      {
        params: {
          searhKey:employeeParams.searchKey,
          pageIndex : employeeParams.pageIndex,
          pageSize : employeeParams.pageSize
        }
      }).pipe(
          map((result : any) => {
            this.paginatedResult = {
              Data:result.Data,
              pagination:{
                PageIndex:result.PageIndex,
                TotalRows:result.TotalPage,
                PageSize:result.PageSize,
                TotalRecord:result.TotalRecord
              }
           };
           return this.paginatedResult;
          })
       )
    }

    getEmployeeData(employeeId:string) : Observable<Employee>{

      return this.http.get<ResponseDTO<Employee>>(this.baseUrl + '/GetEmployeeWithID' , {params:{
        empId: employeeId
      }}
     ).pipe(
        map(result =>  result.Data)
      )
    }


}

