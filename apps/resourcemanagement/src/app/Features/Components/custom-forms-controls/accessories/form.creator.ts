import { AbstractControl, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Addresss } from "../../../Models/address?.model";
import { EmergencyContacts } from "../../../Models/emergencycontact";
import { Employee } from "../../../Models/Employee";
import { EmployeeOrganization } from "../../../Models/EmployeeOrganization/EmployeeOrganization";
import { FamilyDetail } from "../../../Models/FamilyDetail/FamilyDetailModel";
import { validatePhoneNumber, validateRequired } from "../../../Services/supporting-services/custom.validators";
import { addressKey, emergencyContactKey, familyDetailKey, fullNameKey, organizationalDetailKey, personalDetailKey, phoneNumberKey } from "./form-map";
import { validateEmailAddress, validateFirstName } from "./validators";

export class FormCreator {
    private static _fb: FormBuilder = new FormBuilder();
    public static createEmailAddress(email?: string | null) {
        return new FormControl(email, validateEmailAddress) as AbstractControl;
    }
    
    private static _createEmailAddresses(emails: (string | null | undefined)[]) {
        return emails.map(e => new FormControl(e, validateEmailAddress)) as AbstractControl[];
    }

    public static createPhoneNumber(prefices: string[], phoneNumber?: string | null) {
        const filterdPrefices = prefices.filter(pr => phoneNumber?.startsWith(pr));
        const prefix = filterdPrefices.length > 0? filterdPrefices[0] : '+251';
        const number = filterdPrefices.length > 0? phoneNumber?.substring(prefix.length) : null;
        const form = new FormGroup({});
        form.addControl(phoneNumberKey.prefix, new FormControl(prefix, validateRequired));
        form.addControl(phoneNumberKey.number, new FormControl(number, validatePhoneNumber));
        return form as AbstractControl;
    }

    private static _createPhoneNumbers(prefices: string[], phoneNumbers: (string | null | undefined)[]) {
        return phoneNumbers.map(phone => this.createPhoneNumber(prefices, phone)) as AbstractControl[];
    }
    
    private static _createFullName(fullName: (string | null | undefined)[]) {
        const form = new FormGroup({});
        form.addControl(fullNameKey.firstName, new FormControl(fullName[0], validateFirstName));
        form.addControl(fullNameKey.middleName, new FormControl(fullName[1], validateFirstName));
        form.addControl(fullNameKey.lastName, new FormControl(fullName[2], validateFirstName));
        return form;
    }

    public static createPersonalDetail(prefices: string[], e?: Employee) {
        const form = new FormGroup({});
        form.addControl(personalDetailKey.idNumber, new FormControl(e?.EmployeeNumber, validateRequired));
        form.addControl(personalDetailKey.fullName, this._createFullName([e?.FirstName, e?.FatherName, e?.GrandFatherName]));
        form.addControl(personalDetailKey.gender, new FormControl(e?.Gender, validateRequired));
        form.addControl(personalDetailKey.dateofBirth, new FormControl(e?.DateofBirth, validateRequired));
        form.addControl(personalDetailKey.emailAddresses, this._fb.array(this._createEmailAddresses([e?.PersonalEmail, e?.PersonalEmail2, e?.PersonalEmail3])));
        form.addControl(personalDetailKey.phoneNumbers, this._fb.array(this._createPhoneNumbers(prefices, [e?.MobilePhone, e?.Phone1, e?.Phone2])));
        form.addControl(personalDetailKey.nationalities, new FormControl(e?.Nationality?.map(n => n.Name)));
        return form as AbstractControl;
    }

    public static createOrganizationalDetail(o?: EmployeeOrganization) {
        const form = new FormGroup({});
        form.addControl(organizationalDetailKey.country, new FormControl(o?.CountryId, validateRequired));
        form.addControl(organizationalDetailKey.dutyBranch, new FormControl(o?.DutyBranchId, validateRequired));
        form.addControl(organizationalDetailKey.emailAddress, this._fb.array(this._createEmailAddresses([o?.CompaynEmail])));
        form.addControl(organizationalDetailKey.department, new FormControl(o?.DepartmentId, validateRequired));
        form.addControl(organizationalDetailKey.role, new FormControl(o?.JobTitleId, validateRequired));
        form.addControl(organizationalDetailKey.type, new FormControl(o?.EmploymentType, validateRequired));
        form.addControl(organizationalDetailKey.joined, new FormControl(o?.JoiningDate, validateRequired));
        form.addControl(organizationalDetailKey.terminates, new FormControl(o?.TerminationDate));
        form.addControl(organizationalDetailKey.status, new FormControl(o?.Status, validateRequired));
        return form as AbstractControl;
    }

    public static createAddressDetail(address?: Addresss) {
        const form = new FormGroup({});
        form.addControl(addressKey.country, new FormControl(address?.Country, validateRequired));
        form.addControl(addressKey.state, new FormControl(address?.StateRegionProvice));
        form.addControl(addressKey.city, new FormControl(address?.City, validateRequired));
        form.addControl(addressKey.subcity, new FormControl(address?.SubCityZone, validateRequired));
        form.addControl(addressKey.wereda, new FormControl(address?.Woreda));
        form.addControl(addressKey.houseNumber, new FormControl(address?.HouseNumber));
        form.addControl(addressKey.postalCode, new FormControl(address?.PostalCode));
        return form as AbstractControl;
    }


    public static createFamilyDetails(family?: FamilyDetail) {
        const form = new FormGroup({});
        form.addControl(familyDetailKey.fullName, this._createFullName(family?.FullName.split(' ') as string[]));
        form.addControl(familyDetailKey.relation, new FormControl(family?.Relationship?.Name));
        form.addControl(familyDetailKey.gender, new FormControl(family?.Gender));
        form.addControl(familyDetailKey.dateofBirth, new FormControl(family?.DateofBirth));
        return form as AbstractControl;
    }

    private static _createEmergecyContact(prefices: string[], e?: EmergencyContacts) {
        const form = new FormGroup({});
        form.addControl(emergencyContactKey.fullName, this._createFullName([e?.FirstName, e?.FatherName, e?.GrandFatherName]));
        form.addControl(emergencyContactKey.relation, new FormControl(e?.Relationship, validateRequired));
        form.addControl(emergencyContactKey.emailAddresses, this._fb.array(this._createEmailAddresses([e?.email, e?.email2, e?.email3])));
        form.addControl(emergencyContactKey.phoneNumbers, this._fb.array(this._createPhoneNumbers(prefices, [e?.PhoneNumber, e?.phoneNumber2, e?.phoneNumber3])));
        return form as AbstractControl;
    }

    private static _createEmergecyAddress(address?: EmergencyContacts) {
        const form = new FormGroup({});
        form.addControl(addressKey.country, new FormControl(address?.Country, validateRequired));
        form.addControl(addressKey.state, new FormControl(address?.stateRegionProvice));
        form.addControl(addressKey.city, new FormControl(address?.city, validateRequired));
        form.addControl(addressKey.subcity, new FormControl(address?.subCityZone, validateRequired));
        form.addControl(addressKey.wereda, new FormControl(address?.woreda));
        form.addControl(addressKey.houseNumber, new FormControl(address?.houseNumber));
        form.addControl(addressKey.postalCode, new FormControl(address?.postalCode));
        return form as AbstractControl;
    }

    public static createEmergecyContact(prefices: string[], emergencyContact?: EmergencyContacts) {
        return [
            this._createEmergecyContact(prefices, emergencyContact),
            this._createEmergecyAddress(emergencyContact)
        ];
    }
}