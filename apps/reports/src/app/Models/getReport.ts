export interface Report {
    ProjectId : string;
    ProjectName: string;
    ClientGuid: string;
    ClientName?:string;
    ClientManagerName:string;
    EmployeeGuid:string;
    FirstName:string;
    LastName:string;
    FullName:string;
    EmployeeRoleName:string;
    BillableHours:number;
    NonBillableHours:number;
}
