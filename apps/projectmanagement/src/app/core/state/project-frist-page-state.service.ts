import { Injectable } from '@angular/core';
import { PaginatedResult, Pagination, Project, StateService } from '../models';

const iniitalAddProjectState: PaginatedResult<Project[]> = {
  data: [] as Project[] ,
  pagination:{} as Pagination
};
@Injectable({
  providedIn: 'root'
})
export class ProjectFristPageStateService extends StateService<PaginatedResult<Project[]>> {

  constructor() { 
    super(iniitalAddProjectState);
  }

  
}
