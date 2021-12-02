

export interface EmergencyContacts {
  guid: string
  isActive: boolean
  isDeleted: boolean
  createdDate: string
  createdbyUserGuid: string
  firstName: string
  fatherName: string
  relationship: string
  phoneNumber: string
  country: string
  stateRegionProvice: string
  city: string
  subCityZone: string
  woreda: string
  houseNumber: string
  postalCode: number
}




export interface Address {
  guid: string;
  isActive: boolean;
  isDeleted: boolean;
  createdDate: string;
  createdbyUserGuid: string;
  phoneNumber: string;
  country: string;
  stateRegionProvice: string;
  city: string;
  subCityZone: string;
  woreda: string;
  houseNumber: string;
  postalCode: number;
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
    public address: [] = []
  ) {}






}



