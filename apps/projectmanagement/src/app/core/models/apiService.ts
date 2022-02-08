import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginatedResult, Pagination } from '.';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export abstract class ApiService<T> {
  private readonly APIUrl = environment.baseApiUrl + this.getResourceUrl();

  constructor(protected httpClient: HttpClient ) {
  }

  abstract getResourceUrl(): string;

  getAll(): Observable<Array<T>>
  {

    return this.httpClient.get<T[]>(this.APIUrl);

  }
  getSearch(optional:any)
  {

    return this.httpClient.get<T[]>(this.APIUrl+'/search/'+optional);

  }

  getList(params:any): Observable<any[]> {
    return this.httpClient.get<any[]>(this.APIUrl+"?" +params.toString())

  }

  get(id: string | number): Observable<[T]> {
    return this.httpClient.get<[T]>(this.APIUrl+"/" +id);
  }

  getById(id: string ): Observable<T> {
    return this.httpClient.get<T>(this.APIUrl+"/" +id);
  }


  post(resource:any) {
    return this.httpClient.post(this.APIUrl , resource);
  }

  delete(id: string | number) {
    return this.httpClient.delete(this.APIUrl+"/" +id);
  }

  update(resource: T) {
    return this.httpClient.put(`/${this.APIUrl}`, resource)

  }

  getWithPagnationResut( pageindex:number,pageSize:number,id?: string,
                         clientlist?:string[] ,
                         superVisorlist?:string[],
                         statuslist?:string[],searchKey?:string) :Observable<PaginatedResult<T[]>>
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
        params = params.append('client', client);
      })

    }
    if(superVisorlist !== null){
      superVisorlist?.forEach((supervisorId) =>{
        params = params.append('supervisorId', supervisorId);
      })

    }
    if(statuslist!== null){
      statuslist?.forEach((status) =>{
        params = params.append('status', status);
      })

    }
    let paginatedResult: PaginatedResult<T[]> = {
      data: [] as  T[],
      pagination: {} as Pagination
    };
    return this.get("?" +params.toString())
      .pipe(

        map((response:any) => {


          paginatedResult= {
            data:response.Data,
            pagination:{pageIndex:response.PageIndex,
              totalPage:response.TotalPage,
              pageSize:response.PageSize,
              totalRecord:response.TotalRecord}
          };
          return paginatedResult;
        })
      );
  }




}
