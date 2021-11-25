import { FormGroupDirective } from '@angular/forms';
import { ClientStatus } from './client-status';

export interface Client {

  ClientName: string,

  ClientStatus: ClientStatus,
  ClientStatusGuid:string,

  SalesPersonGuid: string,

  Description: string,

  Guid: string,

  IsActive: true,

  IsDeleted: false,

  CreatedDate: string,

  CreatedbyUserGuid: string
}

