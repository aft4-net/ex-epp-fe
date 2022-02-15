import { Component, OnDestroy, OnInit } from '@angular/core';
import { AssignResource, ProjectResourceStateService } from 'apps/projectmanagement/src/app/core';
import { PermissionListService } from 'libs/common-services/permission.service';

@Component({
  selector: 'exec-epp-project-resource',
  templateUrl: './project-resource.component.html',
  styleUrls: ['./project-resource.component.scss']
})
export class ProjectResourceComponent implements OnInit , OnDestroy  {

  projectResources: AssignResource[] = [];
  
  constructor(
    private  projectResourceStateService:ProjectResourceStateService,
    private permissionList: PermissionListService,
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
