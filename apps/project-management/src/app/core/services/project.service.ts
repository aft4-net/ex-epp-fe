import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BehaviorSubject, Observable } from 'rxjs';

import { PaginatedResult, Pagination, Project, ProjectCreate } from '../models';
import { ApiService } from '../models/apiService';

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends ApiService<Project> {
  constructor(protected httpClient: HttpClient,private  notification: NzNotificationService,private router:Router ) { 
    super(httpClient);
  }

   private projectsource= new   BehaviorSubject<Project[]>({} as Project[]);
  projects$=this.projectsource.asObservable();


  projects:Project[]=[{
  ProjectName:"qaz",
  projectType: "",
  startDate:new Date(),
  endDate:new Date(),
  Supervisor:   {
    Name: "Dawit Assefa",
    Role: "Developer",
    HiredDate: new Date(),
    Guid: "4fa85f64-5717-4562-b3fc-2c963f66afa6",
    IsActive: true,
    IsDeleted: false,
    CreatedDate: new Date(),
    CreatedbyUserGuid: "00000000-0000-0000-0000-000000000000"
  },
  Client:{
     ClientName:"Fedex",
    ClientStatus:"Active",
    ManagerAssigned:"",
    Description:"",
    Guid:"35850eb4-0974-4f14-8c80-0a078fd163f7",
    IsActive: true,  
    IsDeleted: false, 
    CreatedDate: " ",
    CreatedbyUserGuid: ""
    
  },
  projectStatus: {

    
      Guid:  "3fa85f64-5717-6762-b3fc-fe963f66afa6",
      IsActive: true,
      IsDeleted: true,
      CreatedDate: new Date(),
      CreatedbyUserGuid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      StatusName: "string",
      AllowResource: true
    

  },
  supervisorGuid:"",
  clientGuid:"35850eb4-0974-4f14-8c80-0a078fd163f7",
  projectStatusGuid: "3fa85f64-5717-6762-b3fc-fe963f66afa6",
  guid:"3fa85f64-5717-4562-defc-2c963f66afui",
  isActive:true,
  isDeleted:false,
  createdDate:new Date(),
  createdbyUserGuid:""
}]




  getResourceUrl(): string {

    return 'Projects';
  }



  createProject(data:ProjectCreate)
   {

     this.post(data).subscribe
         (()=>{this.notification.success('Project Added successfully','');  
     
        }               
           ,(error:any)=>{
     
              this.notification.error('Project Not saved','Please try again letter');
            }
           )
  }

  getProjects()
  {
     return this.projects;

  }
  

}
