import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AssignResource, Client, Employee, Project, ProjectStatus, StateService } from '../models';
import { AssignResourceService } from '../services';


const iniitalAddProjectState: Project={
  ProjectName:"",
  ProjectType: "",
  StartDate:"",
  EndDate:"",
  Supervisor:{} as Employee,
  Client:{} as Client,
  ProjectStatus:{} as ProjectStatus,
  SupervisorGuid:"",
  ClientGuid:"",
  ProjectStatusGuid:"",
  Guid:"",
  IsActive:false,
  IsDeleted:false,
  CreatedDate:"",
  CreatedbyUserGuid:""  
  }


@Injectable({
  providedIn: 'root'
})
export class EditProjectStateService     {
   

private isOnEditstateSource=  new BehaviorSubject<boolean>(false);
private projectResourceList=  new BehaviorSubject<AssignResource[]>({} as AssignResource[]);
private projectSource= new BehaviorSubject<Project>({} as Project);
projectResourceList$=this.projectResourceList.asObservable();
  constructor(private router:Router, private assignResoursceService:AssignResourceService)
  {
   
  }

  get isOnEditstate()
  {
  return this.isOnEditstateSource.getValue();
  }
  getprojectReourceList()
  {
    return this.projectResourceList.value;
  }
  updateProjectList(resourseList:AssignResource[])
  {
     this.projectResourceList.next(resourseList);
  }
 
  editProjectState(data:Project)
  {
    this.isOnEditstateSource.next(true);
    this.projectSource.next(data);
    this. assignResoursceService.getResourceOfProject(data.Guid).subscribe((d:AssignResource[])=>this.updateProjectList(d));
    this.router.navigateByUrl('projectmanagement/edit-project');
  }

  updateAssignResources()
  {
    this. assignResoursceService.getResourceOfProject( this.projectEditData.Guid).subscribe((d:AssignResource[])=>this.updateProjectList(d));
  }
  
  restUpdateProjectState()
  {
    this.projectSource.next({} as Project);
    this. projectResourceList.next({} as AssignResource[]);
    this.isOnEditstateSource.next(false);
  }
 
  get projectEditData(): Project {
    return this.projectSource.value;
  }


}
