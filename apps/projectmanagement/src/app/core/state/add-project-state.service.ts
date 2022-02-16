import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AssignResourceService } from '..';
import {Project, ProjectCreate, ProjectDetail, projectResourceType, StateService } from '../models';


const iniitalAddProjectState: ProjectCreate = {
  ProjectName: "",
  ProjectStatusGuid: "",
  ProjectType:"",
  SupervisorGuid:"",
  StartDate:"",
  EndDate:"",
  ClientGuid :"",
  Description:"",
  AssignResource: [] as  projectResourceType[]
 
};

@Injectable({
  providedIn: 'root'
})


export class AddProjectStateService extends StateService<ProjectCreate>  {


  constructor(private router:Router,private  assignResoursceService:AssignResourceService) {
    super(iniitalAddProjectState);
  }


  updateProjectDetails(projectDetail: ProjectDetail) {
    this.setState({
      ProjectName: projectDetail.ProjectName,
  ProjectStatusGuid:projectDetail.ProjectStatusGuid,
  ProjectType:projectDetail.ProjectType,
  SupervisorGuid:projectDetail.SupervisorGuid,
  StartDate:projectDetail.StartDate,
  EndDate:projectDetail.EndDate,
  ClientGuid :projectDetail.ClientGuid,
  Description:projectDetail.Description,
    });
  }

  updateAssignResource(projectResource:  projectResourceType[]) {
    this.setState({  AssignResource: projectResource });
  }

  restAddProjectDetails() {
    this.setState({
      ProjectName: "",
      ProjectStatusGuid: "",
      ProjectType:"",
      SupervisorGuid:"",
      StartDate:"",
      EndDate:"",
      ClientGuid :"",
      Description:"",
      AssignResource: [] as  projectResourceType[]
    });
 
  }

  get projectData(): ProjectCreate {
    return this.state;
  }

  isCreateProjectValid():Observable<boolean>
  {
    return this.state$.pipe(
      map((res: ProjectCreate) => {
        if (
          typeof res.ProjectName == 'undefined' ||
          res.ProjectName  == '' ||
          typeof res.ClientGuid == 'undefined' ||
          res.ClientGuid == ''||
          typeof res.ProjectType == 'undefined' ||
          res.ProjectType == '' ||
          typeof res.ProjectStatusGuid  == 'undefined' ||
          res.ProjectStatusGuid == '' ||
          typeof res.SupervisorGuid == 'undefined' ||
          res.SupervisorGuid == '' ||
          typeof res.StartDate == 'undefined' ||
          res.StartDate == null
        ) 
       return false;

        return true;
      }));
  }
 
}
