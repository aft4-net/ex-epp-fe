import { BehaviorSubject, Observable} from 'rxjs';
import { PaginatedResult, Project } from '../models';
import { ApiService } from '../models/apiService';
import { HttpClient } from '@angular/common/http';
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
    return this.httpClient.get(environment.baseApiUrl+"Project/FilterData").pipe(map((response:any)=>{
      if(Object.keys(response.Data).length!= 0)
      {
        for (let i = 0; i < response.Data.Clients.length; i++){
          clientNameFliter.push({
            text: response.Data.Clients[i].Name,
            value: response.Data.Clients[i].Name,
          });
        }
        for (let i = 0; i < response.Data.Supervisor.length; i++){
          SupervisorFilter.push({
            text: response.Data.Supervisor[i].Name,
            value: response.Data.Supervisor[i].Id,
          });
        }
        for (let i = 0; i < response.Data.Status.length; i++){
          statusFilter.push({
            text: response.Data.Status[i].Name,
            value: response.Data.Status[i].Name,
          });
        }

      }
      return {
        ClientFilter :clientNameFliter,
        StatusFilter :statusFilter,
        supervisorFilter:SupervisorFilter
      }
    }))
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


}
