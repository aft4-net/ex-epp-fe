import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/user-management/src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pagination } from '../Models/Pagination';
import { PaginationResult } from '../Models/PaginationResult';
import { IUserList } from '../Models/User/UserList';
import { UserParams } from '../Models/User/UserParams';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  public userListSource = new BehaviorSubject<IUserList[]>(
    {} as IUserList[]
  );
  userList$: Observable<IUserList[]> =  this.userListSource.asObservable();

  paginatedResult: PaginationResult<IUserList[]> = {
    Data: [] as IUserList[],
    pagination: {} as Pagination,
  };

  SearchEmployeeData(
    userParams: UserParams
  ): Observable<PaginationResult<IUserList[]>> {
    return this.http
      .get<PaginationResult<IUserList[]>>(
        this.baseUrl + '/GetAllUsersDashboard',
        {
          params: {
            userName: userParams.userName,
            pageIndex: userParams.pageIndex,
            pageSize: userParams.pageSize,
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
}
