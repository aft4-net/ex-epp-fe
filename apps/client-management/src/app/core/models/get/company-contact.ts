import { Employee } from "apps/project-management/src/app/core/models";

export interface CompanyContact{
  employee:Employee;
}

export interface CompanyContact {
  EmployeeGuid: string;
  Guid: string;
  IsActive: boolean;
  IsDeleted: boolean;
  CreatedDate: Date;
  CreatedbyUserGuid: string;

}
