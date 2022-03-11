
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from '../../Models/Employee';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseDTO, ResponseDto } from '../../Models/response-dto.model';
import { map } from 'rxjs/operators';
import { EmployeeOrganization } from '../../Models/EmployeeOrganization/EmployeeOrganization';
import { IEmployeeViewModel } from '../../Models/Employee/EmployeeViewModel';
import { EmployeeParams } from '../../Models/Employee/EmployeeParams';
import { PaginationResult } from '../../Models/PaginationResult';
import { Pagination } from '../../Models/Pagination';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  public isdefault = true;
  public empNum="ec0001";
  public ephoto:any;
  public EmrContact:any | undefined;
  public isEdited = false;

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
    console.log(employee);
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
    employee.FamilyDetails?.forEach(element => {
      if(element.Guid == null) element.Guid = '00000000-0000-0000-0000-000000000000' 
     });
     employee.EmergencyContact?.forEach(element =>{
       if(element.Guid == null) element.Guid = '00000000-0000-0000-0000-000000000000' 
     });
     employee.EmployeeAddress?.forEach(element =>{
      if(element.Guid == null) element.Guid = '00000000-0000-0000-0000-000000000000' 
     });
    return this.http.post(this.baseUrl, employee);
  }

  update(employee: Employee) {
  employee.FamilyDetails?.forEach(element => {
   if(element.Guid == null) element.Guid = '00000000-0000-0000-0000-000000000000' 
  });
  employee.EmergencyContact?.forEach(element =>{
    if(element.Guid == null) element.Guid = '00000000-0000-0000-0000-000000000000' 
  });
  employee.EmployeeAddress?.forEach(element =>{
   if(element.Guid == null) element.Guid = '00000000-0000-0000-0000-000000000000' 
  });
    console.log("gaga");
    console.log(employee);
    return this.http.put(this.baseUrl, employee);
  }

  sendempphoto(){
    const formData = new FormData();
    formData.append('data', this.ephoto as any); // tslint:disable-next-line:no-any
    console.log("i was here " + this.ephoto);
    formData.append('id', this.empNum);
  //  const req = new HttpRequest('POST', 'http://localhost:14696/api/v1/EmployeePhoto', formData);
    // Always return a `Subscription` object, nz-upload will automatically unsubscribe at the appropriate time
   return this.http.post(environment.apiUrl+'/EmployeePhoto',formData).subscribe((event: any) => {
     console.log("on it");
    // item.status= 'done';
    // item.onSuccess(item.file);
    // console.log(event.Data);
   //  this.getUserImg(this._employeeService.empNum);
    },(err) => { /* error */
      console.log(err);
    },
    ()=>{
     // item.status= 'done';
     // this._router.navigate(['resourcemanagement']);
      console.log("completed");
    });
  }

  checkIdNumber(idNumber: string): Observable<boolean> {
    const params = new HttpParams().set('idNumber', idNumber);
    const result = this.http.get(
      this.baseUrl + "/checkidnumber?" + params.toString()
    )
    .pipe(
      map((response: any) => {
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
            pageSize: "100000",
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

  DeleteEmployee(employeeId:string) {debugger;
    return this.http.delete<unknown>(this.baseUrl +'/DeleteEmployee?employeeId=' + employeeId);
  }

  getFilterData(){
    const jobtitle: { text: string; value: string }[] = [] as {
      text: string;
      value: string;
    }[];
    const locations: { text: string; value: string }[] = [] as {
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
          if(jobtitle.findIndex(x=>x.text.trim() === response.Data.jobtype[i].Name.trim()) === -1 ){
            jobtitle.push({
            text: response.Data.jobtype[i].Name,
            value: response.Data.jobtype[i].Name,
          });
        }
        }
        for (let i = 0; i < response.Data.location.length; i++){
          if(locations.findIndex(x=>x.text.trim() === response.Data.location[i].Name.trim()) === -1 ){
            locations.push({
            text: response.Data.location[i].Name,
            value: response.Data.location[i].Name,
          });
        }
        }
        for (let i = 0; i < response.Data.Status.length; i++){
          if(statusFilter.findIndex(x=>x.text.trim() === response.Data.Status[i].Name.trim()) === -1 ){
          statusFilter.push({
            text: response.Data.Status[i].Name,
            value: response.Data.Status[i].Name,
          });
        }
        }

      }
      return {
        jobtitleFilter :jobtitle,
        StatusFilter :statusFilter,
        locationFilter:locations
      }
    }))
  }

  getWithPagnationResut( pageindex:number,pageSize:number,sortField:string,sortOrder:string,
                         id?: string,
                         clientlist?:string[] ,
                         superVisorlist?:string[],
                         statuslist?:string[],searchKey?:string) :Observable<PaginationResult<IEmployeeViewModel[]>>
  {let params = new HttpParams()
    .set('pageindex', pageindex.toString())
    .set('pageSize', pageSize.toString())
    .set('SortField',sortField)
    .set('sortOrder',sortOrder);
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
    return this.http.get<PaginationResult<IEmployeeViewModel[]>>(  this.baseUrl + '/GetAllEmployeeDashboardFilter', {params})
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


  deleteEmergencyContact(id: string): any {
    return this.http.delete<any>(environment.apiUrl + "/EmergencyContacts/?email="+ id).subscribe();
  }
  deleteFamilyMember(id: string): any {
    return this.http.delete<any>(environment.apiUrl + "/FamilyDetail/?id="+ id).subscribe();
  }
  deletePersonalAddress(id: string): any {

    return this.http.delete<any>(environment.apiUrl + "/PersonalAddress/?id="+ id).subscribe();
  }

}


