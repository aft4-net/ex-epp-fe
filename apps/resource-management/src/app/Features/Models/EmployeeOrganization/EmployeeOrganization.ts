export interface EmployeeOrganization {
    Guid: string;
    IsActive: boolean;
    IsDeleted: boolean;
    CreatedDate: Date;
    CreatedbyUserGuid: string;
    DutyStation: number;
    DutyBranch: number;
    EmployeeId: string;
    CompaynEmail: string;
    PhoneNumber: string;
    JoiningDate: Date;
    TerminationDate: Date;
    EmploymentType: number;
    Department: string;
    ReportingManager: string;
    JobTitle: string;
    Status: number;
}