import { Component,  OnInit } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { PaginatedResult, Project, ProjectService } from '../../../../core';


@Component({
  selector: 'exec-epp-view-project-layout',
  templateUrl: './view-project-layout.component.html',
  styleUrls: ['./view-project-layout.component.scss']
})
export class ViewProjectLayoutComponent implements OnInit {

  projects:Project[]=[]

  total = 1;

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
   
    this.projects=response.data;
    this.pageIndex=response.pagination.PageIndex;
    this.pageSize=response.pagination.PageSize;
    this.total=response.pagination.TotalRecord
    this.totalPage=response.pagination.TotalPage;

   });


  }
 
  constructor(private  projectService:ProjectService) {}

  ngOnInit(): void {

   this.projectService.getWithPagnationResut(1,10).subscribe((response:PaginatedResult<Project[]>)=>{   
    this.projects=response.data;
    this.pageIndex=response.pagination.PageIndex;
    this.pageSize=response.pagination.PageSize;
    this.total=response.pagination.TotalRecord
    this.totalPage=response.pagination.TotalPage;

   });


  }

}




