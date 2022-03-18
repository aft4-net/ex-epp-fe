import { BaseAuditEntity } from "@exec-epp/core-services/a-base-services";


export interface Permission extends BaseAuditEntity {
    PermissionCode: string;
    Name: string;
    Description?: string;
    Value: string;
    ParentCode?: string;
}

export interface PermissionCheckModel extends Permission {
    state: 'unchecked' | 'indeterminate' | 'checked'
    checked: boolean;
    indeterminate: boolean;
    childrens?: Permission[];
}
