import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaginatedResult, Project, ProjectService } from '../../core';

@Component({
  selector: 'exec-epp-client-project',
  templateUrl: './client-project.component.html',
  styleUrls: ['./client-project.component.scss']
})
export class ClientProjectComponent implements OnInit  {

  constructor(private router:Router,private projectService:ProjectService) {

   }
   clientSelected=true;




 
     ngOnInit(): void {
      this.projectService.getWithPagnationResut(1,10).subscribe((response:PaginatedResult<Project[]>)=>{   
   
        this.projectService.setFristPageOfProjects(response);
       });
     }
   


  clientTab()
  {
    this.clientSelected=true;
  }

  projectTab()
{
  this.clientSelected=false;
}

addProjectPage()
{
  this.router.navigateByUrl('client-project/add-project');
 
}

}
