import { uuid } from 'uuidv4';

export interface IAddress {
  Guid: string;
  IsActive: boolean;
  IsDeleted: boolean;
  CreatedDate: Date;
  CreatedbyUserGuid: string;
  PhoneNumber: string;
  Country: string;
  StateRegionProvice: string;
  City: string;
  SubCityZone: string;
  Woreda: string;
  HouseNumber: string;
  PostalCode: number;
}

export interface IEmergencyContact {
  Guid: string;
  IsActive: boolean;
  IsDeleted: boolean;
  CreatedDate: Date;
  CreatedbyUserGuid: string;
  FirstName: string;
  FatherName: string;
  Relationship: string;
  Address: IAddress[];
}

export class EmergencyContact implements IEmergencyContact {
  Guid = uuid();
  IsActive = true;
  IsDeleted = true;
  CreatedDate = new Date();
  CreatedbyUserGuid = uuid();
  FirstName = '';
  FatherName = '';
  Relationship = '';
  Address: [] = [];
}
