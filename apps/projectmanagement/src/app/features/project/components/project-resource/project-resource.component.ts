import { Component, OnDestroy, OnInit } from '@angular/core';
import { AssignResource, ProjectResourceStateService } from 'apps/projectmanagement/src/app/core';


@Component({
  selector: 'exec-epp-project-resource',
  templateUrl: './project-resource.component.html',
  styleUrls: ['./project-resource.component.scss']
})
export class ProjectResourceComponent implements OnInit , OnDestroy  {

  projectResources: AssignResource[] = [];
  
  constructor(
    private  projectResourceStateService:ProjectResourceStateService
  
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.projectResourceStateService.restUpdateProjectState();
  }


  navaigateToProject()
  {

  }



}
