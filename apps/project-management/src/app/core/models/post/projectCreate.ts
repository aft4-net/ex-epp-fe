import { projectResourceType } from ".";

export interface ProjectCreate {
  ProjectName: string;
  ProjectStatusGuid: string;
  projectType:string;
  SupervisorGuid:string;
  StartDate: Date;
  EndDate?: Date;
  ClientGuid :string;
  assignResource?: projectResourceType[];
  Description?:string
}












