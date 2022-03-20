
export interface BaseAuditEntity {
    Guid: string;
    IsActive?: boolean;
    IsDeleted?: boolean;
    CreatedDate?: Date;
    CreatedbyUserGuid?: string;
}

export interface BaseAuditViewModel {
    Guid: string;
    IsActive?: boolean;
    IsDeleted?: boolean;
    CreatedDate?: Date;
    CreatedbyUserGuid?: string;
}

