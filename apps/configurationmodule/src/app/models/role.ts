export interface Role {
    Guid: string;
    Name: string;
    DepartmentGuid: string;
    DepartmentName: string;
}

export interface RolePostModel {
    Guid: string;
    Name: string;
    IsActive: boolean;
    IsDeleted: boolean;
    CreatedDate: Date;
    CreatedbyUserGuid: string;
}