import { BaseAuditEntity } from "@exec-epp/core-services/a-base-services";

export interface FamilyMember extends BaseAuditEntity {
    Relationship: string
    FullName: string
    Gender?: string
    DateofBirth?: Date
}