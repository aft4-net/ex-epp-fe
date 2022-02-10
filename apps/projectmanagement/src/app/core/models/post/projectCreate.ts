import { projectResourceType } from ".";

export interface ProjectCreate {
  ProjectName: string;
  ProjectStatusGuid: string;
  ProjectType:string;
  SupervisorGuid:string;
  StartDate: string;
  EndDate: string;
  ClientGuid :string;
  AssignResource?: projectResourceType[];
  Description?:string
}














