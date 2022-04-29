import { BaseAuditEntity } from "@exec-epp/core-services/a-base-services";
import { Address, EmergencyContact, FamilyMember } from "../..";

export interface Employee extends BaseAuditEntity{
    personalDetail: PersonalDetail;
    familyDetails: FamilyMember[];
    employeeOrganization: EmployeeOrganization;
    addresses: Address[];
    emergencyContacts: EmergencyContact[]
}

export interface PersonalDetail extends BaseAuditEntity{
    EmployeeId?: string;
    EmployeeNumber:string;
    // FirstName: string;
    // MiddleName: string;
    // LastName: string;
    FullName: string;
    PersonalPhoneNumbers: string[];
    PersonalEmailAddresses: string[];
    DateofBirth : Date;
    Gender : string;
    Nationality: string[]
}

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