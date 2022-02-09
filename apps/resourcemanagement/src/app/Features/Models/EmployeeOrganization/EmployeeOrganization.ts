import{ICountry} from '../../Models/EmployeeOrganization/Country'

export interface EmployeeOrganization {
    Country: string;
    CountryId: string;
    DutyStation: string;
    DutyBranch: string;
    DutyBranchId: string;
    CompaynEmail: string;
    PhoneNumber: string;
    JoiningDate: Date;
    TerminationDate: Date;
    EmploymentType: string;
    Department: string;
    DepartmentId: string;
    ReportingManager: string;
    JobTitle: string;
    JobTitleId: string;
    Status: string;
}
