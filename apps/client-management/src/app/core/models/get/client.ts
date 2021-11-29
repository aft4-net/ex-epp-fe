import { Employee } from '..';
import { FormGroupDirective } from '@angular/forms';
import { List } from 'postcss/lib/list';
import { BillingAddress } from './billing-address';
import { ClientContact } from './client-contact';
import { ClientStatus } from './client-status';
import { CompanyContact } from './company-contact';
import { OperatingAddress} from './operating-address';

export interface Client {

  ClientName: string,

  ClientStatus: ClientStatus,
  ClientStatusGuid:string,

  SalesPersonGuid: string,
  SalesPerson:Employee,
  ClientContacts:ClientContact[],
  CompanyContacts:CompanyContact[],
  OperatingAddress:OperatingAddress[],
  BillingAddress:BillingAddress[],

  Description: string,

  Guid: string,

  IsActive: true,

  IsDeleted: false,

  CreatedDate: string,

  CreatedbyUserGuid: string
}

