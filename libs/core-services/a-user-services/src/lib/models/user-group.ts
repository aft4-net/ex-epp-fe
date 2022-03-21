import { BaseAuditEntity } from '@exec-epp/core-services/a-base-services'

export interface UserGroup extends BaseAuditEntity {
    Name: string;
    Description: string;
    user: string[];
    permissions: string[];
}