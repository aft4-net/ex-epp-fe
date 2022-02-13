import { AbstractControl } from "@angular/forms";
import { Addresss } from "../../../Models/address.model";
import { EmergencyContacts } from "../../../Models/emergencycontact";
import { Employee } from "../../../Models/Employee";
import { EmployeeOrganization } from "../../../Models/EmployeeOrganization/EmployeeOrganization";
import { FamilyDetail } from "../../../Models/FamilyDetail/FamilyDetailModel";
import { Relationship } from "../../../Models/FamilyDetail/RelationshipModel";
import { Nationality } from "../../../Models/Nationality";
import { addressKey, emergencyContactKey, familyDetailKey, fullNameKey, organizationalDetailKey, personalDetailKey } from "./form-map";

export class FormExtractor {
    public static extractPersonalDetail(personalDetail: AbstractControl) {
        const v = personalDetail.value;
        const emails = [...v[personalDetailKey.emailAddresses], ...Array<null>(3 - v[personalDetailKey.emailAddresses].length)]
        const phones = [...v[personalDetailKey.phoneNumbers], ...Array<null>(3 - v[personalDetailKey.phoneNumbers].length)]
        return {
            EmployeeNumber: v[personalDetailKey.idNumber],
            FirstName: v[personalDetailKey.fullName][fullNameKey.firstName],
            FatherName: v[personalDetailKey.fullName][fullNameKey.middleName],
            GrandFatherName: v[personalDetailKey.fullName][fullNameKey.lastName],
            Gender: v[personalDetailKey.gender],
            DateofBirth: v[personalDetailKey.dateofBirth],
            PersonalEmail: emails[0],
            PersonalEmail2: emails[1],
            PersonalEmail3: emails[2],
            MobilePhone: phones[0],
            Phone1: phones[1],
            Phone2: phones[2],
            Nationality: v[personalDetailKey.nationalities]?.map((n: string) => { return { Name: n as string } as Nationality })
        } as Partial<Employee>;
    }
    public static extractOrganizationalDetail(organizationalDetail: AbstractControl) {
        const v = organizationalDetail.value;
        return {
            CountryId: v[organizationalDetailKey.country],
            DutyBranchId: v[organizationalDetailKey.dutyBranch],
            CompaynEmail: v[organizationalDetailKey.emailAddress[0]],
            DepartmentId: v[organizationalDetailKey.department],
            JobTitleId: v[organizationalDetailKey.role],
            ReportingManager: v[organizationalDetailKey.manager],
            EmploymentType: v[organizationalDetailKey.type],
            JoiningDate: v[organizationalDetailKey.joined],
            TerminationDate: v[organizationalDetailKey.terminates],
            Status: v[organizationalDetailKey.status]
        } as Partial<EmployeeOrganization>;
    }
    public static extractAddress(address: AbstractControl) {
        const v = address.value;
        return {
            Country: v[addressKey.country],
            StateRegionProvice: v[addressKey.state],
            City: v[addressKey.city],
            SubCityZone: v[addressKey.subcity],
            Woreda: v[addressKey.wereda],
            HouseNumber: v[addressKey.houseNumber],
            PostalCode: v[addressKey.postalCode]
        } as Partial<Addresss>;
    }
    public static extractFamilyDetail(familyDetail: AbstractControl) {
        const v = familyDetail.value;
        return {
            FullName: v[familyDetailKey.fullName][fullNameKey.firstName] + ' ' + v[familyDetailKey.fullName][fullNameKey.middleName] + ' ' + v[familyDetailKey.fullName][fullNameKey.lastName],
            Gender: v[familyDetailKey.gender],
            DateofBirth: v[familyDetailKey.dateofBirth],
            Relationship: { Name: v[familyDetailKey.relation] } as Relationship
        } as Partial<FamilyDetail>;
    }

    public static extractEmergencyContact(emergencyContact: AbstractControl, emergencyAddress: AbstractControl) {
        const v = emergencyContact.value;
        const a = emergencyAddress.value;
        const emails = [...v[emergencyContactKey.emailAddresses], ...Array<null>(3 - v[emergencyContactKey.emailAddresses].length)]
        const phones = [...v[emergencyContactKey.phoneNumbers], ...Array<null>(3 - v[emergencyContactKey.phoneNumbers].length)]
        return {
            FirstName: v[emergencyContactKey.fullName][fullNameKey.firstName],
            FatherName: v[emergencyContactKey.fullName][fullNameKey.middleName],
            GrandFatherName: v[emergencyContactKey.fullName][fullNameKey.lastName],
            Relationship: v[emergencyContactKey.relation],
            email: emails[0],
            email2: emails[1],
            email3: emails[2],
            PhoneNumber: phones[0],
            phoneNumber2: phones[1],
            phoneNumber3: phones[2],
            Country: a[addressKey.country],
            stateRegionProvice: a[addressKey.state],
            city: a[addressKey.city],
            subCityZone: a[addressKey.subcity],
            woreda: a[addressKey.wereda],
            houseNumber: a[addressKey.houseNumber],
            postalCode: a[addressKey.postalCode]
        } as Partial<EmergencyContacts>;
    }
}