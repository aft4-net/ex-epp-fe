import { Employee } from "./employee";

export interface AssignResource {
     AssignDate:Date;
     Empolyee:Employee;
    Guid?: string
    CreatedDate?: Date, 
    ProjectGuid?: string
    EmployeeGuid?: string,

}