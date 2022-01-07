import { IEmployeeOrganization } from "./User/EmployeeOrganizationModel";

export interface IEmployeeModel {
    Guid:string  
    FirstName: string
    FatherName:string 
    GrandFatherName:string
    PersonalEmail:string
    MobilePhone:string,
    JobTitle: string
    EmployeeOrganization: IEmployeeOrganization
 }