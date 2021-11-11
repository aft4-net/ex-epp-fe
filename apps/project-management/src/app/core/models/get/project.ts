export interface Client {
  ClientName: string,
  clientStatus: string,
  managerAssigned: string,
  description: string,
  Guid: string,
  isActive: true,
  isDeleted: false,
  createdDate: string,
  createdbyUserGuid: string
}
export interface Employee{
  guid: string,
  isActive: boolean,
  isDeleted: boolean,
  createdDate: Date,
  createdbyUserGuid: string,
  name: string,
  role: string,
  hiredDate: Date
}
export interface ProjectStatus
{
   guid: string,
  isActive:boolean ,
  isDeleted: boolean,
  createdDate: Date,
  createdbyUserGuid: string,
  statusName: string

}


export interface Project{

ProjectName:string,
projectType: string,
startDate:Date,
endDate:Date,
Supervisor: Employee[],
Client:Client;
projectStatus: ProjectStatus[],
supervisorGuid:string,
clientGuid:string,
projectStatusGuid:string,
guid:string,
isActive:boolean,
isDeleted:boolean,
createdDate:Date,
createdbyUserGuid:string

}

export interface ProjectData{
  responseStatus: string,
  message: string,
  ex: any,
  Data: Project[]
}
