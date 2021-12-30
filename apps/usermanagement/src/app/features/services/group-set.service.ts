import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ErrHandleService } from '../../shared/services/error-handle.service';
import { GroupParams } from '../Models/User/GroupParams';
import { GroupSetModel } from '../Models/group-set.model';
import { Injectable } from '@angular/core';
import { Pagination } from '../Models/Pagination';
import { PaginationResult } from '../Models/PaginationResult';
import { ResponseDTO } from '../../models/ResponseDTO';
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root',
  })
  export class GroupSetService {

    baseUrl = environment.apiUrl + '/user';
    
    paginatedResult: PaginationResult<GroupSetModel[]> = {
      Data: [] as GroupSetModel[],
      pagination: {} as Pagination,
    };
    
    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    path = `${environment.apiUrl}/GroupSet`;

    constructor(private http: HttpClient, private errHandler: ErrHandleService) {}

    createGroup(groupSet: GroupSetModel): Observable<ResponseDTO<any>> {
        return this.http.post<ResponseDTO<any>>(this.path, groupSet, this.httpOptions).pipe(
          catchError(this.errHandler.formatErrors)
        );
      }
      
      SearchUsers(
        groupParams: GroupParams
      ): Observable<PaginationResult<GroupSetModel[]>> {
        console.log("was in the service search ! "+  groupParams.searchKey.toString());
        let params = new HttpParams(); 
        if(groupParams.searchKey)
        {
          params = params.append("searchKey", /*groupParams.searchKey.toString()*/"Data");
        }
        params = params.append("pageIndex", groupParams.pageIndex);
        params = params.append("pageSize", groupParams.pageSize);
        console.log(params);
        return this.http
          .get<PaginationResult<GroupSetModel[]>>("http://localhost:14696/api/v1/GroupSet",{

            
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
    
}