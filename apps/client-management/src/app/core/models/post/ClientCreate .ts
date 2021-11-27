import { BillingAddressCreate } from "./BillingAddressCreate";
import { ClientContactCreate } from "./clientContactCreate";
import { CompanyContactCreate } from "./CompanyContactsCreate";
import { OperatingAddressCreate } from "./OperatingAddressCreate";


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




 

