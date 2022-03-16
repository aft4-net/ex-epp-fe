import { Address, EmergencyContact } from "../..";

export interface Employee{
EmployeeNumber:string,
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
FamilyDetails?: FamilyDetail[],
EmployeeOrganization: EmployeeOrganization,
EmployeeAddress?: Address[],
EmergencyContact?: EmergencyContact[]
}