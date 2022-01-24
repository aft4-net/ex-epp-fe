export interface Role {
    Guid: string;
    Name: string;
    IsActive: boolean;
    IsDeleted: boolean;
    CreatedDate: Date;
    CreatedbyUserGuid: string;
}