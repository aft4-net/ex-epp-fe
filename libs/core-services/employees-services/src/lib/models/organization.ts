import { BaseAuditEntity } from "@exec-epp/core-services/a-base-services";

export interface EmployeeOrganization extends BaseAuditEntity {
    EmployeeId?: string;
    CountryId: string;
    DutyBranchId: string;
    CompaynEmail: string;
    EmploymentType: string;
    DepartmentId: string;
    JobTitleId: string;
    ReportingManagerId: string;
    JoiningDate: Date;
    TerminationDate?: Date;
    Status: string;
}