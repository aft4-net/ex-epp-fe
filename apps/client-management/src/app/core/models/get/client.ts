//import { OperatingAddress } from 'apps/client-management/src/app/core/models/post/OperatingAddress';

import { BillingAddress } from './billing-address';
import { ClientContact } from './client-contact';
import { ClientStatus } from '..';
import { CompanyContact } from './company-contact';
import { Employee } from './employee';
import { FormGroupDirective } from '@angular/forms';
import { List } from 'postcss/lib/list';
import { OperatingAddress } from './operating-address';

export interface Client {
  SalesPerson: Employee;
  SalesPersonGuid: string;
  ClientName: string;
  ClientStatusName: string;
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




