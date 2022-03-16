import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AssignResource,  Project, } from '../models';


@Injectable({
  providedIn: 'root'
})
export class EditProjectStateService     {
   

private isOnEditstateSource=  new BehaviorSubject<boolean>(false);
private projectResourceList=  new BehaviorSubject<AssignResource[]>({} as AssignResource[]);
private projectSource= new BehaviorSubject<Project>({} as Project);
projectResourceList$=this.projectResourceList.asObservable();
  constructor(private router:Router)
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
    this.router.navigateByUrl('projectmanagement/edit-project');
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
