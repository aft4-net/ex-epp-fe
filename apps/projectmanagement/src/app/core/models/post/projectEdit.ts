
export interface ProjectEdit{
    Guid:string;
    ProjectName: string;
    ProjectStatusGuid?: string;
    ProjectType:string;
    SupervisorGuid:string;
    StartDate: string;
    EndDate: string;
    ClientGuid ?:string;
    Description?:string
}




