import { Component,  OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
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
  total = 70;
  loading = true;
  pageSize = 10;
  pageIndex = 1;
  idParam='';
  totalPage!:number;
  searchKey='';
  Projects!:Project[];


  onQueryParamsChange(params: NzTableQueryParams): void {

    const { pageSize, pageIndex, sort } = params;
   // const currentSort = sort.find(item => item.value !== null);
    //const sortField = (currentSort && currentSort.key) || null;
    //const sortOrder = (currentSort && currentSort.value) || null;
   // this.loadDataFromServer(pageIndex, pageSize, sortField, sortOrder);

   this.projectService.getWithPagnationResut(pageIndex, pageSize,).subscribe((response:PaginatedResult<Project[]>)=>{
  console.log("hello");
    this.projects=response.data;
    this.pageIndex=response.pagination.PageIndex;
    this.pageSize=response.pagination.PageSize;
   // this.total=response.pagination.TotalRecord;
    //this.totalPage=response.pagination.TotalPage;
    this.loading =false;
   });


  }
 
  constructor(private  projectService:ProjectService,private notification: NzNotificationService) {}

  ngOnInit(): void {

   this.projectService.getWithPagnationResut(1,10).pipe(map((response:PaginatedResult<Project[]>)=>{   
   
    this.projects=response.data;
    this.pageIndex=response.pagination.PageIndex;
    this.pageSize=response.pagination.PageSize;
    this.total=response.pagination.TotalRecord
    this.totalPage=response.pagination.TotalPage;
    this.loading =false;
   }));

   this.searchProject.valueChanges.pipe(
     debounceTime(3000)
   ).subscribe(()=>{
      if(this.searchProject.value?.length>2)
          {
          
      this.projectService.getWithPagnationResut(1,10,this.searchProject.value).pipe(map((response:PaginatedResult<Project[]>)=>{  
        
        if(response?.data.length>0)
        {
          this.projects=response.data;
          this.pageIndex=response.pagination.PageIndex;
          this.pageSize=response.pagination.PageSize;
          this.total=response.pagination.TotalRecord
          this.totalPage=response.pagination.TotalPage;
         }
         else{
          this.notification
          .blank(
            'Project not found',
            ''
          )
       
         }

  
       })
       )
           
             


          }
   })

   


  }

}



