import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AddProjectStateService, AssignResource,ProjectResourceStateService,} from '../../../../core';
import { PermissionListService } from '../../../../../../../../libs/common-services/permission.service';

@Component({
  selector: 'exec-epp-view-resources',
  templateUrl: './view-resources.component.html',
  styleUrls: ['./view-resources.component.scss']
})
export class ViewResourcesComponent implements OnInit {
  total = 0;
  loading = false;
  isTablePagnation=true;
  pageSize = 10;
  pageIndex = 1;
 projectResourcesView: AssignResource[] = [];
  isOnEditstate = false;
  nzSortDirections = Array<'Ascending' | 'Descending' | null>();
  billableFilter: { text: string; value: string }[] = [] as {
    text: string;
    value: string;
  }[];

  isProjectExternal=false;
  projectResources: AssignResource[] = [];
  @Output()  conformDelete= new EventEmitter<AssignResource>();
  @Output()   editProjectResource= new EventEmitter<string>();
  @Output()    removeCreateResource= new EventEmitter<AssignResource>();


  constructor(  private permissionList: PermissionListService,  
      private projectResourceStateService: ProjectResourceStateService,
      private projectCreateState: AddProjectStateService) { }

  ngOnInit(): void {
    this.projectResourceStateService.isOnEditstate$.subscribe((res) => {
      this.isOnEditstate = res;
    }); 
    if(this.isOnEditstate)
     { this.isTablePagnation=false;   
        this.loading = true;  
        if(this.projectResourceStateService.project.ProjectType==='External')
        this.isProjectExternal=true;
      }
        this.projectResourceStateService.projectResourceList$.subscribe(
        (res) => {
          if(this.isOnEditstate)
          {
            this.projectResourcesView= res;
          this.setBillableFilter()
          this.PageIndexChange(1);
          this.pageIndex=1;
          this.total= this.projectResourcesView.length;
          this.loading = false; 
          }
          else { 
    this.projectResources=res;       
    if (!this.isOnEditstate) 
    this.projectCreateState.state$.subscribe(res=>{
      if(res?.ProjectType==='External')
      this.isProjectExternal=true;
      else
      this.isProjectExternal=false;
    })
          }
           
        }
      );

   }
  
  authorize(key: string) {
    return this.permissionList.authorizedPerson(key);
  }

  PageIndexChange(pageIndex:number)
  {
    this.pageIndex=pageIndex
   this.projectResources=  this.projectResourcesView.slice((pageIndex-1)*10).slice(0,10);
  }

  nzSortOrderChange(SortColumn: string, direction: string | null) {
    if(SortColumn==="resource")
   {    
    if (direction == 'ascend') {
      if(this.isOnEditstate)
      this.projectResourcesView.sort((a, b) => (a.Empolyee.Name.toLowerCase().trim() > b.Empolyee.Name.toLowerCase().trim() ? 1 : -1));
       else
       this.projectResources.sort((a, b) => (a.Empolyee.Name.toLocaleLowerCase().trim() > b.Empolyee.Name.toLowerCase().trim() ? 1 : -1)); 
    } else if (direction == 'descend') {
      if(this.isOnEditstate)
      this.projectResourcesView.sort((a, b) => (a.Empolyee.Name.toLowerCase().trim() < b.Empolyee.Name.toLowerCase().trim() ? 1 : -1));
       else
       this.projectResources.sort((a, b) => (a.Empolyee.Name.toLowerCase().trim() < b.Empolyee.Name.toLowerCase().trim() ? 1 : -1));
   
    } 
  }
  else if(SortColumn==="date")
  {
    if (direction == 'ascend') {
      if(this.isOnEditstate)
      this.projectResourcesView.sort((a, b) => (a.AssignDate > b.AssignDate  ? 1 : -1));
      else
      this.projectResources.sort((a, b) => (a.AssignDate > b.AssignDate  ? 1 : -1));
    } else if (direction == 'descend') {
      if(this.isOnEditstate)
      this.projectResourcesView.sort((a, b) => (a.AssignDate < b.AssignDate ? 1 : -1));
      else
      this.projectResources.sort((a, b) => (a.AssignDate < b.AssignDate ? 1 : -1));
    } 

  }
    else if(SortColumn == "billable")
    {
      if (direction == 'ascend') {
        if(this.isOnEditstate)
        this.projectResourcesView.sort((a, b) => (a?.Billable > b.Billable  ? 1 : -1)); 
        else
        this.projectResources.sort((a, b) => (a?.Billable > b?.Billable ? 1 : -1));
      } else if (direction == 'descend') {
        if(this.isOnEditstate)
        this.projectResourcesView.sort((a, b) => (a?.Billable < b?.Billable ? 1 : -1));
        else
        this.projectResources.sort((a, b) => (a?.Billable< b?.Billable? 1 : -1));
    }
  }
  if(direction!=null&& this.isOnEditstate)
  this.PageIndexChange(this.pageIndex);    
  }
  
  billableChangeFilter(list:string[])
  {

    if(list===[] ||list.length==0 )
      this.projectResourcesView=this. projectResourceStateService.resourcesOfProject;
    else
    {
   let projectResourcesfilter = [] as AssignResource[];
   for(let i=0;i<list.length;i++)
{
    if(list[i]=="yes")
    projectResourcesfilter=[...this. projectResourceStateService.resourcesOfProject.filter(p=>p.Billable==true), ... projectResourcesfilter];
    if(list[i]=="no")
    projectResourcesfilter=[...this. projectResourceStateService.resourcesOfProject.filter(p=>p.Billable==false), ... projectResourcesfilter];
    if(list[i]=="na")
    projectResourcesfilter=[...this. projectResourceStateService.resourcesOfProject.filter(p=>p.Billable==null), ... projectResourcesfilter];
}
   this.projectResourcesView=projectResourcesfilter;
 }  
   this.total= this.projectResourcesView.length;
   this.PageIndexChange(1);  
  }
  setBillableFilter()
  {
    this.billableFilter= [] as {
      text: string;
      value: string;
    }[];
    const unique= [...new Set(this.projectResourcesView.map(item => item.Billable))]
    unique.forEach(p => {
       if(p==true&&this.billableFilter.length==0)
       this.billableFilter=[{text:"Yes",value:"yes"},...this.billableFilter];
  else      if(p==true&&this.billableFilter.length!=0)
  this.billableFilter.push({text:"Yes",value:"yes"})
  else      if(p==false&&this.billableFilter.length!=0)
  this.billableFilter=[{text:"No",value:"no"},...this.billableFilter];
  else      if(p==false && this.billableFilter.length==0)
  this.billableFilter.push({text:"No",value:"no"})
  else      if(p==null &&this.billableFilter.length!=0)
  this.billableFilter=[{text:"N/A",value:"na"},...this.billableFilter];
  else      if(p==null && this.billableFilter.length==0)
  this.billableFilter.push({text:"N/A",value:"na"})
     });
   
  }
  conformationDelete(resource:AssignResource)
  {
   this.conformDelete.emit(resource);
  }
  editResource(guid:string)
  {
   this.editProjectResource.emit(guid);
  }
  removeForAddReource(resource:AssignResource)
  {
   this.removeCreateResource.emit(resource);   
  }

}
