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
    type: 'Root' | 'Parent' | 'Child';
    childrens?: Permission[];
    admin?: Permission;
    readonly PermissionCode: string;
    readonly Name: string;
    readonly Value: string;
    readonly ParentCode?: string;

    mark: (guid: string) => boolean;
    unmark: (guid: string) => boolean;

}

class PermissionCheckImplementation implements PermissionCheckModel {

    checked: boolean;
    indeterminate: boolean;
    type: "Root" | "Parent" | "Child";
    childrens?: Permission[] | undefined;
    admin?: Permission | undefined;
    mark: (guid: string) => boolean;
    unmark: (guid: string) => boolean;
    PermissionCode: string;
    Name: string;
    Description?: string | undefined;
    Value: string;
    ParentCode?: string | undefined;
    Guid: string;
    IsActive?: boolean | undefined;
    IsDeleted?: boolean | undefined;
    CreatedDate?: Date | undefined;
    CreatedbyUserGuid?: string | undefined;

    /**
     *
     */
    constructor(permission_s: Permission[]) {
        super();

    }
}



export function generatePermissionTree(permissions: (ModulePermission | EntityPermission | Permission)[])