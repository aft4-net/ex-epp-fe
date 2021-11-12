import { Client, Employee, } from './';



export interface Project {
  id: string;
  name: string;
  status: string;
  type: projectType;
  client:Client;
}


export enum projectType {
  internal="Internal",
  external="External",
}

export enum AssignTo{
 Client="Client",
 Project="Project"
}


