import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AssignResource, Project } from '../models';
import { AssignResourceService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class ProjectResourceStateService {
  private isOnEditstateSource=  new BehaviorSubject<boolean>(false);
  private disallowResourceSource=new BehaviorSubject<boolean>(true);
  private projectResourceList=  new BehaviorSubject<AssignResource[]>([] as AssignResource[]);
  private projectSource= new BehaviorSubject<Project>({} as Project);
  projectResourceList$=this.projectResourceList.asObservable();
  isOnEditstate$=this.isOnEditstateSource.asObservable();
  disallowResourceSource$=this.disallowResourceSource.asObservable();
  constructor(private router:Router,private  assignResoursceService:AssignResourceService) { }

  projectResources(data:Project)
  {
    this.isOnEditstateSource.next(true);
    this.projectSource.next(data);
    this. assignResoursceService.getResourceOfProject(data.Guid).subscribe((d:AssignResource[])=>this.updateProjecResourcetList(d));
    this.router.navigateByUrl('projectmanagement/project-resources');
  }

  updateProjecResourcetList(resourseList:AssignResource[])
  {
     this.projectResourceList.next(resourseList);
  }
  restUpdateProjectState()
  {
   this.projectResourceList.next([] as AssignResource[]);
   this.isOnEditstateSource.next(false);
  }

  get isOnEditstate()
  {
  return this.isOnEditstateSource.getValue();
  }
  get disallowResource()
  {
    return this.disallowResourceSource.getValue();
  }
  updateDisallowResource(value:boolean)
  {
   this.disallowResourceSource.next(value);
  }

  get project(): Project {
    return this.projectSource.value;
  }

  updateAssignResources()
  {
    this. assignResoursceService.getResourceOfProject( this.project.Guid).subscribe((d:AssignResource[])=>this.updateProjecResourcetList(d));
  }

  get resourcesOfProject()
  {
      return this.projectResourceList.getValue()
  }

}
