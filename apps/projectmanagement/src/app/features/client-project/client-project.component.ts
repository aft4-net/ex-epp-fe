import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaginatedResult, Project, ProjectService } from '../../core';
import { ActiveTabService } from './servicee/active-tab.service';
import {PermissionService} from './../../../../../../libs/common-services//permission.service';
@Component({
  selector: 'exec-epp-client-project',
  templateUrl: './client-project.component.html',
  styleUrls: ['./client-project.component.scss']
})
export class ClientProjectComponent implements OnInit  {

  activeTabIndex=0;
  constructor(  private  permissionService:PermissionService,private router:Router,private projectService:ProjectService,private activeTabService:ActiveTabService) {

   }
   clientSelected=true;




 
     ngOnInit(): void {
      this.projectService.getWithPagnationResut(1,10).subscribe((response:PaginatedResult<Project[]>)=>{   
   
        this.projectService.setFristPageOfProjects(response);
       });

      this.activeTabService.isClientTabActiv$.subscribe(res=>{
         this.activeTabIndex=res;
      })
     }
   


  clientTab()
  {
    this.clientSelected=false;
 
  }

  projectTab()
{
  this.clientSelected=false;

}

addProjectPage()
{
  this.router.navigateByUrl('client-project/add-project');
 
}

checkPermmision(key:string)
{
 return  this.permissionService.authorizedPerson(key);
}
}
