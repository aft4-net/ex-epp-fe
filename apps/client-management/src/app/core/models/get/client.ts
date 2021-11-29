

import { Employee, ClientStatus } from '..';
import { FormGroupDirective } from '@angular/forms';
import { List } from 'postcss/lib/list';
import { BillingAddress } from './billing-address';
import { ClientContact } from './client-contact';

import { CompanyContact } from './company-contact';
import { OperatingAddress} from './operating-address';
import { CompanyContacts } from '../post/CompanyContacts';

export interface Client {
  SalesPerson: Employee;
  SalesPersonGuid: string;
  ClientName: string;
  //ClientStatus: ClientStatus;
  ClientStatus:ClientStatus;
  ClientStatusGuid: string;
  Description: string;
  ClientContacts: ClientContact[];
  CompanyContacts: CompanyContact[];
  OperatingAddress: OperatingAddress[];
  BillingAddress: BillingAddress[];
  Guid: string;
  IsActive: boolean;
  IsDeleted: boolean;
  CreatedDate: Date;
  CreatedbyUserGuid: string;
}




