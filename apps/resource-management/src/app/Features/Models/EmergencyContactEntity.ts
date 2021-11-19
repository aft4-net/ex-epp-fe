import { Address } from "./address.model";

export interface EmergencyContact{

  FirstName : string,
  FatherName : string,
  Relationship : string,
  Address: Address[]
}