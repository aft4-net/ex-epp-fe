import { Employee } from "./employee";

export interface AssignResource {
    Guid?: string
    CreatedDate?: Date, 
    ProjectGuid?: string
    EmployeeGuid?: string,
    AssignDate:Date;
    Employee:Employee;
}