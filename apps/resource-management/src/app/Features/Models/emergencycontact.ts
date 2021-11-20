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
  Guid = '3fa85f64-5717-4562-b3fc-2c963f66afa6';
  IsActive = true;
  IsDeleted = true;
  CreatedDate = new Date();
  CreatedbyUserGuid = '3fa85f64-5717-4562-b3fc-2c963f66afa6';
  FirstName = '';
  FatherName = '';
  Relationship = '';
  Address: [] = [];
}
