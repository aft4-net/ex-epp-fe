import { IEmployeeViewModel } from ".";


export interface CompanyContact{
  employee:IEmployeeViewModel;
}


export interface CompanyContact{
  Employee:IEmployeeViewModel;

  EmployeeGuid: string;
  Guid: string;
  IsActive: boolean;
  IsDeleted: boolean;
  CreatedDate: Date;
  CreatedbyUserGuid: string;

}

