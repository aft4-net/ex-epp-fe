import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PermissionService, ProjectService } from '../../core';


@Component({
  selector: 'exec-epp-client-project',
  templateUrl: './client-project.component.html',
  styleUrls: ['./client-project.component.scss']
})
export class ClientProjectComponent implements OnInit  {

  
  creatProjectPermission=false;
  constructor( private  permissionService:PermissionService,private router:Router,
    private projectService:ProjectService) {

   }

     ngOnInit(): void {
      this.permissionService.getUserPermission('Create_Project').subscribe(res=>
        this.creatProjectPermission=res);

     }





addProjectPage()
{
  this.router.navigateByUrl('projectmanagement/add-project');

}


}
