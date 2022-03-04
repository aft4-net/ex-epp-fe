import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginatedResult, Pagination } from '.';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export abstract class ApiService<T> {
  private readonly APIUrl = environment.baseApiUrl + this.getResourceUrl();

  constructor(protected httpClient: HttpClient) {}

  abstract getResourceUrl(): string;

  getAll(): Observable<Array<T>> {
    return this.httpClient.get<T[]>(this.APIUrl);
  }
  getSearch(optional: any) {
    return this.httpClient.get<T[]>(this.APIUrl + '/search/' + optional);
  }

  getList(params: any): Observable<any[]> {
    return this.httpClient.get<any[]>(this.APIUrl + '?' + params.toString());
  }

  get(id: string | number): Observable<[T]> {
    return this.httpClient.get<[T]>(this.APIUrl + '/' + id);
  }

  getById(id: string): Observable<T> {
    return this.httpClient.get<T>(this.APIUrl + '/' + id);
  }

  post(resource: any) {
    return this.httpClient.post(this.APIUrl, resource);
  }

  delete(id: string | number) {
    return this.httpClient.delete(this.APIUrl + '/' + id);
  }

  update(resource: T) {
    return this.httpClient.put(this.APIUrl, resource);
  }

  getWithPagnationResut(
    pageindex: number = 1,
    pageSize: number = 10,
    id?: string,
    clientlist?: string[],
    superVisorlist?: string[],
    statuslist?: string[],
    searchKey?: string,
    SortColumn?: string | null,
    sortdirection?: string | null
  ) {
    let params = new HttpParams()
      .set('pageindex', pageindex.toString())
      .set('pageSize', pageSize.toString());
    if (searchKey !== '') {
      params = params.append('searchkey', searchKey ? searchKey : '');
    }
    if (id !== '') {
      params = params.append('id', id ? id : '');
    }
    if (clientlist !== null) {
      clientlist?.forEach((client) => {
        params = params.append('client', client);
      });
    }
    if (superVisorlist !== null) {
      superVisorlist?.forEach((supervisorId) => {
        params = params.append('supervisorId', supervisorId);
      });
    }
    if (statuslist !== null) {
      statuslist?.forEach((status) => {
        params = params.append('status', status);
      });
    }
    if (SortColumn != null) {
      params = params.append('SortField', SortColumn);
    }
    if (sortdirection != null) {
      params = params.append('sortOrder', sortdirection);
    }

    const projectStatusFliter: { text: string; value: string }[] = [] as {
      text: string;
      value: string;
    }[];
    const clientNameFliter: { text: string; value: string }[] = [] as {
      text: string;
      value: string;
    }[];
    const supervisorNameFilter: { text: string; value: string }[] = [] as {
      text: string;
      value: string;
    }[];

    let paginatedResult: any = {
      data: [] as T[],
      pagination: {} as Pagination,
      filter: {
        clientNameFliter: [] as {
          text: string;
          value: string;
        }[],
        projectStatusFliter: [] as {
          text: string;
          value: string;
        }[],
        supervisorFilter: [] as {
          text: string;
          value: string;
        }[],
      },
    };
    return this.get('?' + params.toString()).pipe(
      map((response: any) => {
        if (Object.keys(response.Data.Filters).length != 0) {
          for (let i = 0; i < response.Data.Filters.Clients.length; i++)
            clientNameFliter.push({
              text: response.Data.Filters.Clients[i].ClientName,
              value: response.Data.Filters.Clients[i].Guid,
            });

          for (let i = 0; i < response.Data.Filters.Status.length; i++)
            projectStatusFliter.push({
              text: response.Data.Filters.Status[i].StatusName,
              value: response.Data.Filters.Status[i].Guid,
            });

          for (let i = 0; i < response.Data.Filters.Supervisor.length; i++)
            supervisorNameFilter.push({
              text: response.Data.Filters.Supervisor[i].Name,
              value: response.Data.Filters.Supervisor[i].Guid,
            });
        }

        paginatedResult = {
          data: response.Data.Pridcate.projects,
          pagination: {
            pageIndex: response.Data.Pridcate.PageIndex,
            totalPage: response.Data.Pridcate.TotalPage,
            pageSize: response.Data.PridcatePageSize,
            totalRecord: response.Data.Pridcate.TotalRecord,
            filter: {
              clientNameFliter: clientNameFliter,
              projectStatusFliter: projectStatusFliter,
              supervisorFilter: supervisorNameFilter,
            },
          },
        };

        return paginatedResult;
      })
    );
  }
}
