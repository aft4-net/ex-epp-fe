import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AssignResource, Client, Employee, Project, ProjectStatus, StateService } from '../models';
import { AssignResourceService } from '../services';


const iniitalAddProjectState: Project={
  ProjectName:"",
  ProjectType: "",
  StartDate:{} as Date,
  EndDate:{} as Date,
  Supervisor:{} as Employee,
  Client:{} as Client,
  ProjectStatus:{} as ProjectStatus,
  SupervisorGuid:"",
  ClientGuid:"",
  ProjectStatusGuid:"",
  Guid:"",
  IsActive:false,
  IsDeleted:false,
  CreatedDate:{} as Date,
  CreatedbyUserGuid:""  
  }


@Injectable({
  providedIn: 'root'
})
export class EditProjectStateService  extends StateService<Project>    {
   
isOnEditstate=false;
private projectResourceList=  new BehaviorSubject<AssignResource[]>({} as AssignResource[]);
projectResourceList$=this.projectResourceList.asObservable();
  constructor(private router:Router, private assignResoursceService:AssignResourceService)
  {
    super(iniitalAddProjectState)
  }

  getprojectReourceList()
  {
    return this.projectResourceList.value;
  }
  updateProjectList(resourseList:AssignResource[])
  {
    console.log(resourseList);
     this.projectResourceList.next(resourseList);
  }
 
  editProjectState(data:Project)
  {
    this.isOnEditstate=true;
    this.setState(data);
    this. assignResoursceService.getResourceOfProject(data.Guid).subscribe((d:AssignResource[])=>this.updateProjectList(d));
    this.router.navigateByUrl('projectmanagement/edit-project');
  }
  
  restUpdateProjectState()
  {
    this.setState(iniitalAddProjectState);
    this. projectResourceList.next({} as AssignResource[]);
    this.isOnEditstate=false;
  }
 
  get projectEditData(): Project {
    return this.state;
  }


}
