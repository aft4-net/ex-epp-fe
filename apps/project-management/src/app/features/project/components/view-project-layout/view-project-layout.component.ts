import { Component,  OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import {PaginatedResult, Project, ProjectService } from '../../../../core';


@Component({
  selector: 'exec-epp-view-project-layout',
  templateUrl: './view-project-layout.component.html',
  styleUrls: ['./view-project-layout.component.scss']
})
export class ViewProjectLayoutComponent implements OnInit {

  
paginatedprojects$!:Observable< PaginatedResult<Project[]>>;
  projects:Project[]=[] 
  searchProject=new FormControl();
  total = 10;
  loading = true;
  pageSize = 10;
  pageIndex = 1;
  idParam='';
  totalPage!:number;
  searchKey='';
  Projects!:Project[];


  PageIndexChange(index: any): void {

    this.loading =true;
  console.log(index);
     
this.projectService.getWithPagnationResut(index, 10)
   .subscribe((response:PaginatedResult<Project[]>)=>{
 
    this.projects=response.data;
    this.pageIndex=response.pagination.pageIndex;
    this.pageSize=response.pagination.pageSize;

    this.loading =false;
   });


  }
 
  constructor(private  projectService:ProjectService,private notification: NzNotificationService) {}

  ngOnInit(): void {

    this.projectService.getWithPagnationResut(1,10).subscribe((response:PaginatedResult<Project[]>)=>{   
      this.projects=response.data;
      this.pageIndex=response.pagination.pageIndex;
      this.pageSize=response.pagination.pageSize;
      this.total=response.pagination.totalRecord
      this.totalPage=response.pagination.totalPage;
      this.loading =false;
      this.projectService.setFristPageOfProjects(response);
       console.log(response)
     });

 

   this.searchProject.valueChanges.pipe(
     debounceTime(3000)
   ).subscribe(()=>{
      if(this.searchProject.value?.length>1)
          {
          
      this.projectService.getWithPagnationResut(1,10,this.searchProject.value).subscribe((response:PaginatedResult<Project[]>)=>{  
        
        if(response?.data.length>0)
        {
          this.projects=response.data;
          this.pageIndex=response.pagination.pageIndex;
          this.pageSize=response.pagination.pageSize;
          this.total=response.pagination.totalRecord
          this.totalPage=response.pagination.totalPage;
         }
         else{
       

          this.projects= this.projectService.getFirsttPageValue().data;
          this.pageIndex= this.projectService.getFirsttPageValue().pagination.pageIndex;
          this.pageSize= this.projectService.getFirsttPageValue().pagination.pageSize;
          this.total= this.projectService.getFirsttPageValue().pagination.totalRecord
          this.totalPage= this.projectService.getFirsttPageValue().pagination.totalPage;


          this.notification
          .blank(
            'Project not found',
            ''
          )
       
         }

  
       })
       
           
             


          }
   })

   


  }

}



