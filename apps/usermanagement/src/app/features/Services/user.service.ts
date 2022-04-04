import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pagination } from '../Models/Pagination';
import { PaginationResult } from '../Models/PaginationResult';
import { IUserModel } from '../Models/User/UserList';
import { UserParams } from '../Models/User/UserParams';
import { IGroupUsersView } from '../Models/User/GroupUsersView';
import { ResponseDTO } from '../Models/ResponseDTO';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.apiUrl + '/user';
  constructor(private http: HttpClient) { }

  public userListSource = new BehaviorSubject<IUserModel[]>(
    {} as IUserModel[]
  );
  userList$: Observable<IUserModel[]> =  this.userListSource.asObservable();

  paginatedResult: PaginationResult<IUserModel[]> = {
    Data: [] as IUserModel[],
    pagination: {} as Pagination,
  };

  SearchUsers(
    userParams: UserParams
  ): Observable<PaginationResult<IUserModel[]>> {
    let params = new HttpParams(); 
    if(userParams.searchKey)
    {
      params = params.append("searchKey", userParams.searchKey.toString());
    }
    params = params.append("pageIndex", userParams.pageIndex.toString());
    params = params.append("pageSize", userParams.pageSize.toString());
    if(userParams.sortBy) {
      params = params.append('sortBy', `${userParams.sortBy}`);
    }
    
    if(userParams.sortOrder) {
      params =params.append('sortOrder',`${userParams.sortOrder}`);
    }
    userParams.departmentFilter?.forEach(filter => {
      params = params.append("departmentFilter", filter);
    });
    userParams.jobTitleFilter?.forEach(filter => {
      params = params.append("jobTitleFilter", filter);
    });
    userParams.statusFilter?.forEach(filter => {
      params = params.append("statusFilter", filter);
    });
    return this.http
      .get<PaginationResult<IUserModel[]>>(this.baseUrl + '/GetUsersForDashboard',{ params }).pipe(
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

  GetDistinctDepartments() : Observable<ResponseDTO<any>> {
    return this.http.get<ResponseDTO<any>>(this.baseUrl + "/GetDistinctDepartments");
  }

  GetDistinctJobTitles() : Observable<ResponseDTO<any>> {
    return this.http.get<ResponseDTO<any>>(this.baseUrl + "/GetDistinctJobTitles");
  }
  
  LoadUsersNotAssignedToGroup(groupId: string) : Observable<ResponseDTO<IGroupUsersView>>{
    return this.http.get<PaginationResult<IGroupUsersView>>(this.baseUrl + '/LoadUsersNotAssginedToGroup?groupId=' + groupId).pipe(
      map((result: any) => {
        return result;
      })
    );
  }

  RemoveUser(userGuid : string) : Observable<ResponseDTO<any>> {
    return this.http.delete<ResponseDTO<any>>(this.baseUrl + '?userGuid=' + userGuid).pipe(
      map((result: any) => {
        return result;
      })
    );
  }
  isSuperAdmin(id:string) : Observable<any>{
    return this.http.get<any>(this.baseUrl+"/IsSuperAdmin/?id="+id);
  }
}
