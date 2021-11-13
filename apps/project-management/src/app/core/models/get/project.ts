import { Client, Employee, ProjectStatus, } from './';



export interface Project{

  ProjectName:string,
  projectType: string,
  startDate:Date,
  endDate:Date,
  Supervisor: Employee,
  Client:Client;
  projectStatus: ProjectStatus,
  supervisorGuid:string,
  clientGuid:string,
  projectStatusGuid:string,
  guid:string,
  isActive:boolean,
  isDeleted:boolean,
  createdDate:Date,
  createdbyUserGuid:string
  
  }


export enum projectType {
  internal="Internal",
  external="External",
}

export enum AssignTo{
 Client="Client",
 Project="Project"
}


