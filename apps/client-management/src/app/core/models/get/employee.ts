export interface Employee {
  Guid: string,

  IActive: boolean,

  IsDeleted: boolean,

  CreatedDate: Date,

  CreatedbyUserGuid: string,

  Name: string,

  Role: string,

  HiredDate: Date
}

export enum EmployeePostion {
  TDM = 'Tecnical Delivary Manager',
  Dev3 = 'Devloper 3',
  seniorDev1 = 'Senior Devloper 1',
  seniorDev2 = 'Senior Devloper 2',
  seniorDev3 = 'Senior Devloper 3',
  PO="Product Owner 1",
  PO2="Product Owner 2",
  SM="Scrum Master",
  RD="React Devloper",
  UID="UI Devloper"
}
