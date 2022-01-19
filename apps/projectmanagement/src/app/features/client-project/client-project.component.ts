import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PermissionService, ProjectService } from '../../core';


@Component({
  selector: 'exec-epp-client-project',
  templateUrl: './client-project.component.html',
  styleUrls: ['./client-project.component.scss']
})
export class ClientProjectComponent implements OnInit  {

  activeTabIndex=0;
  creatProjectPermisson=false;
  constructor( private  permissionService:PermissionService,private router:Router,
    private projectService:ProjectService) {

   }
   clientSelected=true;
     ngOnInit(): void {
      this.permissionService.getUserPermission('Create_Project').subscribe(res=>
        this.creatProjectPermisson=res);

     }





addProjectPage()
{
  this.router.navigateByUrl('projectmanagement/client-project/add-project');

}


}
