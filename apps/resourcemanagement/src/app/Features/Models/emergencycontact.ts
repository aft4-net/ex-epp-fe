import { Address } from "./address.model";

export interface EmergencyContacts {
  guid: string
  FirstName: string
  FatherName: string
  GrandFatherName: string
  Relationship: string
  PhoneNumber: string
  phoneNumber2?: string
  phoneNumber3?: string
  email: string
  email2?: string
  email3?: string
  Country?: string
  stateRegionProvice: string
  city: string
  subCityZone: string
  woreda: string
  houseNumber: string
  postalCode: number
  isActive: boolean
  isDeleted: boolean
  createdDate: string
  createdbyUserGuid: string
}





export interface IEmergencyContact {
  guid?: string;
  isActive?: boolean;
  isDeleted?: boolean;
  createdDate?: string;
  createdbyUserGuid?: string;
  firstName?: string;
  fatherName?: string;
  relationship?: string;
  address?: Address[];
}




export class EmergencyContact implements IEmergencyContact {
  constructor(
    public guid?: string,
    public isActive?: boolean,
    public isDeleted?: boolean,
    public createdDate?: string,
    public createdbyUserGuid?: string,
    public firstName?: string,
    public fatherName?: string,
    public relationship?: string,
    public address: Address[] = []
  ) {}
}



