
import { BillingAddress } from './billing-address';
import { ClientContact } from './client-contact';
import { CompanyContact } from './company-contact';
import { Employee } from './employee';
import { OperatingAddress } from './operating-address';

export interface Client {
  SalesPerson: Employee;
  SalesPersonGuid: string;
  ClientName: string;
  OperatingAddressCountry:string;
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




