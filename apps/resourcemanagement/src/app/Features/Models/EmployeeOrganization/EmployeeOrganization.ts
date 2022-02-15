import{ICountry} from '../../Models/EmployeeOrganization/Country'
import { IDutyBranch } from './DutyBranch';

export interface EmployeeOrganization {
    Country: ICountry;
    CountryId: string;
    DutyStation: string;
    DutyBranch: IDutyBranch;
    DutyBranchId: string;
    CompaynEmail: string;
    PhoneNumber: string;
    JoiningDate: Date;
    TerminationDate: Date;
    EmploymentType: string;
    Department: Department;
    DepartmentId: string;
    ReportingManager: string;
    Role: Role;
    JobTitleId: string;
    Status: string;
}

export interface Department {
    Id: string
    Name: string
}
export interface Role {
    Id: string
    Name: string
}
