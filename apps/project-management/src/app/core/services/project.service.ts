import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import {  tap } from 'rxjs/operators';
import { Project, ProjectCreate } from '../models';
import { ApiService } from '../models/apiService';

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends ApiService<Project> {
  constructor(protected httpClient: HttpClient,private  notification: NzNotificationService ) { 
    super(httpClient);
  }

  getResourceUrl(): string {

    return 'Project';
  }



  createProject(data:ProjectCreate)
   {
     this.post(data).subscribe
         (()=>{this.notification.success('Project added successfully','');  
          }               
           ,(error:any)=>{
    
              this.notification.error('Project Not Saved','Please Try again letter');
            }
           )
  }
}
