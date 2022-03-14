import { BehaviorSubject, Observable} from 'rxjs';
import { PaginatedResult, Pagination, Project } from '../models';
import { ApiService } from '../models/apiService';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AddProjectStateService } from '../state';


@Injectable({
  providedIn: 'root'
})
export class ProjectService extends ApiService<Project> {


  private fristPagantionProjectsSource=  new BehaviorSubject<PaginatedResult<Project[]>>(  {} as PaginatedResult<Project[]>);
  fristPagantionProjects$=this.fristPagantionProjectsSource.asObservable();


  constructor(private addProjectState:AddProjectStateService, protected httpClient: HttpClient) {
    super(httpClient);
  }


  updateProject(resource:any)
  {
  return  this.httpClient.put(environment.baseApiUrl+"Project",resource);
  }

  getFirsttPageValue()
  {
    return this.fristPagantionProjectsSource.value;
  }

  setFristPageOfProjects(data:PaginatedResult<Project[]>)
  {
    this.fristPagantionProjectsSource.next(data);

  }

  getResourceUrl(): string {
    return 'Project';
  }

  createProject()
   {
     return this.post(this.addProjectState.projectData);
  }

  getProjects()
  {
    return  this.httpClient.get(environment.baseApiUrl+"Project/all");
  }

  
  deleteProjectByState(id: string): Observable<{ success: boolean, message: string }> {
    return this.delete(id)
    .pipe(
      map((response: any) => {
        if(response.ResponseStatus === 'Success' || response.ResponseStatus === 1) {
          return { success: true, message: response.Message };
        } else {
          return { success: false, message: response.Message };
        }
      })
    );
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
      data: [] as Project[],
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
