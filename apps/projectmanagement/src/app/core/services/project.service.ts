import { ApiService } from '../models/apiService';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginatedResult, Project, ProjectCreate, ProjectEdit } from '../models';

import { environment } from '../../../environments/environment';
import { AddProjectStateService } from '../state';


@Injectable({
  providedIn: 'root'
})
export class ProjectService extends ApiService<Project> {

  
private fristPagantionProjectsSource=  new BehaviorSubject<PaginatedResult<Project[]>>(  {} as PaginatedResult<Project[]>);
fristPagantionProjects$=this.fristPagantionProjectsSource.asObservable();


  constructor(private addProjectState:AddProjectStateService , protected httpClient: HttpClient,private  notification: NzNotificationService,private router:Router ) { 
    super(httpClient);
  }


  updateProject(resource:any)
  {
  this.httpClient.put(environment.baseApiUrl+"Project",resource).subscribe
    (suceess=>this.notification.success('Project updated successfully','')  
      ,error=>   this.notification.error('Project updated not saved','Please try again letter'));
  }

getFirsttPageValue()
{   
  return this.fristPagantionProjectsSource.getValue();
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


     this.post(this.addProjectState.projectData).subscribe
         ((response:any)=>{
           this.notification.success('Project Added successfully','');  
         

        }               
           ,(errr:any)=>{
          
              this.notification.error('Project Not saved','Please try again letter');
            }
           )
  }

  getProjects()
  {
  return  this.httpClient.get(environment.baseApiUrl+"Project/all").pipe(map((response:any)=>{
     
        return response.Data;
        
    }))
  }
  

}
