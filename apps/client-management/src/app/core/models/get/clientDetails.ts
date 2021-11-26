// export interface ResponseStatus {
//   ResponseStatus: string
//   Message: string
//   Ex: any
//   Data: ClientDetails[]
// }

export interface ClientDetails {
  SalesPerson: any
  SalesPersonGuid: string
  ClientName: string
  ClientStatus: any
  ClientStatusGuid: string
  Description: string
  Guid: string
  IsActive: boolean
  IsDeleted: boolean
  CreatedDate: string
  CreatedbyUserGuid: string
}
