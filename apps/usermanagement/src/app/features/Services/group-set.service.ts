import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ErrHandleService } from '../../shared/services/error-handle.service';
import { GroupParams } from '../Models/User/GroupParams';
import { GroupSetModel } from '../Models/group-set.model';
import { Injectable } from '@angular/core';
import { Pagination } from '../Models/Pagination';
import { PaginationResult } from '../Models/PaginationResult';
import { ResponseDTO } from '../../models/ResponseDTO';
import { environment } from "../../../environments/environment";
import {environment as libEnvironment} from 'libs/environments/environment'
import { IGroupUsersView } from '../Models/User/GroupUsersView';
import { GroupSetDescription } from '../Models/Group/GroupSetDescription';
import { GroupUsers } from '../Models/Group/GroupUsres';

@Injectable({
    providedIn: 'root',
  })
  export class GroupSetService {

    baseUrl = environment.apiUrl + '/GroupSet';
    
    paginatedResult: PaginationResult<GroupSetModel[]> = {
      Data: [] as GroupSetModel[],
      pagination: {} as Pagination,
    };

    groupUsersPaginatedResult: PaginationResult<IGroupUsersView[]> = {
      Data: [] as IGroupUsersView[],
      pagination: {} as Pagination,
    };
    
    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    path = `${environment.apiUrl}/GroupSet`;

    constructor(private http: HttpClient, private errHandler: ErrHandleService) {}

    private groupSource = new BehaviorSubject<GroupSetModel>({} as GroupSetModel);
    group$ = this.groupSource.asObservable();

    createGroup(groupSet: GroupSetModel): Observable<ResponseDTO<any>> {
      return this.http.post<ResponseDTO<any>>(this.path, groupSet, this.httpOptions).pipe(
        catchError(this.errHandler.formatErrors)
      );
    }
      
    SearchUsers(groupParams: GroupParams): Observable<PaginationResult<GroupSetModel[]>> {
      let params = new HttpParams(); 
      if(groupParams.searchKey)
      {
        params = params.append("searchKey", /*groupParams.searchKey.toString()*/"Data");
      }
      params = params.append("pageIndex", groupParams.pageIndex);
      params = params.append("pageSize", groupParams.pageSize);
      return this.http
        .get<PaginationResult<GroupSetModel[]>>(`${libEnvironment.apiUrl}/GroupSet`,{
            params: {
              searhKey: groupParams.searchKey,
              pageIndex: groupParams.pageIndex,
              pageSize: groupParams.pageSize,
            },
          

        }).pipe(
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

    LoadGroupDeatil(groupId : string) {
       return this.http.get<ResponseDTO<GroupSetModel>>(this.baseUrl + '/LoadGroupSet?id=' + groupId);
    }

    LoadGroupUsers(groupParams: GroupParams): Observable<PaginationResult<IGroupUsersView[]>> {
      let params = new HttpParams(); 
      if(groupParams.groupId)
      {
        params = params.append("groupId", groupParams.groupId.toString());
      }
      params = params.append("pageIndex", groupParams.pageIndex.toString());
      params = params.append("pageSize", groupParams.pageSize.toString());
      return this.http.get<PaginationResult<IGroupUsersView>>(environment.apiUrl + '/UserGroups/LoadGroupUsersSet',{ params }).pipe(
          map((result: any) => {
            this.groupUsersPaginatedResult = {
              Data: result.Data,
              pagination: {
                PageIndex: result.PageIndex,
                TotalRows: result.TotalPage,
                PageSize: result.PageSize,
                TotalRecord: result.TotalRecord
              }
            };
            return this.groupUsersPaginatedResult;
          })
        );
    }

    DeleteGroup(groupId : string): Observable<ResponseDTO<any>> {
      return this.http.delete<ResponseDTO<any>>(this.baseUrl + "?Id=" + groupId).pipe(
        map((result) => {
          return result;
        })
      )
    }

    EditGroupDescription(groupSet : GroupSetDescription) {
      return this.http.patch<ResponseDTO<any>>(this.baseUrl, groupSet);
    }

    AddUsersToGroup(groupUsers : GroupUsers) : Observable<ResponseDTO<any>>
    {
      return this.http.post<ResponseDTO<any>>(environment.apiUrl + '/UserGroups/RegisterUsersInGroup', groupUsers, this.httpOptions);
    }

    RemoveUserFromGroup(groupUserId : string): Observable<ResponseDTO<any>> {
      return this.http.delete<ResponseDTO<any>>(environment.apiUrl + '/UserGroups/RemoveUserFromGroup'+ "?userGroupGuid=" + groupUserId).pipe(
        map((result) => {
          return result;
        })
      )
    }
}