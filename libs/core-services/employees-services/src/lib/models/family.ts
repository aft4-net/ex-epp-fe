import { BaseAuditEntity } from "@exec-epp/core-services/a-base-services";

export interface FamilyMemeber extends BaseAuditEntity {
    EmployeeId?: string
    Relationship: string
    FullName: string
    Gender?: string
    DateofBirth?: Date
}