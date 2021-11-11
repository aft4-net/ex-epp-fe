import { projectResourceType } from ".";

export interface ProjectCreate {
  projectName: string;
  ProjectStatusGuid: string;
  projectType:string;
  supervisorGuid:string;
  startDate: Date;
  endDate?: Date;
  ClientGuid :string;
  assignResource?: projectResourceType[];
  description?:string
}












