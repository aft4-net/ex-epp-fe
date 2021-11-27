import { BillingAddress } from './billing-address';
import { ClientContact } from './client-contact';
import { ClientStatus } from './client-status';
import { CompanyContact } from './company-contact';
import { Employee } from './employee';
import { OperatingAddress } from './operational-address';


export interface Client {
  SalesPerson: Employee;
  SalesPersonGuid: string;
  ClientName: string;
  ClientStatus?: ClientStatus;
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



