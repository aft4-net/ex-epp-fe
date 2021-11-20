
import { Address } from "./address.model";

export interface IEmergencyContact {
  guid?: string;
  isActive?: boolean;
  isDeleted?: boolean;
  createdDate?: Date;
  createdbyUserGuid?: string;
  firstName?: string;
  fatherName?: string;
  relationship?: string;
  address?: Address[];
}

export class EmergencyContact implements IEmergencyContact {
  constructor(
 public guid? :string,
 public isActive? : boolean,
 public isDeleted? : boolean,
 public createdDate?: Date,
 public createdbyUserGuid? :string,
 public firstName? :string,
 public fatherName? : string,
 public  relationship? : string,
 public  address: [] = []

  ){}
}



  
 
