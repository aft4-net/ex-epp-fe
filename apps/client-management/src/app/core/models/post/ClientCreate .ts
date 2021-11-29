import { BillingAddressCreate, OperatingAddressCreate } from ".";

import { ClientContactCreate } from "./clientContactCreate";
import { CompanyContactCreate } from "./CompanyContactsCreate";


export interface ClientCreate {
    SalesPersonGuid: string,
    ClientStatusGuid: string,
    ClientName: string,
    Description: string;
    ClientContact:ClientContactCreate[];
    CompanyContacts:CompanyContactCreate[]; 
    OperatingAddress:OperatingAddressCreate[];
    BillingAddress:BillingAddressCreate[];
}




 

