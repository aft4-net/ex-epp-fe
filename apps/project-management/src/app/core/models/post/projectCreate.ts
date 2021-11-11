import { projectResourceType } from ".";

export interface ProjectCreate {
  name: string;
  status: string;
  type:string;
  supervisorId:string;
  startDate: Date;
  endDate?: Date;
  clientId: string;
  resources?: projectResourceType[];
  description?:string
}




