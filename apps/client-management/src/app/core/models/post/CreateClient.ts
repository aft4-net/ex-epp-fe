import { BillingAddress } from "./BillingAddress";
import { clientContact } from "./clientContact";
import { CompanyContacts } from "./CompanyContacts";
import { OperatingAddress } from "./OperatingAddress";

export interface CreateClient{
    SalesPersonGuid: string,
    ClientStatusGuid: string,
    ClientName: string,
    Description: string;
    ClientContact?:clientContact[];
    CompanyContacts?:CompanyContacts[]; 
    OperatingAddress?:OperatingAddress[];
    BillingAddress?:BillingAddress[];
}




 

