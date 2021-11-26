export interface Employee {
      Name: string;
      Role: string;
      HiredDate: Date;
      Guid: string;
      IsActive: boolean;
      IsDeleted: boolean;
      CreatedDate: Date;
      CreatedbyUserGuid: string;
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
