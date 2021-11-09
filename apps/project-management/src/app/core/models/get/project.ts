import { Employee, ProjectResourceRequirement } from './';
import { Client } from './client';
import { ProjectResource } from './projectResource';


export interface Project {
  id: string;
  name: string;
  status: string;
  type: projectType;
  startDate: Date;
  client?: Client;
  endDate?: Date;
  createdDate?:Date;
  supervisor:Employee;
  projectResourceRequirement?:ProjectResourceRequirement[];
  resources?:ProjectResource[]
}


export enum projectType {
  internal="Internal",
  external="External",
}

export enum AssignTo{
 Client="Client",
 Project="Project"
}


