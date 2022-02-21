
import { Employee } from '..';
import { Client, ProjectStatus, } from './';



export interface Project{

  ProjectName:string,
  ProjectType: string,
  StartDate:string,
  EndDate:"",
  Supervisor?: Employee,
  Client?:Client;
  ProjectStatus?: ProjectStatus,
  SupervisorGuid:string,
  ClientGuid:string,
  ProjectStatusGuid:string,
  Guid:string,
  IsActive:boolean,
  IsDeleted:boolean,
  CreatedDate:string,
  CreatedbyUserGuid:string
  Description?:string
  }





