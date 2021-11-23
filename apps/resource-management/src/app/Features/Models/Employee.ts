import { Address } from "./address.model";
import { EmployeeOrganization } from "./EmployeeOrganization/EmployeeOrganization";
import { IEmergencyContact } from "./emergencycontact";
import { Nationality } from "./Nationality";
import { FamilyDetail } from "./FamilyDetail/FamilyDetailModel";

export interface Employee{

  employeeNumber:string,
  FirstName: string,
  FatherName: string,
  GrandFatherName: string,
  MobilePhone: string,
  Phone1: string,
  Phone2: string,
  PersonalEmail: string,
  PersonalEmail2: string,
  PersonalEmail3: string,
  DateofBirth : Date,
  Gender : string,
  Nationality?: Nationality[],
  Organization?: EmployeeOrganization,
  PersonalAddress?: Address[],
  FamilyDetail?: FamilyDetail[],
  Nationality: Nationality[],
  EmployeeOrganization?: EmployeeOrganization,
  EmployeeAddress?: Address[],
  FamilyDetails?: FamilyDetail[],
  EmergencyContact?: IEmergencyContact[]


}
