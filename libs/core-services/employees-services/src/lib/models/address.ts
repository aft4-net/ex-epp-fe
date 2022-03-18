import { BaseAuditEntity } from '@exec-epp/core-services/a-base-services'

export interface Address extends BaseAuditEntity {
    EmployeeId?: string
    Country: string
    StateRegionProvice: string
    City: string
    SubCityZone: string
    Woreda: string
    HouseNumber: string
    PostalCode: string
}


export interface AddressViewModel extends BaseAuditEntity {
    EmployeeId?: string
    Country: string
    StateRegionProvice: string
    City: string
    SubCityZone: string
    Woreda: string
    HouseNumber: string
    PostalCode: string
}