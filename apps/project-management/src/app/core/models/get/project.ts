import { Employee, } from './';



export interface Project {
  id: string;
  name: string;
  status: string;
  type: projectType;

}


export enum projectType {
  internal="Internal",
  external="External",
}

export enum AssignTo{
 Client="Client",
 Project="Project"
}

