import { UpdateBillingAddress } from "./UpdateBillingAddress";
import { UpdateClientContact } from "./UpdateClientContact";
import { UpdateCompanyContact } from "./UpdateCompanyContact";
import { UpdateOperatingAddress } from "./UpdateOperatingAddress";

export interface UpdateClient
{
  Guid:string;
  SalesPersonGuid: string;
  ClientStatusGuid: string;
  ClientName: string;
  Description: string;
  ClientContacts:UpdateClientContact[];
  CompanyContacts:UpdateCompanyContact[];
  OperatingAddress:UpdateOperatingAddress[];
  BillingAddress:UpdateBillingAddress[];
}

