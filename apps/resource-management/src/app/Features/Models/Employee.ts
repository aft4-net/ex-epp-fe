import { Address } from "./address.model";
import { EmergencyContact } from "./EmergencyContactEntity";
import { EmployeeOrganization } from "./EmployeeOrganization/EmployeeOrganization";
import { FamilyDetails } from "./FamilyDetails";
import { Nationality } from "./Nationality";

export interface Employee{

  employeeNumber:string,
  FirstName: string,
  FatherName: string,
  GrandFatherName: string,
  MobilePhone: string,
  Phone1?: string,
  Phone2?: string,
  PersonalEmail: string,
  PersonalEmail2?: string,
  PersonalEmail3?: string,
  DateofBirth : Date,
  Gender : string,
  Nationality?: Nationality[],
  Organization?: EmployeeOrganization,
  PersonalAddress?: Address[],
  FamilyDetail?: FamilyDetails[],
  EmergencyContact?: EmergencyContact[]

}
